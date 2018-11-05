import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { devlog } from "../../utils/log"
import { push } from "connected-react-router"
import routes from "../../config/routes"

class Home extends Component {
  static propTypes = {
    auth: PropTypes.bool,
    goLogin: PropTypes.func.isRequired,
  }
  componentDidMount() {
    if (!this.props.auth) {
      this.props.goLogin()
    }
  }
  render() {
    devlog("Home", this.props)
    return (
      <div>
        <h1>React Template</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
})
const mapDispatchToProps = dispatch => ({
  goLogin: () => dispatch(push(routes.loginPath)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
