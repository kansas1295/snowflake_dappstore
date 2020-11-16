import React from "react";
import { storiesOf } from "@storybook/react";
import Transaction from ".";

storiesOf("Transaction", module).add("Deposit", () => (
  <Transaction blocknumber={0} amount="100" type="deposit" />
));
