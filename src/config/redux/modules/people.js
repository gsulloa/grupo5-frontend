import doFetch from "./fetching"
import { devlogerror } from "../../../utils/log"

const type = "PERSON"
const initialState = {
  fetching: false,
  error: false,
  data: {},
}

const SET_PEOPLE = "SET_PEOPLE"
export default function posts(state = initialState, { type, payload }) {
  switch (type) {
    case SET_PEOPLE:
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

function fetchPeople(api) {
  return api.get(`/services/175/people`)
}

export function getPeople() {
  return async (dispatch, getState, { api }) => {
    try {
      const response = await doFetch(
        dispatch,
        fetchPeople(api.withToken(getState().auth.token)),
        type
      )
      const people = response.reduce((all, person) => {
        all[person.id] = person
        return all
      }, {})
      dispatch(setPeople(people))
    } catch (e) {
      devlogerror(e)
    }
  }
}

function setPeople(people) {
  return {
    type: SET_PEOPLE,
    payload: people,
  }
}
