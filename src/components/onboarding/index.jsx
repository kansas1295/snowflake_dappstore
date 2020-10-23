import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';
import { IoIosCloseCircle } from 'react-icons/io';

import ProviderStep from './providerStep';
import WelcomeStep from './welcomeStep';
import HydroIdStep from './hydroIdStep';
import PermissionStep from './permissionStep';
import ClaimStep from './claimStep';

function Onboarding(props) {
  const {
    isOpen,
    toggle,
    hasProvider,
  } = props;

  const [currentStep, setCurrentStep] = useState(1);
  const [signature, setSignature] = useState('');
  const [hydroId, setHydroId] = useState('');
  const [timestamp] = useState(Math.round(new Date() / 1000) - 120);

  function displayStep() {
    if (!hasProvider) {
      return <ProviderStep />;
    }

    if (currentStep === 2) {
      return (
        <HydroIdStep
          setNextStep={() => setCurrentStep(3)}
          setHydroId={newHydroId => setHydroId(newHydroId)}
        />
      );
    }

    if (currentStep === 3) {
      return (
        <PermissionStep
          setNextStep={() => setCurrentStep(4)}
          timestamp={timestamp}
          setSignature={newSignature => setSignature(newSignature)}
        />
      );
    }

    if (currentStep === 4) {
      return (
        <ClaimStep
          signature={signature}
          hydroId={hydroId}
          timestamp={timestamp}
          toggle={toggle}
        />
      );
    }

    return (
      <WelcomeStep
        setNextStep={() => setCurrentStep(2)}
      />
    );
  }

  function setPreviousStep() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} size="lg" toggle={toggle}>
        <ModalHeader
          close={<IoIosCloseCircle className="modal__close-button " onClick={toggle} />}
          className="onboarding__modal"
        >
          {currentStep > 1 && (
            <Button color="secondary" onClick={() => setPreviousStep()}>
              Back
            </Button>
          )}
        </ModalHeader>
        <ModalBody className="align-content-center onboarding__modal">
          {displayStep()}
        </ModalBody>
        <ModalFooter className="onboarding__modal">
          <Nav className="footer__menu">
            <NavItem>
              <NavLink tag={RouterNavLink} exact to="/privacy" className="modal-footer__link">
                Privacy Terms
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} exact to="/terms" className="modal-footer__link">
                Terms of Use
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} exact to="/faq" className="modal-footer__link">
                FAQs
              </NavLink>
            </NavItem>
          </Nav>
        </ModalFooter>
      </Modal>
    </div>
  );
}

Onboarding.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  hasProvider: PropTypes.bool.isRequired,
};

export default Onboarding;
