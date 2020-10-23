import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Identicon from '.';

storiesOf('Identicon', module)
  .add('Standard', () => <Identicon />);
