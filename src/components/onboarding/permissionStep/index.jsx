import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import SignatureButton from '../../signatureButton';

import {
  createSignedMessage,
  signPersonal,
} from '../../../services/utilities';

import permissionImg from '../../../common/img/steps/permission.png';

function PermissionStep(props) {
  const {
    setNextStep,
    setSignature,
    timestamp,
  } = props;

  const web3 = useWeb3Context();

  const signedMessage = createSignedMessage(
    web3.library,
    web3.account,
    timestamp,
  );

  function setSignatureAndSetNextStep(signature) {
    setSignature(signature);
    setNextStep();
  }

  console.log('Signing using the address:', web3.account);

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="12" sm="6" className="text-center">
          <img src={permissionImg} alt="welcome" className="img-fluid" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="12" sm="6" className="text-center">
          <h1 className="text-white">
            Permission
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs="12" sm="8" className="text-center">
          <p className="text-white">
            The next step is for you to give us permission to create your account on the blockchain. This requires your signature of a hashed permission string. Simply click Accept below and be sure to check MetaMask for the prompt and confirm.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs="12" sm="10" className="text-center">
          <SignatureButton
            text="Accept"
            initialAction={() => signPersonal(web3.library, web3.account, signedMessage)}
            callbackAction={signature => setSignatureAndSetNextStep(signature)}
            finalAction={setNextStep}
          />
        </Col>
      </Row>
    </div>
  );
}

PermissionStep.propTypes = {
  setNextStep: PropTypes.func.isRequired,
  timestamp: PropTypes.number.isRequired,
  setSignature: PropTypes.func.isRequired,
};

export default PermissionStep;
