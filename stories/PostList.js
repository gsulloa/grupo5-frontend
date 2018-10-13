import React from "react"
import { storiesOf } from "@storybook/react"
import PostList from "../src/components/PostList"
import { theme } from "../src/withRoot"
import { muiTheme } from "storybook-addon-material-ui"
import PostElement from "../src/components/PostList/PostElement"

export default () => {
  storiesOf("PostList", module)
    .addDecorator(muiTheme([theme]))
    .add("Empty postlist", () => <PostList />)
    .add("One element postlist (post array)", () => (
      <PostList posts={[{ id: 1, title: "Titulo", body: "Body" }]} />
    ))
    .add("Five elements postlist (post array)", () => (
      <PostList
        posts={Array(5)
          .fill(0)
          .map((_, index) => {
            return { id: index, title: "Titulo", body: "Body" }
          })}
      />
    ))
    .add("One element postlist (children)", () => (
      <PostList>
        <PostElement id={1} title="Titulo" body="Body" />
      </PostList>
    ))
    .add("Five elements postlist (children)", () => (
      <PostList>
        {Array(5)
          .fill(0)
          .map((_, index) => {
            return (
              <PostElement title="Titulo" body="Body" id={index} key={index} />
            )
          })}
      </PostList>
    ))
}
