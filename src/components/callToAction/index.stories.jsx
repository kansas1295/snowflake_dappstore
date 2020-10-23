import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CallToAction from '.';

storiesOf('CallToAction', module)
  .add('standard', () => <CallToAction />);
