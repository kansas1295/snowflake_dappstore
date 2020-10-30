/**
 * Displays a transaction
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Alert,
} from 'reactstrap';
import {
  IoIosAdd,
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
} from 'react-icons/io';
import {
  useWeb3Context,
} from 'web3-react';

import resolvers from '../../../../legacy/resolvers.json';

function Transaction(props) {
  const {
    resolver,
    type,
    amount,
    blocknumber,
  } = props;

  const [date, setDate] = useState(0);
  const web3 = useWeb3Context();
  const displayedAmount = web3.library.utils.fromWei(amount);

  if (web3.active && date === 0) {
    web3.library.eth.getBlock(blocknumber)
      .then((block) => {
        setDate(block.timestamp * 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function displayTransactionType() {
    if (type === 'deposit') {
      return (
        <div className="transaction__header">
          <IoIosArrowRoundForward
            className="transaction__icon"
          />
          <p className="transaction__type">
            Deposited Hydro
          </p>
        </div>
      );
    }

    if (type === 'withdrawal') {
      return (
        <div className="transaction__header">
          <IoIosArrowRoundBack
            className="transaction__icon"
          />
          <p className="transaction__type">
            Withdrew Hydro
          </p>
        </div>
      );
    }

    return (
      <div className="transaction__header">
        <IoIosAdd
          className="transaction__icon"
        />
        {resolvers[resolver] !== undefined && <p className="transaction__type">
          {`Purchased ${resolvers[resolver].title}`}
        </p>}
      </div>
    );
  }

  return (
    <Alert className="transaction">
      <Row className="align-items-center">
        <Col>
          {displayTransactionType()}
          <p className="transaction__date">
            {new Date(date).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        </Col>
        <Col>
          <p className={
              type === 'withdrawal' || type === 'purchase' ? 'transaction__amount transaction__amount--withdrawal' : 'transaction__amount'}
          >
            {type === 'withdrawal' || type === 'purchase' ? ('-') : ('+')}
            {' '}
            {parseInt(displayedAmount, 10) > 1 ? (
              displayedAmount
            ) : (
              '< 1'
            )}
          </p>
        </Col>
      </Row>
    </Alert>
  );
}

Transaction.propTypes = {
  type: PropTypes.string.isRequired,
  blocknumber: PropTypes.number.isRequired,
  amount: PropTypes.string.isRequired,
  resolver: PropTypes.string,
};

Transaction.defaultProps = {
  resolver: 'Default',
};

export default Transaction;
