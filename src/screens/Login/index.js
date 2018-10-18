import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ContentBox from "../../components/ContentBox"
import SignForm from "../../components/ContentBox/SignForm"
import "./index.css"
import { devlog } from "../../utils/log"

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
  },
})

const statuses = {
  login: 0,
  signup: 1,
  forgotPassword: 2,
}

class Login extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      register: statuses.login,
    }
  }

  changeStatus = () => {
    if (this.state.register === statuses.forgotPassword) {
      this.setState({ register: statuses.login })
    } else {
      this.setState({ register: statuses.signup })
    }
  }

  handleForgotPassword = () => {
    this.setState({ register: statuses.forgotPassword })
  }

  handleSubmit = () => {
    if (this.state.register === statuses.login) {
      devlog("post sign in")
    } else if (this.state.register === statuses.signup) {
      devlog("post on sign up")
    } else {
      devlog("post to forgot password")
    }
    this.setState({ register: statuses.login })
  }

  submitMessage = () => {
    if (this.state.register === statuses.login) {
      return "Iniciar Sesión"
    } else if (this.state.register === statuses.signup) {
      return "Registrarme"
    } else {
      return "Enviar"
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <ContentBox
          style={{ width: "50%" }}
          primaryContent={
            <SignForm
              submit={this.submitMessage()}
              register={this.state.register}
              onClick={this.handleSubmit}
              onSubmit={this.handleSubmit}
            />
          }
          secondaryContent={
            <div className={classes.centralize}>
              {this.state.register === statuses.forgotPassword &&
                `Las instrucciones para reestrablecer la contraseña serán
                enviadas a el mail ingresado`}
              {this.state.register !== statuses.forgotPassword && (
                <a href="#" onClick={this.handleForgotPassword}>
                  Forgot your password?
                </a>
              )}
              <br />
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={this.changeStatus}
              >
                {this.state.register === statuses.forgotPassword
                  ? "Sign in"
                  : "Sign up"}
              </Button>
            </div>
          }
        />
      </div>
    )
  }
}

export default withStyles(styles)(Login)
