import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import { connect } from "react-redux"
import ContentBox from "../../components/ContentBox"
import SignForm from "../../components/ContentBox/SignForm"
import "./index.css"
import { devlog } from "../../utils/log"
import { Typography } from "@material-ui/core"
import { loginUser } from "../../config/redux/modules/auth"

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
    loginUser: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      register: statuses.login,
    }
  }

  changeStatus = () => {
    if (this.state.register === statuses.signup) {
      this.setState({ register: statuses.login })
    } else {
      this.setState({ register: statuses.signup })
    }
  }

  handleForgotPassword = () => {
    this.setState({ register: statuses.forgotPassword })
  }

  handleSubmit = data => {
    if (this.state.register === statuses.login) {
      this.props.loginUser(data)
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
              onSubmit={this.handleSubmit}
            />
          }
          secondaryContent={
            <div className={classes.centralize}>
              {this.state.register === statuses.forgotPassword && (
                <Typography>
                  Las instrucciones para reestrablecer la contraseña serán
                  enviadas a el mail ingresado
                </Typography>
              )}
              {this.state.register !== statuses.forgotPassword && (
                <Button onClick={this.handleForgotPassword}>
                  Forgot your password?
                </Button>
              )}
              <br />
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={this.changeStatus}
              >
                {this.state.register === statuses.signup
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

const mapDispatchToProps = dispatch => ({
  loginUser: ({ email, password }) => dispatch(loginUser({ email, password })),
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Login))
