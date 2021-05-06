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
import $ from "jquery";
import { CURRENT_VERSION } from "../../settings";
import HeaderAccount from "./components/headerAccount";
import headerLogo from "../../common/img/logo-2.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const toggleMenu = () => {
    console.log("TEST")
    $("#main-page").toggleClass("sb-sidenav-toggled");
  }

  return (
    // <Navbar color="light" light expand="md" className="bg-white">
    //   <NavbarBrand tag={RouterNavLink} exact to="/">
    //     <h2 className="header__title">
    //       <img
    //         src={headerLogo}
    //         alt="Powered by Hydro"
    //         className="header__logo"
    //       />
    //     </h2>
    //     <p className="header__version">{CURRENT_VERSION}</p>
    //   </NavbarBrand>
    //   <NavbarToggler onClick={toggle} />
    //   <Collapse isOpen={isOpen} navbar>
    //     <Nav className="ml-auto align-items-center" navbar>
    //       <NavItem>
    //         <NavLink
    //           tag={RouterNavLink}
    //           exact
    //           to="/faq"
    //           activeClassName="active"
    //           className="header__faq"
    //         >
    //           <IoMdHelpCircle className="header__icon" />
    //         </NavLink>
    //       </NavItem>
    //       <NavItem>
    //         <HeaderAccount />
    //       </NavItem>
    //     </Nav>
    //   </Collapse>
    // </Navbar>
    <nav className="sb-topnav navbar navbar-expand navbar-dark">
      <NavbarBrand tag={RouterNavLink} className="navbar-brand" exact to="/">
        <img src={headerLogo} style={{ width: '170px', marginTop: '10px' }} />
        {/* <p className="header__version">{CURRENT_VERSION}</p> */}
      </NavbarBrand>
      {/* <a className="navbar-brand" href="index.html"><img src="img/logo.png" style={{ width: '170px', marginTop: '10px' }} /></a> */}
      <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" onClick={toggleMenu} ><i className="fas fa-bars"></i></button>
      <ul className="top_menu">
        <li>Categories &nbsp; <i className="fas fa-angle-down" style={{ marginTop: '-5px' }}></i></li>
        <li>New releases</li>
      </ul>
      <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">

      </form>
      <ul className="right_menu">
        <li>
          <NavLink
            tag={RouterNavLink}
            exact
            to="/faq"
            style={{ color: '#716d6d' }}
          >
            <i className="far fa-question-circle"></i>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
