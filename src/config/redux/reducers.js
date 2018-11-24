import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import { connectRouter } from "connected-react-router"

import auth from "./modules/auth"
import posts from "./modules/posts"
import messages from "./modules/messages"
import replies from "./modules/replies"
import people from "./modules/people"

function configureReducers({ storage, history }) {
  const persistConfig = {
    key: "root",
    storage,
    blacklist: ["hydratation", "routing"],
    version: 1,
  }

  const combinedReducer = combineReducers({
    auth,
    posts,
    messages,
    replies,
    people,
  })
  const rootReducer = (state, action) => {
    if (action.type === "RESET") {
      state = undefined
    }
    return combinedReducer(state, action)
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const routedReducer = connectRouter(history)(persistedReducer)
  return routedReducer
}

export default configureReducers
