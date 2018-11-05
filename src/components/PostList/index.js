import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import PostElement from "./PostElement"
import { List, ListItem, ListItemText } from "@material-ui/core"

const styles = theme => ({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
  },
  menuItem: {
    cursor: "pointer",
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
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
    const { posts, selected, classes } = this.props
    return (
      <List>
        <ListItem
          className={classes.menuItem}
          onClick={this.props.goPostCreate}
        >
          <ListItemText primary={"+ Crear Nuevo Post"} />
        </ListItem>
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
