import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Transaction from '.';

storiesOf('Transaction', module)
  .add('Deposit', () => (
    <Transaction
      blocknumber={0}
      amount="100"
      type="deposit"
    />
  ));
