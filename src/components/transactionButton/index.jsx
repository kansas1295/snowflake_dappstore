/**
 * Handles a transaction and displays the result
 */

import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Spinner,
} from 'reactstrap';

function TransactionButton(props) {
  const {
    initialText,
    waitingForUserConfirmationText,
    waitingForConfirmationText,
    confirmedText,
    sendAction,
    afterConfirmationAction,
    onConfirmationAction,
    className,
    color,
    block,
  } = props;

  const [status, setStatus] = useState('');

  function sendTransaction() {
    setStatus('waiting');

    let timer;

    sendAction()
      .on('transactionHash', () => {
        setStatus('pending');

        timer = setTimeout(() => {
          setStatus('confirmed');
          onConfirmationAction();
        }, 30000);
      })
      .on('receipt', () => {
        clearTimeout(timer);
        setStatus('confirmed');
        onConfirmationAction();
      })
      .on('error', (error) => {
        console.log(error);
        clearTimeout(timer);
        setStatus('error');
      });
  }

  function showButtonContent() {
    if (status === 'waiting') {
      return (
        <div>
          <Spinner />
          {' '}
          {waitingForUserConfirmationText}
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div>
          <Spinner />
          {' '}
          {waitingForConfirmationText}
        </div>
      );
    }

    if (status === 'confirmed') {
      return confirmedText;
    }

    if (status === 'error') {
      return 'Error...';
    }

    return initialText;
  }

  return (
    <div>
      <Button
        color={color}
        className={className}
        block={block}
        onClick={
          status === 'confirmed' ? (
            () => afterConfirmationAction()
          ) : (
            () => sendTransaction()
          )}
      >
        {showButtonContent()}
      </Button>
    </div>
  );
}

TransactionButton.propTypes = {
  initialText: PropTypes.string,
  waitingForUserConfirmationText: PropTypes.string,
  waitingForConfirmationText: PropTypes.string,
  confirmedText: PropTypes.string,
  sendAction: PropTypes.func.isRequired,
  afterConfirmationAction: PropTypes.func,
  onConfirmationAction: PropTypes.func,
  className: PropTypes.string,
  color: PropTypes.string,
  block: PropTypes.bool,
};

TransactionButton.defaultProps = {
  initialText: 'Send',
  waitingForUserConfirmationText: 'Check MetaMask...',
  waitingForConfirmationText: 'Loading...',
  confirmedText: 'Confirmed!',
  afterConfirmationAction: () => console.log(''),
  onConfirmationAction: () => console.log('Transaction confirmed!'),
  className: '',
  color: 'primary',
  block: false,
};

export default TransactionButton;
