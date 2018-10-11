import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route as RouteDom, Switch, withRouter } from "react-router-dom"
import { Helmet } from "react-helmet"

import Home from "./screens/Home"
import NotFound from "./screens/NotFound"

import routes from "./config/routes"

const siteTitle = title => (title ? `RT | ${title}` : "React Template")

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
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={routes.homePath} component={Home} />
          <Route component={NotFound} title="Not found" />
        </Switch>
      </div>
    )
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navigator)
)
