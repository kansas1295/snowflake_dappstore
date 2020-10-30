/**
 * Displays the Wallet page
 */

import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import Transactions from './components/transactions';
import DepositWithdraw from './components/depositWithdraw';
import BuyWithUniswap from './components/buyWithUniswap';

function Wallet() {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="title">
            Your Wallet
          </h1>
        </Col>
      </Row>
      <Row className="wallet__row fadeit">
        <Col sm="12" md="12" lg="12" xl="6">
          <DepositWithdraw />
        </Col>
        <Col>
          <BuyWithUniswap />
        </Col>
      </Row>
      <Row>
        <Col className="nopadding">
          <Transactions />
        </Col>
      </Row>
    </Container>
  );
}

export default Wallet;
