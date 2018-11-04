import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"

const styles = {
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
}

class ContentBox extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.arrayOf(PropTypes.element),
    primaryContent: PropTypes.object.isRequired,
    secondaryContent: PropTypes.element,
    variant: PropTypes.string,
    secondaryVariant: PropTypes.string,
    align: PropTypes.string,
  }
  static defaultProps = {
    variant: "body2",
    align: "inherit",
    secondaryVariant: "body2",
  }
  render() {
    const { classes, primaryContent, secondaryContent } = this.props
    return (
      <Card className={classes.card}>
        <CardContent>{primaryContent}</CardContent>
        {secondaryContent !== undefined && <Divider />}

        <CardActions>{secondaryContent}</CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(ContentBox)
