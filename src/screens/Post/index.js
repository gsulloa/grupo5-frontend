import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { devlog } from "../../utils/log"
import Message from "../../components/Message"
import { push } from "connected-react-router";
import routes from "../../config/routes";

const styles = () => ({})

class Post extends Component {
  componentDidMount() {
    if (!this.props.auth) {
      this.props.goLogin()
    }
  }
  render() {
    devlog("Post", this.props)
    // TODO: Use selected Post
    const post = {
      id: 1,
      title: "Example post",
      body:
        "The world is full of obvious things which nobody by any chance ever observes.",
      messages: [
        {
          id: 4,
          author: "Jake",
          body: "Boyle, they found one of the stolen paintings at her house.",
          replies: [
            {
              id: 2,
              author: "Boyle",
              body:
                "But she says she didn't know how it ended up there. She's being set up.",
            },
            {
              id: 3,
              author: "Jake",
              body: "Framed! Art joke. Continue.",
            },
          ],
        },
      ],
    }
    return (
      <div>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body1">{post.body}</Typography>
        <br />
        {post.messages.map(msg => {
          return (
            <Message
              key={msg.id}
              author={msg.author}
              body={msg.body}
              replies={msg.replies}
            />
          )
        })}
      </div>
    )
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.bool,
  goLogin: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
})
const mapDispatchToProps = dispatch => ({
  goLogin: () => dispatch(push(routes.loginPath)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Post))
