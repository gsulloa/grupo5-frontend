import doFetch from "./fetching"
import { devlogerror } from "../../../utils/log"
import { getReplies } from "./replies"

const type = "MESSAGE"
const initialState = {
  fetching: false,
  error: false,
  data: {},
}

const SET_MESSAGES = "SET_MESSAGES"
export default function posts(state = initialState, { type, payload }) {
  switch (type) {
    case SET_MESSAGES:
      return {
        ...state,
        data: {
          ...state.data,
          [payload.postId]: payload.messages,
        },
      }
    case `${type}_FETCH_START`:
      return {
        ...state,
        fetching: true,
      }
    case `${type}_FETCH_END`:
      return {
        ...state,
        fetching: false,
      }
    case `${type}_SET_ERROR`:
      return {
        ...state,
        error: payload,
      }
    default:
      return state
  }
}

function fetchMessages(api, { postId }) {
  return api.get(`/posts/${postId}/messages`)
}

export function getMessages({ postId }) {
  return async (dispatch, getState, { api }) => {
    try {
      const messages = await doFetch(
        dispatch,
        fetchMessages(api.withToken(getState().auth.token), { postId }),
        type
      )
      dispatch(setMessages({ postId, messages }))
      messages.forEach(message => {
        dispatch(getReplies({ messageId: message.id }))
      })
    } catch (e) {
      devlogerror(e)
    }
  }
}

function setMessages({ postId, messages }) {
  return {
    type: SET_MESSAGES,
    payload: {
      postId,
      messages,
    },
  }
}
