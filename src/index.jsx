import React from 'react';
import ReactDOM from 'react-dom';

import './common/style/index.scss';
import './common/languages/i18n';

import Web3Wrapper from './components/web3Wrapper/Web3Wrapper';

ReactDOM.render(
  <Web3Wrapper />,
  document.getElementById('root'),
);
