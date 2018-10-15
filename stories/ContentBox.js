import React from "react"
import { storiesOf } from "@storybook/react"
import { muiTheme } from "storybook-addon-material-ui"
import ContentBox from "../src/components/ContentBox"
import { theme } from "../src/withRoot"

export default () => {
  storiesOf("ContentBox", module)
    .addDecorator(muiTheme([theme]))
    .add("Empty ContentBox", () => <ContentBox />)
    .add("Top content ContentBox", () => (
      <ContentBox primaryContent={<h3>Primary content</h3>} />
    ))
    .add("Full ContentBox", () => (
      <ContentBox
        primaryContent={<h3>Primary content</h3>}
        secondaryContent={<h5>Secondary content</h5>}
      />
    ))
}
