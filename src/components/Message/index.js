import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Reply from "./Reply"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"

const styles = () => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

class Message extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.arrayOf(PropTypes.element),
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    replies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.any.isRequired,
        author: PropTypes.string.isRequired,
        body: PropTypes.string,
      })
    ),
  }
  static defaultProps = {
    replies: [],
  }

  render() {
    const { classes, replies } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.pos} color="textSecondary">
              {this.props.author}
            </Typography>
            <Typography component="p">{this.props.body}</Typography>
          </CardContent>
        </Card>
        {replies.map(reply => {
          return (
            <div key={reply.id}>
              <Reply {...reply} />
              <Divider />
            </div>
          )
        })}
      </div>
    )
  }
}

export default withStyles(styles)(Message)