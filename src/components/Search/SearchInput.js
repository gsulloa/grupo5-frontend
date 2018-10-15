import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import SearchIcon from "@material-ui/icons/Search"
import debounce from "lodash/debounce"

import { DEBOUNCE_SEARCH_TIMEOUT } from "../../config/constants"

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
})

class SearchInput extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    query: PropTypes.string,
  }
  static defaultProps = {
    query: "",
  }

  componentDidMount() {
    if (this.props.query !== "") {
      this.handleSearch(this.props.query)
      this.handleSearch.flush()
    }
  }

  state = {
    query: this.props.query,
  }

  handleWrite = e => {
    const query = e.target.value
    this.setState({ query })
    this.handleSearch(query)
  }

  handleSearch = debounce(this.props.onSearch, DEBOUNCE_SEARCH_TIMEOUT, {
    trailing: true,
    leading: false,
  })

  handleSubmit = e => {
    e.preventDefault()
    this.handleSearch.flush()
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
            <form onSubmit={this.handleSubmit}>
              <TextField
                id="input-with-icon-grid"
                label="Buscar..."
                value={this.state.query}
                onChange={this.handleWrite}
              />
            </form>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(SearchInput)
