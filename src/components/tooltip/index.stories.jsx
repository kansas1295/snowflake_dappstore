import React from "react";
import { storiesOf } from "@storybook/react";
import Tooltip from ".";

function test() {
  console.log("Test");
}

storiesOf("Tooltip", module).add("Standard", () => (
  <div ref="test">
    <Tooltip isOpen toggle={test} content="Hello" target="test" />
  </div>
));
