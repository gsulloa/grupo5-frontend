import React from "react"
import { storiesOf } from "@storybook/react"
import { theme } from "../src/withRoot"
import { muiTheme } from "storybook-addon-material-ui"
import { action } from "@storybook/addon-actions"
import Search from "../src/components/Search"

export default () => {
  storiesOf("Search", module)
    .addDecorator(muiTheme([theme]))
    .add("Empty search", () => <Search onSearch={action("Search!!")} />)
}
