import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Hidden from "@material-ui/core/Hidden"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import Button from "@material-ui/core/Button"
import PostList from "../PostList"
import { devlog } from "../../utils/log"
import "./index.css"
import { push } from "connected-react-router"
import routes from "../../config/routes"
import { getPosts } from "../../config/redux/modules/posts"
import { getMessages } from "../../config/redux/modules/messages"
import { getPeople } from "../../config/redux/modules/people"
import { logoutUser } from "../../config/redux/modules/auth"

const drawerWidth = 280

const styles = theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  grow: {
    flexGrow: 1,
  },
})

class MainDrawer extends Component {
  state = {
    anchor: "left",
    mobileOpen: false,
    post: {},
    posts: [],
  }

  componentDidMount() {
    if (this.props.auth) this.props.getPosts()
  }

  handleChange = event => {
    this.setState({
      anchor: event.target.value,
    })
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  selectPost = post => {
    devlog("Selecting post", post)
    this.props.goToPost(post.id)
    this.props.getMessages({ postId: post.id })
    this.props.getPeople()
  }

  userLogged = () => {
    // TODO: Check if user is logged
    return this.props.auth
  }

  render() {
    devlog("Post", this.props)
    const { classes } = this.props
    if (!this.userLogged()) {
      return (
        <div className={classes.root}>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {this.props.children}
          </main>
        </div>
      )
    }

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <PostList
          posts={this.props.posts}
          onPostClick={this.selectPost}
          goPostCreate={this.props.goPostCreate}
        />
      </div>
    )
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.grow}
            >
              Arquitrán SpA
            </Typography>
            <IconButton color="inherit" onClick={this.props.goToSearch}>
              <SearchIcon />
            </IconButton>
            <Button color="inherit" onClick={this.props.logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor="left"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    )
  }
}

MainDrawer.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      author: PropTypes.string.isRequired,
      body: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  auth: PropTypes.bool,
  getPosts: PropTypes.func.isRequired,
  goToPost: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  getPeople: PropTypes.func.isRequired,
  goPostCreate: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}
MainDrawer.defaultProps = {
  auth: false,
  posts: [],
}

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
  posts: state.posts.data,
})
const mapDispatchToProps = dispatch => ({
  goLogin: () => dispatch(push(routes.loginPath)),
  logout: () => dispatch(logoutUser()),
  getPosts: () => dispatch(getPosts()),
  goToPost: postId => dispatch(push(routes.postsPath(postId))),
  goToSearch: () => dispatch(push(routes.searchPath)),
  goPostCreate: () => dispatch(push(routes.newPostPath)),
  getMessages: ({ postId }) => dispatch(getMessages({ postId })),
  getPeople: () => dispatch(getPeople()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MainDrawer))
