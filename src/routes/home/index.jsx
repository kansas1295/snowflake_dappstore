/**
 * Displays a simplified version of the homepage
 */

import React, {
  useContext,
} from 'react';
import {
  CardDeck,
} from 'reactstrap';

import SnowflakeContext from '../../contexts/snowflakeContext';

import DappPreview from '../../components/dappPreview';

import resolversJson from '../../legacy/resolvers.json';

function Home() {
  const snowflakeContext = useContext(SnowflakeContext);

  const {
    dapps,
    ein,
  } = snowflakeContext;

  return (
    <div>
      <CardDeck>
        {Object.keys(resolversJson).map(resolver => (
          <DappPreview
            key={resolver}
            id={resolver}
            isAdded={dapps.includes(resolver)}
            hasIdentity={ein !== null}
            legacy
          />
        ))}
      </CardDeck>
    </div>
  );
}

export default Home;
