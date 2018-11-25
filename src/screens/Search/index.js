import React, { Component } from "react"
import PropTypes from "prop-types"
import flatten from "lodash/flatten"
import compact from "lodash/compact"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { parse } from "query-string"
import { devlog } from "../../utils/log"
import { push } from "connected-react-router"
import routes from "../../config/routes"
import SearchComponent from "../../components/Search"
import { normalizeText } from "../../utils/string";

class Search extends Component {
  static propTypes = {
    auth: PropTypes.bool,
    goLogin: PropTypes.func.isRequired,
  }
  componentDidMount() {
    if (!this.props.auth) {
      this.props.goLogin()
    }
  }

  handleSearch = q => {
    this.props.search(q)
  }

  render() {
    devlog("Search", this.props)
    const { q: query } = parse(this.props.location.search)
    const { results, goPost } = this.props
    return (
      <div>
        <SearchComponent handleSearch={this.handleSearch} query={query} results={results} goPost={goPost}/>
      </div>
    )
  }
}

const getResults = ({ locationSearch, state }) => {
  const { q: query } = parse(locationSearch)
  const normalizedQueries = compact(normalizeText(query).split(",").map(t => t.trim()))
  if (!normalizedQueries.length) return []
  const { posts: { data: posts }, replies: { data: replies }, messages: { data: messages }} = state
  const flattenPosts = posts.map(post => ({ ...post, type: "post", postId: post.id}))
  const flattenMessages = flatten(Object.values(messages)).map(message => ({ ...message, type: "message" }))
  const flattenReplies = flatten(Object.values(replies)).map(reply => ({ 
      ...reply,
      type: "reply",
      postId: flattenMessages.find(m => m.id === reply.messageId).postId
    })
  )
  return [...flattenPosts, ...flattenMessages, ...flattenReplies]
    .filter(data => {
      const searchIn = compact([
        data.title,
        data.description
      ])
      for (const t of searchIn) {
        const normalizedText = normalizeText(t)
        if (normalizedQueries.some(q => normalizedText.includes(q))) return true
      }
      return false
    })
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth.isAuthenticated,
    results: getResults({
      locationSearch: ownProps.location.search,
      state
    }),
  }
}

const mapDispatchToProps = dispatch => ({
  goLogin: () => dispatch(push(routes.loginPath)),
  goPost: postId => dispatch(push(routes.postsPath(postId))),
  search: q => dispatch(push(`${routes.searchPath}${q ? `?q=${q}` : ""}`))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Search))
