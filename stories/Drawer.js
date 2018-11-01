import React from "react"
import { storiesOf } from "@storybook/react"
import MainDrawer from "../src/components/MainDrawer"
import { theme } from "../src/withRoot"
import { muiTheme } from "storybook-addon-material-ui"
import { action } from "@storybook/addon-actions"

export default () => {
  storiesOf("Drawer", module)
    .addDecorator(muiTheme([theme]))
    .add("Drawer with elements", () => (
      <MainDrawer onPostClick={action("Clicked post")} />
    ))
    .add("Drawer content", () => (
      <MainDrawer onPostClick={action("Clicked post")}>
        <h4> Main Title </h4>
      </MainDrawer>
    ))
}
