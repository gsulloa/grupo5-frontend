import React, { Component } from "react"
import { connect } from "react-redux"

import { devlog } from "../../utils/log"

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

class Home extends Component {
  render() {
    devlog("Home", this.props)
    return (
      <div>
        <h1>React Template</h1>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
