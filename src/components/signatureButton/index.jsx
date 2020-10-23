import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Spinner,
} from 'reactstrap';

function SignatureButton(props) {
  const {
    text,
    initialAction,
    callbackAction,
    finalAction,
  } = props;

  const [status, setStatus] = useState('');

  function sign() {
    setStatus('waiting');

    initialAction()
      .then((signature) => {
        setStatus('confirmed');
        callbackAction(signature);
      })
      .catch((err) => {
        console.log(err);
        setStatus('error');
      });
  }

  function showContent() {
    if (status === 'waiting') {
      return (
        <div>
          <Spinner />
          {' '}
          Waiting...
        </div>
      );
    }

    if (status === 'confirmed') {
      return 'Confirmed';
    }

    if (status === 'error') {
      return 'error';
    }

    return text;
  }

  return (
    <Button
      color="primary"
      onClick={
        status === 'confirmed' ? (
          () => finalAction()
        ) : (
          () => sign()
        )}
    >
      {showContent()}
    </Button>
  );
}

SignatureButton.propTypes = {
  text: PropTypes.string.isRequired,
  initialAction: PropTypes.func.isRequired,
  callbackAction: PropTypes.func.isRequired,
  finalAction: PropTypes.func.isRequired,
};

export default SignatureButton;
