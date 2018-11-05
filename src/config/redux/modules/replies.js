import doFetch from "./fetching"
import { devlogerror } from "../../../utils/log"

const type = "REPLY"
const initialState = {
  fetching: false,
  error: false,
  data: {},
}

const SET_REPLIES = "SET_REPLIES"
export default function posts(state = initialState, { type, payload }) {
  switch (type) {
    case SET_REPLIES:
      return {
        ...state,
        data: {
          ...state.data,
          [payload.messageId]: payload.replies,
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

function fetchReplies(api, { messageId }) {
  return api.get(`/messages/${messageId}/responses`)
}

function createReply(api, { messageId, content }) {
  return api.post(`/messages/${messageId}/responses`, {
    description: content,
  })
}

export function getReplies({ messageId }) {
  return async (dispatch, getState, { api }) => {
    try {
      const replies = await doFetch(
        dispatch,
        fetchReplies(api.withToken(getState().auth.token), { messageId }),
        type
      )
      dispatch(setReplies({ messageId, replies }))
    } catch (e) {
      devlogerror(e)
    }
  }
}

export function addReply({ content, messageId }) {
  return async (dispatch, getState, { api }) => {
    try {
      await doFetch(
        dispatch,
        createReply(api.withToken(getState().auth.token), {
          content,
          messageId,
        }),
        type
      )
      dispatch(getReplies({ messageId }))
    } catch (e) {
      devlogerror(e)
    }
  }
}

function setReplies({ messageId, replies }) {
  return {
    type: SET_REPLIES,
    payload: {
      messageId,
      replies,
    },
  }
}
