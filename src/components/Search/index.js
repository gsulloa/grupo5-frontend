import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import SearchIcon from "@material-ui/icons/Search"

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
})

class Search extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    query: "",
  }
  handleWrite = e => {
    const query = e.target.value
    this.setState({ query })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <SearchIcon />
          </Grid>
          <Grid item>
            <TextField
              id="input-with-icon-grid"
              label="Buscar..."
              value={this.state.query}
              onChange={this.handleWrite}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Search)
