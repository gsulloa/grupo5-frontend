import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route as RouteDom, Switch, withRouter } from "react-router-dom"
import { Helmet } from "react-helmet"

import Home from "./screens/Home"
import Login from "./screens/Login"
import NotFound from "./screens/NotFound"
import Post from "./screens/Post"
import MainDrawer from "./components/MainDrawer"

import routes from "./config/routes"
import withRoot from "./withRoot"

const siteTitle = title => (title ? `RT | ${title}` : "Arquitran SpA")

const Route = props => (
  <div>
    <Helmet>
      <title>{siteTitle(props.title)}</title>
    </Helmet>
    <RouteDom {...props} />
  </div>
)

Route.propTypes = {
  title: PropTypes.string,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

class Navigator extends Component {
  state = {
    posts: [],
    selected: 0,
  }

  render() {
    return (
      <div>
        <MainDrawer>
          <Switch>
            <Route exact path={routes.homePath} component={Home} />
            <Route exact path={routes.postsPath()} component={Post} />
            <Route exact path={routes.login} component={Login} />
            <Route component={NotFound} title="Not found" />
          </Switch>
        </MainDrawer>
      </div>
    )
  }
}

export default withRoot(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Navigator)
  )
)
