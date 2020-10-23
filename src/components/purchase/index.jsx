/**
 * Displays a modal to buy a dApp
 * NOTE: Purchase - Minimum displayed price is currently 1 HYDRO
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
  IoIosCart,
  IoIosClose,
} from 'react-icons/io';

import {
  addResolver,
} from '../../services/utilities';

import TransactionButton from '../transactionButton';
import hydroIcon from '../../common/img/hydro_blue_drop.png';

import SnowflakeContext from '../../contexts/snowflakeContext';

function Purchase(props) {
  const web3 = useWeb3Context();

  const user = useContext(SnowflakeContext);

  const {
    dapps,
    dispatch,
  } = user;

  const {
    id,
    isOpen,
    title,
    price,
    toggle,
  } = props;

  let normalizedPrice = '';

  if (web3.active) {
    normalizedPrice = web3.library.utils.fromWei(price);
  }

  const closeIcon = <IoIosClose className="purchase__close-icon" onClick={toggle} />;

  function getReadablePrice() {
    if (web3.active) {
      if (normalizedPrice === '0') {
        return '0';
      }

      const minimum = web3.library.utils.toWei('1');
      const minimumBn = web3.library.utils.toBN(minimum);

      if (web3.library.utils.toBN(price).gt(minimumBn)) {
        return normalizedPrice.substring(0, 5);
      }

      return '< 1 ';
    }

    return '0';
  }

  function onConfirmation() {
    dispatch({
      type: 'set',
      target: 'dapps',
      value: dapps.concat([id]),
    });

    toggle();
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader
        toggle={toggle}
        className="align-items-center purchase__header"
        close={closeIcon}
      >
        <IoIosCart className="purchase__icon" />
        <span className="purchase__title">
          Confirm Purchase
        </span>
      </ModalHeader>
      <ModalBody className="purchase__body">
        <Row>
          <Col>
            <Alert className="purchase__preview">
              <Row className="align-items-center">
                <Col>
                  <img
                    src={`${process.env.PUBLIC_URL}/legacy/${id}/logo.png`}
                    alt="logo"
                    className="remove__logo"
                  />
                  {title}
                </Col>
                <Col sm="3" className="text-right">
                  <p className="purchase__price">
                    {getReadablePrice()}
                    <img src={hydroIcon} width="16" className="purchase__hydro-icon" alt="preview" />
                  </p>
                </Col>
              </Row>
            </Alert>
          </Col>
        </Row>
        <Row className="pb-4">
          <Col>
            <p>
              This dApp costs
              {' '}
              <strong>
                {normalizedPrice > 0 && normalizedPrice < 1 ? '< 1' : normalizedPrice}
              </strong>
              {' '}
              Hydro. Your dApp store wallet balance will be used. Please confirm the dApp title above and finalize purchase below. Refunds are not available. Be sure to check MetaMask for the prompt to continue.
            </p>
            {normalizedPrice > 0 && normalizedPrice < 1 && (
              <p className="purchase__small-price">
                Total cost:
                {' '}
                {normalizedPrice}
                {' '}
                <img src={hydroIcon} width="16" className="purchase__hydro-icon" alt="preview" />
              </p>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <TransactionButton
              initialText="Purchase"
              confirmedText="Purchase confirmed!"
              sendAction={() => addResolver(
                web3.library,
                web3.account,
                id,
                price,
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

Purchase.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

Purchase.defaultProps = {
  price: '',
};

export default Purchase;
