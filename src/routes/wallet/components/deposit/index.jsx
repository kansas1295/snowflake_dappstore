/**
 * Displays a form to deposit tokens to the current Snowflake balance
 */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Button,
  Input,
  FormGroup,
  FormText,
} from 'reactstrap';
import {
  IoIosArrowRoundForward,
} from 'react-icons/io';
import {
  useWeb3Context,
} from 'web3-react';

import SnowflakeContext from '../../../../contexts/snowflakeContext';

import {
  depositTokens,
} from '../../../../services/utilities';

import {
  fromWei,
  toWei,
  toBN,
  formatAmount,
} from '../../../../services/format';

import TransactionButton from '../../../../components/transactionButton';

function Deposit(props) {
  const user = useContext(SnowflakeContext);

  const {
    ethAddress,
    hydroBalance,
    snowflakeBalance,
    dispatch,
  } = user;

  const {
    cancel,
  } = props;

  const [amount, setAmount] = useState('');

  const web3 = useWeb3Context();

  function onConfirmation() {
    dispatch({
      type: 'set',
      target: 'snowflakeBalance',
      value: snowflakeBalance.add(toBN(toWei(amount.toString()))),
    });

    dispatch({
      type: 'set',
      target: 'hydroBalance',
      value: hydroBalance.sub(toBN(toWei(amount.toString()))),
    });

    cancel();
  }

  return (
    <div>
      <Row className="mx-4 justify-content-center align-items-center no-gutters">
        <Col sm="5">
          <p className="deposit__subtitle">
            From
          </p>
        </Col>
        <Col sm="2" />
        <Col sm="5">
          <p className="deposit__subtitle">
            To
          </p>
        </Col>
      </Row>

      <Row className="mx-4 justify-content-center align-items-center no-gutters">
        <Col sm="5" className="deposit__from">
          <Row className="justify-content-center align-items-center">
            <Col xs="8">
              <div>
                <FormGroup className="deposit__form-group">
                  <Input
                    type="number"
                    className="deposit__input"
                    placeholder="0"
                    onChange={e => setAmount(e.target.value)}
                    value={amount}
                  />
                  <FormText
                    className="deposit__form-text"
                  >
                    {`${ethAddress.substring(0, 12)}...`}
                  </FormText>
                </FormGroup>
              </div>
            </Col>
            <Col className="text-center" xs="4">
              <Button
                size="sm"
                onClick={() => setAmount(fromWei(hydroBalance.toString()))}
                className="deposit__max-button"
              >
                Max
              </Button>
            </Col>
          </Row>
        </Col>

        <Col sm="2" className="text-center">
          <IoIosArrowRoundForward className="deposit__arrow" />
        </Col>

        <Col sm="5">
          <div className="deposit__to">
            <p className="deposit__balance">
              {formatAmount(fromWei(snowflakeBalance.toString()))}
            </p>
            <p className="deposit__to-small-text">
              dApp Store Wallet
            </p>
          </div>
        </Col>
      </Row>

      <Row className="pt-5 mx-4 justify-content-center align-items-center no-gutters">
        <Col className="text-left">
          <Button onClick={cancel}>
            Cancel
          </Button>
        </Col>
        <Col className="text-right">
          <TransactionButton
            color="success"
            initialText="Confirm"
            sendAction={() => depositTokens(
              web3.library,
              web3.account,
              toWei(amount.toString()),
            )}
            onConfirmationAction={onConfirmation}
          />
        </Col>
      </Row>
    </div>
  );
}

Deposit.propTypes = {
  cancel: PropTypes.func.isRequired,
};

export default Deposit;
