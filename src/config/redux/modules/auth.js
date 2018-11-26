import { push } from "react-router-redux"
import doFetch from "./fetching"
import { devlogerror } from "../../../utils/log"
import routes from "../../routes"
import { getPosts } from "./posts"

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"

const type = "LOGIN"
const initialState = {
  fetching: false,
  error: false,
  isAuthenticated: false,
  data: {},
}
export default function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.data,
        isAuthenticated: true,
        error: false,
        token: action.token,
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
        error: action.payload,
      }
    default:
      return state
  }
}
/*
   api Fetchs
 */
function login(api, { email, password, api: apiPrefix }) {
  return api.post(`${apiPrefix}/people/login`, { email, password })
}
function register(api, { api: apiPrefix, ...data}) {
  return api
    .post(`${apiPrefix}/people`, data)
}
/*
  before Actions
*/
export function loginUser(creds) {
  return async (dispatch, getState, api) => {
    try {
      const response = await doFetch(dispatch, login(api.api, creds), type)
      dispatch(
        receiveLogin(
          {
            userId: response.userId,
            apiPrefix: creds.api
          },
          response.id
        )
      )
      dispatch(getPosts())
      dispatch(push(routes.homePath))
    } catch (e) {
      devlogerror(e)
    }
  }
}

export function registerUser(registerData) {
  return async (dispatch, getState, api) => {
    try {
      await doFetch(dispatch, register(api.api, registerData), type)
      dispatch(
        loginUser({
          email: registerData.email,
          password: registerData.password,
          api: registerData.api,
        })
      )
    } catch (e) {
      devlogerror(e)
    }
  }
}

export function logoutUser() {
  return async dispatch => {
    dispatch({ type: "RESET" })
    dispatch(push(routes.loginPath))
  }
}

function receiveLogin(data, token) {
  return {
    type: LOGIN_SUCCESS,
    data,
    token,
  }
}
