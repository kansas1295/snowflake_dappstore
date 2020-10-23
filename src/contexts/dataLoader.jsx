import React, {
  useEffect,
  useContext,
} from 'react';
import {
  useWeb3Context,
} from 'web3-react';

import SnowflakeContext from './snowflakeContext';

import {
  getAccountEin,
  getAccountDetails,
  getSnowflakeBalance,
  getAccountHydroBalance,
  getAccountEthBalance,
  getIdentity,
} from '../services/utilities';

import networkConfig from '../common/config/network.json';

import App from '../components/app';

function DataLoader() {
  const web3 = useWeb3Context();
  const user = useContext(SnowflakeContext);

  const { dispatch } = user;

  useEffect(() => {
    async function getData() {
      dispatch({
        type: 'set',
        target: 'ethAddress',
        value: web3.account,
      });

      dispatch({
        type: 'set',
        target: 'networkId',
        value: web3.networkId,
      });

      if (web3.networkId === networkConfig.network) {
        const ein = await getAccountEin(web3.library, web3.account);

        if (ein !== '') {
          dispatch({
            type: 'set',
            target: 'ein',
            value: ein,
          });

          const details = await getAccountDetails(web3.library, ein);
          dispatch({
            type: 'set',
            target: 'hydroId',
            value: details.casedHydroID,
          });

          const ethBalance = await getAccountEthBalance(web3.library, web3.account);
          dispatch({
            type: 'set',
            target: 'ethBalance',
            value: ethBalance,
          });

          const snowflakeBalance = await getSnowflakeBalance(web3.library, web3.account);
          dispatch({
            type: 'set',
            target: 'snowflakeBalance',
            value: snowflakeBalance,
          });

          const hydroBalance = await getAccountHydroBalance(web3.library, web3.account);
          dispatch({
            type: 'set',
            target: 'hydroBalance',
            value: hydroBalance,
          });

          const raindropContractAddress = '0x387Ce3020e13B0a334Bb3EB25DdCb73c133f1D7A';

          const identity = await getIdentity(web3.library, web3.account);
          dispatch({
            type: 'set',
            target: 'dapps',
            value: identity.resolvers.filter(resolver => resolver !== raindropContractAddress),
          });

          dispatch({
            type: 'set',
            target: 'associatedAddresses',
            value: identity.associatedAddresses,
          });
        }
      }
    }

    if (web3.active) {
      dispatch({
        type: 'set',
        target: 'hasProvider',
        value: true,
      });

      getData();
    }

    if (!web3.error && !web3.active) {
      web3.setFirstValidConnector(['MetaMask']);
    } else if (web3.error) {
      console.log(web3.error);
    }
  }, [web3]);

  return (
    <App />
  );
}

export default DataLoader;
