import React, {
  useState,
  useRef,
  useContext,
} from 'react';
import {
  Button,
  Col,
  Row,
} from 'reactstrap';

import Onboarding from '../../../onboarding';

import Identicon from '../../../identicon';
import HeaderDropdown from '../headerDropdown';

import SnowflakeContext from '../../../../contexts/snowflakeContext';

import {
  network,
} from '../../../../common/config/network.json';

function HeaderAccount() {
  const snowflakeContext = useContext(SnowflakeContext);

  const {
    hasProvider,
    ein,
    hydroId,
    networkId,
  } = snowflakeContext;

  const [isModalOpen, toggleModal] = useState(false);
  const [isHeaderDropdownOpen, toggleHeaderDropdown] = useState(false);
  const identiconRef = useRef();

  if (ein) {
    return (
      <Row className="justify-content-center align-items-center no-gutters">
        <Col className="col-md-auto">
          <div className="header-account__wrapper">
            <span className="header-account__welcome">
              {`Welcome, ${hydroId}`}
            </span>
            <br />
            <span className="header-account__ein">
              {`Ein: ${ein}`}
            </span>
          </div>
        </Col>
        <Col>
          {identiconRef.current && (
            <HeaderDropdown
              target={identiconRef}
              isOpen={isHeaderDropdownOpen}
              toggle={() => toggleHeaderDropdown(!isHeaderDropdownOpen)}
            />
          )}
          {ein && (
            <div ref={identiconRef} className="header-account__identicon">
              <Identicon seed={ein} size={50} id="identicon" />
            </div>
          )}
        </Col>
      </Row>
    );
  }

  if (hasProvider && networkId !== network) {
    return (
      <div className="onboardingButton">
        <Button color="warning">
          Wrong network
        </Button>
      </div>
    );
  }

  return (
    <div className="onboardingButton">
      <Onboarding
        hasProvider={hasProvider}
        networkId={networkId}
        isOpen={isModalOpen}
        toggle={() => toggleModal(!isModalOpen)}
      />
      <Button color="primary" onClick={() => toggleModal(!isModalOpen)}>
        Create Account
      </Button>
    </div>
  );
}


export default HeaderAccount;
