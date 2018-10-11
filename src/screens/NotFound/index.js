import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { goBack } from "connected-react-router"

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  goBack,
}

const NotFound = ({ goBack }) => (
  <div>
    <h1>404</h1>
    <h3>Uh.. parece que te perdiste</h3>
    <button onClick={goBack}>Volver a página anterior</button>
    <Link to="/">Ir a página de inicio</Link>
  </div>
)

NotFound.propTypes = {
  goBack: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotFound)
