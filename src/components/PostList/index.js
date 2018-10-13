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
  const { classes, children, posts } = props

  return (
    <List>
      {children}
      {posts.map(post => {
        return <PostElement key={post.id} {...post} />
      })}
    </List>
  )
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string,
    })
  ),
}
PostList.defaultProps = {
  posts: [],
}

export default withStyles(styles)(PostList)
