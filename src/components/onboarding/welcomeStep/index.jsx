import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';

import Welcome from '../../../common/img/steps/welcome.png';

function WelcomeStep(props) {
  const {
    setNextStep,
  } = props;

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="12" sm="6" className="text-center">
          <img src={Welcome} alt="welcome" className="img-fluid" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="12" sm="6" className="text-center">
          <h1 className="text-white">
            Welcome
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs="12" sm="8" className="text-center">
          <p className="text-white">
            Before you access the Hydro decentralized app store, we must create your Snowflake or <span className="underline">Ethereum Identification Number (EIN)</span>. This will be used across the app store to interact with the decentralized apps and other blockchains. You can think of it like an ID card or drivers license. Snowflake will be linked to your Ethereum wallet address.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs="12" sm="10" className="text-center">
          <Button className="btn-white" onClick={setNextStep}>
            Let&apos;s get started
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs="12" sm="10" className="text-center">
          <p className="text-white">
            Already have an existing EIN? Link it to your address
          </p>
        </Col>
      </Row>
    </div>
  );
}

WelcomeStep.propTypes = {
  setNextStep: PropTypes.func.isRequired,
};

export default WelcomeStep;
