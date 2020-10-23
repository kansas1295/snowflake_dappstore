import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import TransactionButton from '../../transactionButton';

import {
  createIdentity,
} from '../../../services/utilities';

import claimImg from '../../../common/img/steps/claim.png';

function ClaimStep(props) {
  const {
    hydroId,
    signature,
    timestamp,
    toggle,
  } = props;

  const web3 = useWeb3Context();

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="12" sm="6" className="text-center">
          <img src={claimImg} alt="welcome" className="img-fluid" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="12" sm="6" className="text-center">
          <h1 className="text-white">
            Claim Your Snowflake
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs="12" sm="8" className="text-center">
          <p className="text-white">
            Almost there, just click below to claim your new on-chain Snowflake identity (EIN)! Be sure to check MetaMask for the prompt and confirm.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs="12" sm="10" className="text-center">
          <TransactionButton
            initialText="Claim"
            sendAction={() => createIdentity(web3.library, hydroId, timestamp, signature)}
            onConfirmationAction={toggle}
          />
        </Col>
      </Row>
    </div>
  );
}

ClaimStep.propTypes = {
  hydroId: PropTypes.string.isRequired,
  signature: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default ClaimStep;
