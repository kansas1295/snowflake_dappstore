import React, {
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
} from 'reactstrap';
import {
  NavLink,
} from 'react-router-dom';
import numeral from 'numeral';

import HydroIcon from '../../../../common/img/hydro_grey_drop.png';
import EthIcon from '../../../../common/img/eth_grey.png';

import SnowflakeContext from '../../../../contexts/snowflakeContext';

import {
  fromWei,
  formatAmount,
} from '../../../../services/format';

function HeaderDropdown(props) {
  const user = useContext(SnowflakeContext);

  const {
    ethAddress,
    ethBalance,
    hydroBalance,
    snowflakeBalance,
  } = user;

  const {
    target,
    isOpen,
    toggle,
  } = props;

  return (
    <div>
      <Popover placement="bottom" isOpen={isOpen} target={target} toggle={toggle} className="header-dropdown">
        <PopoverHeader className="header-dropdown__header text-center">
          <span className="header-dropdown__address-prefix">
            0x
          </span>
          {' '}
          <span className="header-dropdown__address">
            {`${ethAddress.substring(2, 15)}...`}
          </span>
        </PopoverHeader>
        <PopoverBody className="header-dropdown__body">
          <p className="header-dropdown__title mb-0">
            External Balances:
          </p>
          <p className="mb-0">
            <img src={EthIcon} alt="Eth" width={16} />
            {' '}
            {formatAmount(fromWei(ethBalance.toString()))}
          </p>
          <p>
            <img src={HydroIcon} alt="Hydro" width={16} />
            {' '}
            {formatAmount(fromWei(hydroBalance.toString()))}
          </p>
          <p className="header-dropdown__title mb-0">
            dApp Store Balance:
          </p>
          <p className="mb-0">
            <img src={HydroIcon} alt="Hydro" width={16} />
            {' '}
            {formatAmount(fromWei(snowflakeBalance.toString()))}
          </p>
        </PopoverBody>
        <div className="header-dropdown__footer">
          <Button tag={NavLink} color="primary" exact to="/wallet">
            Get more Hydro
          </Button>
        </div>
      </Popover>
    </div>
  );
}

HeaderDropdown.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  target: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
};

HeaderDropdown.defaultProps = {
  isOpen: false,
};

export default HeaderDropdown;
