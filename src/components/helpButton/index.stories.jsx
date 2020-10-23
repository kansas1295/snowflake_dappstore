import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import HelpButton from '.';

storiesOf('HelpButton', module)
  .add('Standard', () => <HelpButton content="Test" />);
