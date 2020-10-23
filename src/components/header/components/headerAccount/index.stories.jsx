import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import HeaderAccount from '.';

storiesOf('HeaderAccount', module)
  .add('Standard', () => <HeaderAccount />);
