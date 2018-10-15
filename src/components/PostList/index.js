import React, { Component } from "react"
import PropTypes from "prop-types"
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

class PostList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.arrayOf(PropTypes.element),
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string,
      })
    ),
    onPostClick: PropTypes.func.isRequired,
    selected: PropTypes.any,
  }
  static defaultProps = {
    posts: [],
  }

  handlePostClick = post => {
    this.props.onPostClick(post)
  }

  render() {
    const { posts, selected } = this.props
    return (
      <List>
        {posts.map(post => {
          return (
            <PostElement
              key={post.id}
              {...post}
              onClick={() => this.handlePostClick(post)}
              selected={post.id === selected}
            />
          )
        })}
      </List>
    )
  }
}

export default withStyles(styles)(PostList)
