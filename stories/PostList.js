import React from "react"
import { storiesOf } from "@storybook/react"
import PostList from "../src/components/PostList"
import { theme } from "../src/withRoot"
import { muiTheme } from "storybook-addon-material-ui"
import { action } from "@storybook/addon-actions"

export default () => {
  storiesOf("PostList", module)
    .addDecorator(muiTheme([theme]))
    .add("Empty postlist", () => <PostList />)
    .add("One element postlist", () => (
      <PostList posts={[{ id: 1, title: "Titulo", body: "Body" }]} />
    ))
    .add("Five elements postlist", () => (
      <PostList
        posts={Array(5)
          .fill(0)
          .map((_, index) => {
            return { id: index, title: "Titulo", body: "Body" }
          })}
        onPostClick={action("Clicked post")}
      />
    ))
    .add("Really big postlist", () => (
      <PostList
        posts={Array(100)
          .fill(0)
          .map((_, index) => {
            return { id: index, title: "Titulo", body: "Body" }
          })}
        onPostClick={action("Clicked post")}
      />
    ))
    .add("Selected element", () => (
      <PostList
        posts={Array(5)
          .fill(0)
          .map((_, index) => {
            return { id: index, title: "Titulo", body: "Body" }
          })}
        selected={2}
        onPostClick={action("Clicked post")}
      />
    ))
}
