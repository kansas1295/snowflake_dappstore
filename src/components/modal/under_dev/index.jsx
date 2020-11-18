/**
 * Displays a modal showing that the app is under development
 */

import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Alert, Modal, ModalHeader, ModalBody } from "reactstrap";
import { IoIosClose, IoIosWarning } from "react-icons/io";

const UnderDevelopment = ({ id, isOpen, title, toggle }) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader
      toggle={toggle}
      className="align-items-center under_dev__header"
      close={<IoIosClose className="under_dev__close-icon" onClick={toggle} />}
    >
      <IoIosWarning className="under_dev__warning__icon" />
    </ModalHeader>
    <ModalBody className="under_dev__body">
      <Row>
        <Col>
          <Alert className="under_dev__preview">
            <Row className="align-items-center">
              <Col>
                <img
                  src={`${process.env.PUBLIC_URL}/legacy/${id}/logo.png`}
                  alt="logo"
                  className="remove__logo"
                />
                {title}
              </Col>
            </Row>
          </Alert>
        </Col>
      </Row>
      <Row className="pb-4">
        <Col>
          <p>
            This dApp is under development at the moment. It will be updated as
            soon as it is developed.
          </p>
        </Col>
      </Row>
    </ModalBody>
  </Modal>
);

UnderDevelopment.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default UnderDevelopment;
