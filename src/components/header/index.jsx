/**
 * FIXME: The event listeners may cause a memory leak
 * FIXME: Scrolling up / down is triggering an update
 */

import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { IoMdHelpCircle } from "react-icons/io";
import { CURRENT_VERSION } from "../../settings";
import HeaderAccount from "./components/headerAccount";
import headerLogo from "../../common/img/hydro_dapp_store_logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <Navbar color="light" light expand="md" className="bg-white">
      <NavbarBrand tag={RouterNavLink} exact to="/">
        <h2 className="header__title">
          <img
            src={headerLogo}
            alt="Powered by Hydro"
            className="header__logo"
          />
        </h2>
        <p className="header__version">{CURRENT_VERSION}</p>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto align-items-center" navbar>
          <NavItem>
            <NavLink
              tag={RouterNavLink}
              exact
              to="/faq"
              activeClassName="active"
              className="header__faq"
            >
              <IoMdHelpCircle className="header__icon" />
            </NavLink>
          </NavItem>
          <NavItem>
            <HeaderAccount />
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
