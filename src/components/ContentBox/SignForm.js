import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  select: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
  },
  action: {
    display: "flex",
    justifyContent: "center",
  },
  inputLabel: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})

class SignForm extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    lastName: "",
    api: 5,
}
  onWrite = (key, val) => {
    this.setState({
      [key]: val,
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    const { onSubmit } = this.props
    onSubmit(this.state)
  }
  render() {
    const { classes, submit, register } = this.props
    return (
      <form noValidate onSubmit={this.handleSubmit} className={classes.root}>
        <TextField
          required
          label="Email"
          type="email"
          autoComplete="email"
          className={classes.textField}
          margin="normal"
          fullWidth
          variant="outlined"
          value={this.state.email}
          onChange={e => this.onWrite("email", e.target.value)}
        />
        {register !== 2 && (
          <TextField
            required={register === 0 || register === 1}
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            fullWidth
            variant="outlined"
            value={this.state.password}
            onChange={e => this.onWrite("password", e.target.value)}
          />
        )}
        {register === 1 && (
          <TextField
            required
            label="Nombre"
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
            value={this.state.name}
            onChange={e => this.onWrite("name", e.target.value)}
          />
        )}
        {register === 1 && (
          <TextField
            required
            label="Apellido"
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
            value={this.state.lastName}
            onChange={e => this.onWrite("lastName", e.target.value)}
          />
        )}
        <InputLabel className={classes.inputLabel}>API</InputLabel>
        <Select
          required
          value={this.state.api}
          onChange={e => this.onWrite("api", e.target.value)}
          displayEmpty
          name="api"
          className={classes.select}
        >
          <MenuItem value={5}>Group 51</MenuItem>
          <MenuItem value={3}>Group 3</MenuItem>
        </Select>
        <CardActions className={classes.action}>
          <Button type="submit" color="primary" variant="outlined">
            {submit}
          </Button>
        </CardActions>
      </form>
    )
  }
}

SignForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submit: PropTypes.string.isRequired,
  register: PropTypes.number.isRequired,
}

export default withStyles(styles)(SignForm)
