import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Hidden from "@material-ui/core/Hidden"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import PostList from "../PostList"
import { devlog } from "../../utils/log"

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

const drawerWidth = 240

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
})

class MainDrawer extends Component {
  static defaultProps = {
    posts: [],
  }

  state = {
    anchor: "left",
    mobileOpen: false,
  }

  handleChange = event => {
    this.setState({
      anchor: event.target.value,
    })
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  render() {
    devlog("Post", this.props)
    const { classes, posts } = this.props

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <PostList
          posts={posts.map(post => {
            return { ...post }
          })}
        />
      </div>
    )
    return (
      <div className={classes.root}>
        <CssBaseline />
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
            <Typography variant="h6" color="inherit" noWrap>
              Arquitrán SpA
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swap with js to avoid SEO duplication of links. */}
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
                keepMounted: true, // Better open performance on mobile.
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
          {...this.props.children}
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MainDrawer))
