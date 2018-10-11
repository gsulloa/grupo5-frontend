import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import { connectRouter } from "connected-react-router"

function configureReducers({ storage, history }) {
  const persistConfig = {
    key: "root",
    storage,
    blacklist: ["hydratation", "routing"],
    version: 1,
  }

  const combinedReducer = combineReducers({
    keep: state => state || null,
  })

  const persistedReducer = persistReducer(persistConfig, combinedReducer)
  const routedReducer = connectRouter(history)(persistedReducer)
  return routedReducer
}

export default configureReducers
