import React from "react"
import { storiesOf } from "@storybook/react"
import { theme } from "../src/withRoot"
import { muiTheme } from "storybook-addon-material-ui"
import { action } from "@storybook/addon-actions"
import Search from "../src/components/Search"

export default () => {
  storiesOf("Search", module)
    .addDecorator(muiTheme([theme]))
    .add("Empty search input", () => (
      <Search handleSearch={action("Search!!")} />
    ))
    .add("Predefined text", () => (
      <Search handleSearch={action("Search!!")} query={"find text"} />
    ))
    .add("Predefined text with result", () => (
      <Search
        handleSearch={action("Search!!")}
        query={"find text"}
        results={[1, 2]}
      />
    ))
}
