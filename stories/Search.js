import React from "react"
import { storiesOf } from "@storybook/react"
import { theme } from "../src/withRoot"
import { muiTheme } from "storybook-addon-material-ui"
import { action } from "@storybook/addon-actions"
import Search from "../src/components/Search"

export default () => {
  storiesOf("Search", module)
    .addDecorator(muiTheme([theme]))
    .add("Empty search", () => <Search handleSearch={action("Search!!")} />)
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
    .add("Empty search with div", () => (
      <div style={{ height: "500px", display: "flex" }}>
        <Search handleSearch={action("Search!!")} />
      </div>
    ))
}
