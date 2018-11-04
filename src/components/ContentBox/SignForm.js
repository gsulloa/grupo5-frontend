import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  action: {
    display: "flex",
    justifyContent: "center",
  },
})

const SignForm = ({ classes, submit, register, onSubmit, onClick }) => {
  return (
    <form noValidate onSubmit={onSubmit}>
      <TextField
        required
        label="Email"
        type="email"
        autoComplete="email"
        className={classes.textField}
        margin="normal"
        fullWidth
        variant="outlined"
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
        />
      )}
      <CardActions className={classes.action}>
        <Button
          type="submit"
          color="primary"
          variant="outlined"
          onClick={onClick}
        >
          {submit}
        </Button>
      </CardActions>
    </form>
  )
}

SignForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  submit: PropTypes.string.isRequired,
  register: PropTypes.number.isRequired,
}

export default withStyles(styles)(SignForm)
