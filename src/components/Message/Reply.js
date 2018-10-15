import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { ListItem, ListItemText } from "@material-ui/core"
import { MAX_SHORT_REPLY_BODY_LENGTH } from "../../config/constants"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
  menuItem: {
    display: "flex",
    cursor: "pointer",
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white,
      },
    },
  },
  pos: {
    marginBottom: 12,
  },
})

class Reply extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string,
  }
  static defaultProps = {
    author: "",
    body: "",
  }
  constructor(props) {
    super(props)
    this.state = {
      showMore: false,
    }
  }

  handleShowMore = () => {
    const { showMore } = this.state
    this.setState({ showMore: !showMore })
  }

  render() {
    const { classes, body, author } = this.props
    const shortBody =
      body.length > MAX_SHORT_REPLY_BODY_LENGTH
        ? body.slice(0, MAX_SHORT_REPLY_BODY_LENGTH)
        : body
    return (
      <ListItem className={classes.menuItem}>
        <div>
          <ListItemText
            primary={author}
            secondary={this.state.showMore ? body : shortBody}
          />
          {body.length > MAX_SHORT_REPLY_BODY_LENGTH && (
            <Typography
              className={classes.pos}
              color="textSecondary"
              onClick={this.handleShowMore}
            >
              {this.state.showMore ? "Ver menos..." : "Ver más..."}
            </Typography>
          )}
        </div>
      </ListItem>
    )
  }
}

Reply.propTypes = {
  classes: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  body: PropTypes.string,
}
Reply.defaultProps = {
  body: "",
}

export default withStyles(styles)(Reply)
