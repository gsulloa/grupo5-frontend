import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
  Typography,
  TextField,
  withStyles,
  CardActions,
  Button,
} from "@material-ui/core"
import { addPost } from "../../config/redux/modules/posts"

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

class NewPost extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
  }
  state = {
    title: "",
    description: "",
  }
  handleWrite = (key, value) => {
    this.setState({
      [key]: value,
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    if (this.state.title !== "" && this.state.description !== "") {
      this.props.addPost(this.state)
      this.setState({
        title: "",
        description: "",
      })
    }
  }
  render() {
    const { classes } = this.props
    return (
      <div>
        <Typography variant="h6">Nuevo Post</Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField
            required
            label="Titulo"
            className={classes.textField}
            margin="normal"
            fullWidth
            value={this.state.title}
            onChange={e => this.handleWrite("title", e.target.value)}
          />

          <TextField
            required
            label="Descripción"
            className={classes.textField}
            margin="normal"
            fullWidth
            value={this.state.description}
            onChange={e => this.handleWrite("description", e.target.value)}
          />

          <CardActions>
            <Button type="submit" color="primary" variant="outlined">
              Crear
            </Button>
          </CardActions>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addPost: ({ title, description }) =>
    dispatch(addPost({ title, description })),
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(NewPost))
