import doFetch from "./fetching"
import { devlogerror } from "../../../utils/log"

const type = "POST"
const initialState = {
  fetching: false,
  error: false,
  data: [],
}

const SET_POSTS = "SET_POSTS"
export default function posts(state = initialState, { type, payload }) {
  switch (type) {
    case SET_POSTS:
      return {
        ...state,
        data: payload,
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

function fetchPosts(api, { apiPrefix }) {
  return api.get(`${apiPrefix}/posts`)
}

function createPost(api, { apiPrefix, ...content}) {
  return api.post(`${apiPrefix}/posts`, content)
}

export function getPosts() {
  return async (dispatch, getState, { api }) => {
    try {
      const response = await doFetch(
        dispatch,
        fetchPosts(api.withToken(getState().auth.token), {
          apiPrefix: getState().auth.data.apiPrefix}),
        type
      )
      dispatch(setPosts(response))
    } catch (e) {
      devlogerror(e)
    }
  }
}

export function addPost(content) {
  return async (dispatch, getState, { api }) => {
    try {
      await doFetch(
        dispatch,
        createPost(api.withToken(getState().auth.token), {
          ...content,
          apiPrefix: getState().auth.data.apiPrefix
        }),
        type
      )
      dispatch(getPosts())
    } catch (e) {
      devlogerror(e)
    }
  }
}

function setPosts(posts) {
  return {
    type: SET_POSTS,
    payload: posts,
  }
}
