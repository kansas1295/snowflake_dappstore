/**
 * Displays the dapps added by the current user
 */

import React, {
  useContext,
} from 'react';
import {
  Row,
  Col,
  CardDeck,
} from 'reactstrap';

import SnowflakeContext from '../../contexts/snowflakeContext';

import DappPreview from '../../components/dappPreview';
import AdditionalHelp from '../../components/additionalHelp';

function Manage() {
  const user = useContext(SnowflakeContext);

  const {
    dapps,
    ein,
  } = user;

  return (
    <div>
      <Row className="pb-3">
        <Col>
          <h1 className="title">
            Your dApps:
            {' '}
            {dapps.length}
          </h1>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          {dapps.length > 0 ? (
            <CardDeck>
              {dapps.map(dapp => (
                <DappPreview
                  key={dapp}
                  id={dapp}
                  legacy
                  isAdded
                  hasIdentity={ein !== null}
                />
              ))
            }
            </CardDeck>
          ) : (
            <AdditionalHelp />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Manage;
