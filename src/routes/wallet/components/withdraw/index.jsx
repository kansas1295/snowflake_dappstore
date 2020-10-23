/**
 * Displays a form to withdraw tokens from the current Snowflake balance
 */

import React, {
  useState,
  useContext,
} from 'react';
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
  withdrawSnowflakeBalance,
} from '../../../../services/utilities';

import TransactionButton from '../../../../components/transactionButton';

import {
  fromWei,
  toBN,
  formatAmount,
  toWei,
} from '../../../../services/format';

function Withdraw(props) {
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
      target: 'hydroBalance',
      value: hydroBalance.add(toBN(toWei(amount.toString()))),
    });

    dispatch({
      type: 'set',
      target: 'snowflakeBalance',
      value: snowflakeBalance.sub(toBN(toWei(amount.toString()))),
    });

    cancel();
  }

  return (
    <div>
      <Row className="mx-4 justify-content-center align-items-center no-gutters">
        <Col sm="5">
          <p className="withdraw__subtitle">
            From
          </p>
        </Col>
        <Col sm="2" />
        <Col sm="5">
          <p className="withdraw__subtitle">
            To
          </p>
        </Col>
      </Row>
      <Row className="mx-4 justify-content-center align-items-center no-gutters">
        <Col sm="5" className="withdraw__from">
          <Row className="justify-content-center align-items-center">
            <Col xs="8">
              <div>
                <FormGroup className="withdraw__form-group">
                  <Input
                    type="number"
                    className="withdraw__input"
                    placeholder="0"
                    onChange={e => setAmount(e.target.value)}
                    value={amount}
                  />
                  <FormText
                    className="withdraw__form-text"
                  >
                    dApp Store Wallet
                  </FormText>
                </FormGroup>
              </div>
            </Col>
            <Col className="text-center" xs="4">
              <Button
                size="sm"
                onClick={() => setAmount(fromWei(snowflakeBalance.toString()))}
                className="withdraw__max-button"
              >
                Max
              </Button>
            </Col>
          </Row>
        </Col>

        <Col sm="2" className="text-center">
          <IoIosArrowRoundForward className="withdraw__arrow" />
        </Col>

        <Col sm="5">
          <div className="withdraw__to">
            <p className="withdraw__balance">
              {formatAmount(fromWei(hydroBalance.toString()))}
            </p>
            <p className="withdraw__to-small-text">
              {`${ethAddress.substring(0, 12)}...`}
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
            sendAction={() => withdrawSnowflakeBalance(
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

Withdraw.propTypes = {
  cancel: PropTypes.func.isRequired,
};

export default Withdraw;
