import React from 'react';
import {
  Row,
  Col,
} from 'reactstrap';

function Featured() {
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>
            Featured
          </h1>
          <p>dApps Chosen Based on Demand</p>
        </Col>
      </Row>
    </div>
  );
}

export default Featured;
