import React from "react"
import { storiesOf } from "@storybook/react"
import { muiTheme } from "storybook-addon-material-ui"
import { action } from "@storybook/addon-actions"
import ContentBox from "../src/components/ContentBox"
import SignForm from "../src/components/ContentBox/SignForm"
import { theme } from "../src/withRoot"

export default () => {
  storiesOf("SignForm", module)
    .addDecorator(muiTheme([theme]))
    .add("Default SignForm", () => (
      <SignForm
        submit="Iniciar Sesión"
        onClick={action("On click")}
        onSubmit={action("On submit")}
      />
    ))
    .add("Register SignForm", () => (
      <SignForm
        submit="Registrarme"
        onClick={action("Sign up submit")}
        onSubmit={action("Sign up submit")}
        register={true}
      />
    ))
    .add("SignForm on ContentBox", () => (
      <ContentBox
        primaryContent={
          <SignForm
            submit="Iniciar Sesión"
            onClick={action("On click")}
            onSubmit={action("On submit")}
          />
        }
      />
    ))
    .add("SignForm with secondary content on ContentBox", () => (
      <ContentBox
        style={{ width: "50%" }}
        primaryContent={
          <SignForm
            submit="Iniciar Sesión"
            onClick={action("On click")}
            onSubmit={action("On submit")}
          />
        }
        secondaryContent={
          <a onClick={action("Redirect")}>Forgot your password?</a>
        }
      />
    ))
}
