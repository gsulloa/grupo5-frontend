import React from "react"
import ReactDOM from "react-dom"
import createHistory from "history/createBrowserHistory"
import App from "./App"
import Api from "./Api"
import configureStore from "./config/redux/store"
import { devlog } from "./utils/log"
import * as serviceWorker from "./serviceWorker"

const api = new Api(process.env.REACT_APP_API || "http://localhost:3000")

// Redux required objects
const initialState = {}
const history = createHistory()

const { store, persistor } = configureStore(initialState, history, { api })

devlog("index.js", "store", store, "persistor", persistor)

export default ReactDOM.render(
  <App store={store} history={history} persistor={persistor} />,
  document.getElementById("root") || document.createElement("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
