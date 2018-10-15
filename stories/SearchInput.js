import React from "react"
import { storiesOf } from "@storybook/react"
import { theme } from "../src/withRoot"
import { muiTheme } from "storybook-addon-material-ui"
import { action } from "@storybook/addon-actions"
import SearchInput from "../src/components/Search/SearchInput"

export default () => {
  storiesOf("SearchInput", module)
    .addDecorator(muiTheme([theme]))
    .add("Empty search input", () => (
      <SearchInput onSearch={action("Search!!")} />
    ))
    .add("Predefined text", () => (
      <SearchInput onSearch={action("Search!!")} query={"find text"} />
    ))
}
