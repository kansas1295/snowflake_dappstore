/**
 * Displays the sidebar
 */

import React, { useState, useContext } from "react";
import { Nav, NavItem, NavLink, Button, Badge } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import numeral from "numeral";

import Onboarding from "../onboarding";
import CategoriesMenu from "./components/categoriesMenu";
import whiteHydroDrop from "../../common/img/hydro_white_drop.png";

import SnowflakeContext from "../../contexts/snowflakeContext";

import { fromWei } from "../../services/format";

import { network } from "../../common/config/network.json";

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
    if (hasProvider && networkId !== network) {
      return (
        <div className="onboardingButton">
          <Button color="warning">Wrong network</Button>
        </div>
      );
    }

    if (ein) {
      return (
        <div className="nav">
          <NavItem>
            <NavLink
              tag={RouterNavLink}
              exact
              to="/"
              activeClassName=" active"
            >
              Snowflake Store
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={RouterNavLink}
              exact
              to="/wallet"
              activeClassName=" active"
            >
              Your Wallet
              <Badge className="sidebar__badge" color="secondary" pill>
                {numeral(fromWei(snowflakeBalance.toString())).format("0 a")}{" "}
                <img
                  src={whiteHydroDrop}
                  alt="Hydro Drop"
                  className="sidebar__hydro-drop"
                />
              </Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={RouterNavLink}
              exact
              to="/manage"
              activeClassName=" active"
            >
              Your dApps
              <Badge className="sidebar__badge" color="secondary" pill>
                {dapps.length}
              </Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={RouterNavLink}
              exact
              to="/identity"
              activeClassName=" active"
            >
              Manage Your Identity (EIN)
            </NavLink>
          </NavItem>
        </div>
      );
    }

    return (
      <div className="onboardingButton">
        <Onboarding
          step={hasProvider ? "hydroId" : "provider"}
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(false)}
          hasProvider={hasProvider}
          networkId={networkId}
        />
      </div>
    );
  }

  return (
    // <div className="sidebar">
    //   <div className="py-4">
    //     <Nav vertical>
    //       {displayButton()}
    //       <NavItem>
    //         <NavLink
    //           tag={RouterNavLink}
    //           exact
    //           to="/submit"
    //           className="sidebar__link"
    //           activeClassName="sidebar__link--active"
    //         >
    //           Submit A dApp
    //         </NavLink>
    //       </NavItem>
    //     </Nav>
    //   </div>
    //   <div className="py-4">
    //     <CategoriesMenu />
    //   </div>
    // </div>
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="search_main">
            <input name="" type="text" placeholder="Search" className="searchbox" />
          </div>

          {displayButton()}

          <CategoriesMenu />

          <NavLink
            tag={RouterNavLink}
            exact
            to="/submit"
            activeClassName=" active"
            style={{ textAlign: 'center', width: '100%', display: 'block', margin: '10px 0', textDecoration: 'none', color: '#aeaeae' }}
          >
            <i className="fas fa-paper-plane"></i> Submit A dApp
          </NavLink>

          <input name="" type="button" value="Create Account" className="create_account_btn" />

        </div>

      </nav>
    </div>

  );
}

export default Sidebar;
