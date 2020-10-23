import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Deposit from '.';

storiesOf('Deposit', module)
  .add('Standard', () => (
    <Deposit
      user="test"
      hydroBalance="10"
      snowflakeBalance="10"
      cancel={() => console.log('cancel')}
    />
  ));
