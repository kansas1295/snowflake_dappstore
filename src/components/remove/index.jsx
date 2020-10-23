/**
 * Displays a modal  to remove a dApp
 * TODO: Remove - Confirmation of the pending transaction is never catched
 */

import React, {
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';
import {
  IoIosCloseCircle,
  IoIosClose,
} from 'react-icons/io';

import SnowflakeContext from '../../contexts/snowflakeContext';

import {
  removeResolver,
} from '../../services/utilities';

import TransactionButton from '../transactionButton';

function Remove(props) {
  const web3 = useWeb3Context();

  const user = useContext(SnowflakeContext);

  const {
    dispatch,
    dapps,
  } = user;

  const {
    id,
    isOpen,
    title,
    toggle,
  } = props;

  const closeIcon = <IoIosClose className="remove__close-icon" onClick={toggle} />;

  function onConfirmation() {
    dispatch({
      type: 'set',
      target: 'dapps',
      value: dapps.filter(dapp => dapp !== id),
    });

    toggle();
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader
        toggle={toggle}
        className="align-items-center remove__header"
        close={closeIcon}
      >
        <IoIosCloseCircle className="remove__icon" />
        <span className="remove__title">
          Confirm Removal
        </span>
      </ModalHeader>
      <ModalBody className="remove__body">
        <Row>
          <Col>
            <Alert className="remove__preview">
              <Row>
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
              You are about to remove <strong>{title}</strong> from your EIN. Please confirm below. Your purchases are tied to your EIN. You can always add it for free in the future after you remove it.
            </p>
          </Col>
        </Row>
        <Row className="pb-1">
          <Col>
            <TransactionButton
              color="danger"
              initialText="Remove"
              confirmedText="dApp removed!"
              sendAction={() => removeResolver(
                web3.library,
                web3.account,
                id,
              )}
              onConfirmationAction={() => onConfirmation()}
              block
            />
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

Remove.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Remove;
