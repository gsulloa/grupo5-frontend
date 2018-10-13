import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { ListItem, ListItemText } from "@material-ui/core"
import { MAX_SHORT_BODY_LENGTH } from "../../config/constants"

const styles = theme => ({
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white,
      },
    },
  },
})

const PostElement = ({ classes, title, body, ...props }) => {
  const shortBody =
    body.length > MAX_SHORT_BODY_LENGTH
      ? body.slice(0, MAX_SHORT_BODY_LENGTH) + "..."
      : body
  return (
    <ListItem className={classes.menuItem} {...props}>
      <ListItemText primary={title} secondary={shortBody} />
    </ListItem>
  )
}

PostElement.propTypes = {
  classes: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
}
PostElement.defaultProps = {
  body: "",
}

export default withStyles(styles)(PostElement)
