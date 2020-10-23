import React from 'react';
import {
  useWeb3Context,
} from 'web3-react';

import ProviderNotFound from './providerNotFound';
import WrongNetwork from './wrongNetwork';
import LockedProvider from './lockedProvider';

const ProviderErrorHandler = () => {
  const web3 = useWeb3Context();
  const error = web3.error.code;

  if (error === 'ETHEREUM_ACCESS_DENIED') {
    return <LockedProvider />;
  }

  if (error === 'UNSUPPORTED_NETWORK') {
    return <WrongNetwork />;
  }

  return <ProviderNotFound />;
};

export default ProviderErrorHandler;
