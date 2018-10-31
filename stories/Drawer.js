import React from "react"
import { storiesOf } from "@storybook/react"
import MainDrawer from "../src/components/MainDrawer"
import { theme } from "../src/withRoot"
import { muiTheme } from "storybook-addon-material-ui"
import { action } from "@storybook/addon-actions"

export default () => {
  storiesOf("Drawer", module)
    .addDecorator(muiTheme([theme]))
    .add("Empty Drawer", () => <MainDrawer />)
    .add("One element Drawer", () => (
      <MainDrawer posts={[{ id: 1, title: "Titulo", body: "Body" }]} />
    ))
    .add("Five elements postlist", () => (
      <MainDrawer
        posts={Array(5)
          .fill(0)
          .map((_, index) => {
            return { id: index, title: "Titulo", body: "Body" }
          })}
        onPostClick={action("Clicked post")}
      />
    ))
    .add("Really big postlist", () => (
      <MainDrawer
        posts={Array(100)
          .fill(0)
          .map((_, index) => {
            return { id: index, title: "Titulo", body: "Body" }
          })}
        onPostClick={action("Clicked post")}
      />
    ))
    .add("Selected element", () => (
      <MainDrawer
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
