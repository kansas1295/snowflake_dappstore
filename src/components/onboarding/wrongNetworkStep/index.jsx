import React from 'react';
import {
  Row,
  Col,
} from 'reactstrap';

function WrongNetworkStep() {
  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="12" sm="4" className="text-center">
          <div />
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs="12" sm="8" className="text-center">
          <p className="text-white">
            Wrong Network!
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="12" sm="10" className="text-center">
          <p>Change your network to Rinkeby</p>
        </Col>
      </Row>
    </div>
  );
}

export default WrongNetworkStep;
