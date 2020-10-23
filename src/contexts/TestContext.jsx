import React, {
  useContext,
} from 'react';

import SnowflakeContext from './snowflakeContext';
import {
  fromWei,
  toWei,
  toBN,
} from '../services/format';

function TestContext() {
  const user = useContext(SnowflakeContext);

  const { dispatch } = user;

  const {
    hasProvider,
    networkId,
    ethAddress,
    ein,
    hydroId,
    dapps,
    ethBalance,
    hydroBalance,
    snowflakeBalance,
  } = user;

  function addTokens() {
    dispatch({
      type: 'set',
      target: 'hydroBalance',
      value: hydroBalance.add(toBN(toWei('10000'))),
    });
  }

  function removeDapp() {
    dispatch({
      type: 'set',
      target: 'dapps',
      value: dapps.filter(dapp => dapp !== '0xdeadbeef'),
    });
  }

  function addDapp() {
    dispatch({
      type: 'set',
      target: 'dapps',
      value: dapps.concat(['0xdeadbeef']),
    });
  }

  return (
    <div>
      <ul>
        <li>
          {`hasProvider: ${hasProvider}`}
        </li>
        <li>
          {`networkId: ${networkId}`}
        </li>
        <li>
          {`ethAddress: ${ethAddress}`}
        </li>
        <li>
          {`ein: ${ein}`}
        </li>
        <li>
          {`hydroId: ${hydroId}`}
        </li>
        <li>
          {`ethBalance: ${fromWei(ethBalance.toString())}`}
        </li>
        <li>
          {`hydroBalance: ${fromWei(hydroBalance.toString())}`}
        </li>
        <li>
          {`snowflakeBalance: ${fromWei(snowflakeBalance.toString())}`}
        </li>
      </ul>
      {dapps.length > 0 && (
      <ul>
        {dapps.map(dapp => (
          <li key={dapp}>
            {dapp}
          </li>
        ))}
      </ul>
      )}
      <button
        type="button"
        onClick={() => addTokens()}
      >
        Add tokens
      </button>
      <button
        type="button"
        onClick={() => addDapp()}
      >
        Add dapp
      </button>
      <button
        type="button"
        onClick={() => removeDapp()}
      >
        Remove dapp
      </button>
    </div>
  );
}

export default TestContext;
