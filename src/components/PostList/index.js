import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core/styles"
import PostElement from "./PostElement"
import { List } from "@material-ui/core"

const styles = theme => ({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
  },
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white,
      },
    },
  },
  menuList: {
    flex: 1,
  },
  primary: {},
  icon: {},
})

function PostList(props) {
  const { classes } = props

  return (
    <Paper className={classes.container}>
      <List>
        <PostElement title="test" body="as" selected />
        <PostElement title="test" body="as" />
        <PostElement
          title="test"
          body={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis at purus at fringilla. Aliquam erat volutpat. Vivamus aliquam, lectus non feugiat luctus, nulla erat bibendum libero, in scelerisque arcu velit non lectus. Nullam sagittis malesuada magna. Curabitur aliquet vehicula interdum. Suspendisse eleifend vulputate lacus, a lobortis leo elementum ut. Morbi dictum accumsan faucibus. Sed sit amet metus ultrices, euismod magna a, elementum justo. Suspendisse ut dui eget risus euismod ultrices nec vitae dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus. In posuere turpis a iaculis aliquam.

Phasellus eget est pretium, faucibus nulla id, congue arcu. Cras molestie turpis eu posuere efficitur. Quisque eleifend aliquam sapien, in tristique nibh ultricies sagittis. Donec at neque convallis mi tempus laoreet in eu sem. Nulla facilisi. In in orci mattis mi suscipit dictum. Vivamus dignissim odio in magna feugiat venenatis. Integer diam enim, gravida vel bibendum id, ultricies non elit.

`}
        />
      </List>
    </Paper>
  )
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostList)
