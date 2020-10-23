/**
 * Displays the Buy Hydro component
 */

import React from 'react';
import {
  Row,
  Col,
  Card,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import tooltips from '../../../../common/config/tooltips.json';

import TransactionButton from '../../../../components/transactionButton';
import HelpButton from '../../../../components/helpButton';

import {
  getHydroTestTokens,
} from '../../../../services/utilities';

function Buy() {
  const web3 = useWeb3Context();

  return (
    <Card className="buy">
      <Row className="buy__header">
        <Col xs="10">
          <p className="buy__title mb-0">
            Buy and Deposit to dApp wallet
          </p>
        </Col>
        <Col xs="2" sm="2" className="text-right">
          <HelpButton
            content={tooltips.ethWalletHelp}
          />
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <p className="buy__amount">
            10,000
            <span className="buy__hydro">
              Hydro
            </span>
          </p>
          <p className="buy__test-tokens">
            Get free Hydro test tokens
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center py-5">
        <Col className="text-center">
          <TransactionButton
            initialText="Get Hydro Tokens"
            sendAction={() => getHydroTestTokens(web3.library, web3.account)}
            displayModal
          />
        </Col>
      </Row>
    </Card>
  );
}

export default Buy;
