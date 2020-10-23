import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import HeaderDropdown from '.';

storiesOf('HeaderDropdown', module)
  .add('Standard', () => (
    <div id="target">
      <HeaderDropdown
        target="target"
        toggle={action('clicked')}
        isOpen
      />
    </div>
  ));
