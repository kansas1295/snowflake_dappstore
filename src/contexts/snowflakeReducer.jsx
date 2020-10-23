import React, {
  useReducer,
} from 'react';

import Web3 from 'web3';

import SnowflakeContext from './snowflakeContext';
import DataLoader from './dataLoader';

const initialUser = {
  hasProvider: false,
  networkId: null,
  ethAddress: null,
  associatedAddresses: [],
  ein: null,
  hydroId: null,
  dapps: [],
  ethBalance: Web3.utils.toBN('0'),
  hydroBalance: Web3.utils.toBN('0'),
  snowflakeBalance: Web3.utils.toBN('0'),
};

function reduce(state, action) {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        [action.target]: action.value,
      };
    default:
      throw new Error(`Unexpected action...${action.type}`);
  }
}

function SnowflakeReducer() {
  const [user, dispatch] = useReducer(reduce, initialUser);

  return (
    <SnowflakeContext.Provider
      value={{
        ...user,
        dispatch,
      }}
    >
      <DataLoader />
    </SnowflakeContext.Provider>
  );
}

export default SnowflakeReducer;
