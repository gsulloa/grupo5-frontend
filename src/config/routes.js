const realPath = path => `${process.env.REACT_APP_PATH_PREFIX || ""}${path}`
export default {
  homePath: realPath("/"),
  customPath: path => realPath(path),
  loginPath: realPath("/login"),
  postsPath: (postId = ":postId") => realPath(`/posts/${postId}`),
  newPostPath: realPath("/posts"),
  searchPath: realPath("/search")
}
