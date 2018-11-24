import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { MAX_SHORT_REPLY_BODY_LENGTH } from "../../config/constants"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
  container: {
    marginLeft: 3 * theme.spacing.unit,
    marginRight: 3 * theme.spacing.unit,
    marginTop: theme.spacing.unit,
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  pos: {
    cursor: "pointer",
    marginBottom: 12,
  },
  comment: {
    display: "inline-block",
  },
  author: {
    display: "inline-block",
    marginRight: 3,
  },
})

class Reply extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    matchAuthor: PropTypes.func.isRequired,
    author: PropTypes.number.isRequired,
    body: PropTypes.string,
  }
  static defaultProps = {
    author: "Autor",
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
    const { classes, body, author, matchAuthor } = this.props
    const shortBody =
      body.length > MAX_SHORT_REPLY_BODY_LENGTH
        ? body.slice(0, MAX_SHORT_REPLY_BODY_LENGTH)
        : body
    return (
      <div className={classes.container}>
        <Typography className={classes.author} color="textSecondary">
          {matchAuthor(author)}:
        </Typography>
        <Typography className={classes.comment}>
          {this.state.showMore ? body : shortBody}
        </Typography>
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
    )
  }
}

export default withStyles(styles)(Reply)
