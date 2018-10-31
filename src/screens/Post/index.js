import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import MainDrawer from "../../components/MainDrawer"
import { devlog } from "../../utils/log"
import PostList from "../../components/PostList"

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

class Post extends Component {
  state = {
    posts: [],
  }

  render() {
    devlog("Post", this.props)
    return (
      <div>
        <MainDrawer posts=<PostList/>>
          <Typography paragraph>One paragraph</Typography>
        </MainDrawer>
      </div>
    )
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Post))
