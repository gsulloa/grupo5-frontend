import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ContentBox from "../../components/ContentBox"
import SignForm from "../../components/ContentBox/SignForm"
import "./index.css"

const styles = theme => ({
  container: {
    display: "flex",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing.unit,
  },
  centralize: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  }
})

class VisitHome extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      register: false,
    }
  }

  handleForgotPassword = () => {
    console.log("Forgot my password")
  }

  handleSubmit = () => {
    if (this.state.register) {
      console.log("post on sign up")
    } else {
      console.log("post sign in")
    }
  }

  render() {
    return (
      <div className={this.props.classes.container}>
        <ContentBox
          style={{ width: "50%" }}
          primaryContent={
            <SignForm
              submit={this.state.register ? "Registrarme" : "Iniciar Sesión"}
              register={this.state.register}
              onClick={this.handleSubmit}
              onSubmit={this.handleSubmit}
            />
          }
          secondaryContent={
            <div className={this.props.classes.centralize}>
              <a href="#" onClick={this.handleForgotPassword}>
                Forgot your password?
              </a>
              <br />
              <Button
                variant="outlined"
                color="secondary"
                className={this.props.classes.button}
              >
                Sign up
              </Button>
            </div>
          }
        />
      </div>
    )
  }
}

export default withStyles(styles)(VisitHome)
