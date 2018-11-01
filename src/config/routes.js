const realPath = path => `${process.env.REACT_APP_PATH_PREFIX || ""}${path}`
export default {
  homePath: realPath("/"),
  customPath: path => realPath(path),
  loginPath: realPath("/login"),
  postsPath: realPath("/posts"),
}
