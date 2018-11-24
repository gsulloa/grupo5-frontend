import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { push } from "connected-react-router"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { TextField } from "@material-ui/core"
import { devlog } from "../../utils/log"
import Message from "../../components/Message"
import routes from "../../config/routes"
import { getMessages, addMessage } from "../../config/redux/modules/messages"
import { getPeople } from "../../config/redux/modules/people"

const styles = () => ({})

class Post extends Component {
  componentDidMount() {
    if (!this.props.auth) {
      this.props.goLogin()
    }
  }

  state = {
    text: "",
  }
  handleSubmit = e => {
    e.preventDefault()
    if (this.state.text !== "") {
      this.props.addMessage({
        postId: this.props.post.id,
        content: this.state.text,
      })
      this.setState({
        text: "",
      })
    }
  }

  matchAuthor = authorId => {
    const { people } = this.props
    const person = people[authorId]
    return person.email
  }

  render() {
    devlog("Post", this.props)
    const { post } = this.props
    return (
      <div>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body1">{post.description}</Typography>
        <br />
        {post.messages.map(msg => {
          return (
            <Message
              {...msg}
              key={msg.id}
              author={msg.author}
              body={msg.body}
              replies={msg.replies}
              matchAuthor={this.matchAuthor}
            />
          )
        })}
        <div>
          <form onSubmit={this.handleSubmit}>
            <TextField
              required
              label="Nuevo mensaje"
              margin="normal"
              fullWidth
              value={this.state.text}
              onChange={e => this.setState({ text: e.target.value })}
            />
          </form>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.bool,
  goLogin: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  getPeople: PropTypes.func.isRequired,
  post: PropTypes.object,
  people: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => {
  const post = state.posts.data.find(
    e => e.id === Number(ownProps.match.params.postId)
  )
  const people = {}
  state.people.data.map(person => (people[person.id] = person))
  const fetching =
    state.posts.fetching && state.messages.fetching && state.replies.fetching
  return {
    auth: state.auth.isAuthenticated,
    people,
    post:
      post && !fetching
        ? {
            ...post,
            messages: state.messages.data[post.id]
              ? state.messages.data[post.id].map(message => {
                  return {
                    ...message,
                    author: message.personId,
                    body: message.description,
                    replies: state.replies.data[message.id]
                      ? state.replies.data[message.id].map(r => ({
                          body: r.description,
                          author: r.personId,
                        }))
                      : [],
                  }
                })
              : [],
          }
        : { messages: [] },
  }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  goLogin: () => dispatch(push(routes.loginPath)),
  getPeople: () => dispatch(getPeople()),
  getMessages: () =>
    dispatch(getMessages({ postId: ownProps.match.params.postId })),
  addMessage: ({ content, postId }) =>
    dispatch(addMessage({ content, postId })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Post))
