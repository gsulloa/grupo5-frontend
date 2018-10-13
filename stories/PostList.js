import React from "react"
import { storiesOf } from "@storybook/react"
import PostList from "../src/components/PostList"
import { theme } from "../src/withRoot"
import { muiTheme } from "storybook-addon-material-ui"

export default () => {
  storiesOf("PostList", module)
    .addDecorator(muiTheme([theme]))
    .add("empty postlist", () => <PostList />)
}
