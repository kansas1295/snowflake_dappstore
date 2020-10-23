/**
 * Displays a legacy dapp in a modal
 * NOTE: Legacy - Legacy dapps were created based on the previous front-end
 * The goal is now to move dapps from the front-end to their own website
 * Meanwhile, legacy dapps are still hosted here
 */

import React, {
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

import SnowflakeContext from '../../contexts/snowflakeContext';

import {
  Status,
} from '../../legacy/Rinkeby/0x16fD6e2E1C4afB9C4e7B901141706596317e4ceB/index';

import {
  PetOwnerView,
} from '../../legacy/Rinkeby/0x26098F10E1539a6b75998AfB1DA552B8fD0AE404/index';

import {
  Oxide,
} from '../../legacy/Rinkeby/0x2930Cf9EE8E03C3E06Fa1828cCD8E371323Fde0f/index';

import {
  WhatOptionYouPreferView2,
} from '../../legacy/Rinkeby/0xCCB4Ea50F4e4C3f5db8457B575E5Eb498ed7F242/index';

import {
  ElectionFactory,
} from '../../legacy/Rinkeby/0x351dCAbdfCae2360682a69Fe7296687E13d6a460/index';



function LegacyDapp(props) {
  const user = useContext(SnowflakeContext);

  const {
    ein,
  } = user;

  const {
    id,
    title,
    isOpen,
    toggle,
  } = props;

  function displayDapp() {
    if (id === '0x26098F10E1539a6b75998AfB1DA552B8fD0AE404') {
      return <PetOwnerView ein={ein} />;
    }

    if (id === '0x2930Cf9EE8E03C3E06Fa1828cCD8E371323Fde0f') {
      return <Oxide ein={ein} />;
    }

    
	  if (id === '0xCCB4Ea50F4e4C3f5db8457B575E5Eb498ed7F242') {
      return <WhatOptionYouPreferView2 ein={ein} />;
    }

    if (id === '0x351dCAbdfCae2360682a69Fe7296687E13d6a460') {
      return <ElectionFactory ein={ein} />;
    }
    
    return <Status ein={ein} />;
  }

  if (ein) {
    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          {title}
        </ModalHeader>
        <ModalBody>
          {displayDapp()}
        </ModalBody>
      </Modal>
    );
  }

  return null;
}

LegacyDapp.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default LegacyDapp;
