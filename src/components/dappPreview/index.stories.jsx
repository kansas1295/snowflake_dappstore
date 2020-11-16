import React from "react";
import { storiesOf } from "@storybook/react";
import DappPreview from ".";

storiesOf("DappPreview", module)
  .add("Not added", () => <DappPreview />)
  .add("Added", () => <DappPreview added />);
