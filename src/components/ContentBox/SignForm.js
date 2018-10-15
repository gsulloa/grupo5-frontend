import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import CardActions from "@material-ui/core/CardActionArea"
import Button from "@material-ui/core/Button"

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  action: {
    marginRight: "auto",
    marginLeft: "auto",
  },
})

const SignForm = ({ classes, submit, register, onSubmit, onClick }) => {
  return (
    <form noValidate onSubmit={onSubmit}>
      <Typography>
        <TextField
          required={register}
          label="Email"
          type="email"
          autocomplete="email"
          className={classes.textField}
          margin="normal"
          fullWidth
          variant="outlined"
        />
      </Typography>
      <Typography>
        <TextField
          required={register}
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          fullWidth
          variant="outlined"
        />
      </Typography>
      {register && (
        <Typography>
          <TextField
            required
            label="Nombre"
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
        </Typography>
      )}
      {register && (
        <Typography>
          <TextField
            required
            label="Apellido"
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
        </Typography>
      )}
      <Typography>
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
      </Typography>
    </form>
  )
}

SignForm.propTypes = {
  classes: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  submit: PropTypes.string.isRequired,
  register: PropTypes.bool.isRequired,
}

export default withStyles(styles)(SignForm)
