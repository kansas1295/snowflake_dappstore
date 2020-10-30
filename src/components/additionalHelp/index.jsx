import React from 'react';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';
import {
  NavLink,
} from 'react-router-dom';

function AdditionalHelp() {
  return (
    <div>
      <Row className="">
        <Col>
          <Row className="additional-help align-items-center">
            <Col>
              <h4 className="additional-help__title">
                Add A dApp
              </h4>
              <p className="additional-help__subtitle">
                You do not have any dApps. Add one from the dApp Store and it will show up here.
              </p>
            </Col>
            <Col sm="4" className="text-right">
              <Button tag={NavLink} to="/" className="btn-outlined">
                Explore
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AdditionalHelp;
