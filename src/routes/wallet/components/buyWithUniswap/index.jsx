/**
 *  Displays the Buy Hydro component using Uniswap
 */

import React, {
  useState,
} from 'react';
import {
  Row,
  Col,
  Card,
  Input,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import tooltips from '../../../../common/config/tooltips.json';

import TransactionButton from '../../../../components/transactionButton';
import HelpButton from '../../../../components/helpButton';

import {
  buyWithUniswap,
  getHydroTradeDetails,
} from '../../../../services/uniswap';

import {
  toWei,
  formatAmount,
  fromWei,
} from '../../../../services/format';

function BuyWithUniswap() {
  const web3 = useWeb3Context();

  const [amountToBuy, setAmountToBuy] = useState('');
  const [requiredAmount, setRequiredAmount] = useState('0');
  const [rate, setRate] = useState('0');

  async function updateData(amount) {
    setAmountToBuy(amount);

    const details = await getHydroTradeDetails(toWei(amount));
    setRequiredAmount(details.inputAmount.amount.toString());
    setRate(details.executionRate.rate.toString());
  }

  return (
    <Card className="buy">
      <Row className="buy-uniswap__header">
        <Col xs="10">
          <p className="buy-uniswap__title mb-0">
            Buy and Deposit to dApp wallet
          </p>
        </Col>
        <Col xs="2" sm="2" className="text-right">
          <HelpButton
            content={tooltips.getHydroHelp}
          />
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <p>
            <Input
              type="number"
              value={amountToBuy}
              onChange={e => updateData(e.target.value)}
              placeholder="0"
              className="buy-uniswap__amount"
            />
            {' '}
            <span className="buy-uniswap__hydro">
              Hydro
            </span>
          </p>
          <p className="buy-uniswap__eth-required">
            {`ETH Required: ${formatAmount(fromWei(requiredAmount))}`}
            <br />
            <span className="buy-uniswap__test-tokens">
              {`@ ETH rate of ${formatAmount(rate)}`}
            </span>
          </p>

        </Col>
      </Row>
      <Row className="justify-content-center py-1">
        <Col className="text-center">
          <TransactionButton
            initialText="Buy Hydro"
            sendAction={() => buyWithUniswap(
              web3.library,
              web3.account,
              toWei(amountToBuy),
              requiredAmount,
            )}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default BuyWithUniswap;
