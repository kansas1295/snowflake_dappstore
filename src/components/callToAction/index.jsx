import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

const CallToAction = () => (
  <Container fluid>
    <Row className="call-to-action justify-content-center">
      <Col xs="12" sm="10" className="text-center">
        <h1 className="call-to-action__title">Get Involved</h1>
        <p className="call-to-action__subtitle">
          Are you a developer? Do you have a dApp idea?
          Would you like to patner with us?
        </p>
        <a
          href="https://projecthydro.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outlined btn-md"
        >
          Let Us Know
        </a>
      </Col>
    </Row>
  </Container>
);

export default CallToAction;
