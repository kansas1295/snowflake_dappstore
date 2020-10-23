import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Alert,
} from 'reactstrap';
import {
  IoIosCheckmarkCircleOutline,
} from 'react-icons/io';
import {
  useWeb3Context,
} from 'web3-react';

import {
  removeLinkedAddress,
} from '../../../../services/utilities';

import TransactionButton from '../../../../components/transactionButton';

const LinkedAddress = (props) => {
  const {
    address,
    removable,
  } = props;

  const web3 = useWeb3Context();

  const formattedDate = new Date(Date.now());

  return (
    <Alert className="linked-address">
      <Row className="align-items-center">
        <Col sm="1">
          <IoIosCheckmarkCircleOutline
            className="linked-address__icon"
          />
        </Col>
        <Col>
          <p className="mb-0 linked-address__linked-wallet-address">
            {address}
          </p>
          <p className="linked-address__date">
            {formattedDate.toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        </Col>
        <Col className="text-right">
          {removable && (
            <TransactionButton
              color="danger"
              initialText="Remove Access"
              sendAction={() => removeLinkedAddress(web3.library, web3.account)}
            />
          )}
        </Col>
      </Row>
    </Alert>
  );
};

export default LinkedAddress;

LinkedAddress.propTypes = {
  address: PropTypes.string.isRequired,
  removable: PropTypes.bool,
};

LinkedAddress.defaultProps = {
  removable: false,
};
