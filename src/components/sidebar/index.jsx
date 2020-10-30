/**
 * Displays the sidebar
 */

import React, {
  useState,
  useContext,
} from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  Badge,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';
import numeral from 'numeral';

import Onboarding from '../onboarding';
import CategoriesMenu from './components/categoriesMenu';
import whiteHydroDrop from '../../common/img/hydro_white_drop.png';

import SnowflakeContext from '../../contexts/snowflakeContext';

import {
  fromWei,
} from '../../services/format';

import {
  network,
} from '../../common/config/network.json';

function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const snowflakeContext = useContext(SnowflakeContext);

  const {
    ein,
    snowflakeBalance,
    dapps,
    networkId,
    hasProvider,
  } = snowflakeContext;

  function displayButton() {
    if (ein) {
      return (
        <div>
          <NavItem>
            <NavLink tag={RouterNavLink} exact to="/" className="sidebar__link" activeClassName="sidebar__link--active">
              Snowflake dAppstore
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RouterNavLink} exact to="/wallet" className="sidebar__link" activeClassName="sidebar__link--active">
              Your Wallet
              <Badge className="sidebar__badge" color="secondary" pill>
                {numeral(fromWei(snowflakeBalance.toString())).format('0 a')}
                {' '}
                <img src={whiteHydroDrop} alt="Hydro Drop" className="sidebar__hydro-drop" />
              </Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RouterNavLink} exact to="/manage" className="sidebar__link" activeClassName="sidebar__link--active">
              Your dApps
              <Badge className="sidebar__badge" color="secondary" pill>
                {dapps.length}
              </Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RouterNavLink} exact to="/identity" className="sidebar__link" activeClassName="sidebar__link--active">
              Manage Your Identity (EIN)
            </NavLink>
          </NavItem>
        </div>
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
          step={hasProvider ? 'hydroId' : 'provider'}
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(false)}
          hasProvider={hasProvider}
          networkId={networkId}
        />
        <Button color="primary" onClick={() => setIsModalOpen(!isModalOpen)}>
          Create Account
        </Button>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="py-4">
        <Nav vertical>
          {displayButton()}
          <NavItem>
            <NavLink tag={RouterNavLink} exact to="/submit" className="sidebar__link" activeClassName="sidebar__link--active">
              Submit A dApp
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <div className="py-4">
        <CategoriesMenu />
      </div>
    </div>
  );
}

export default Sidebar;
