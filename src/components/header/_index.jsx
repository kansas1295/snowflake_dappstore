/**
 * TODO: Header - Make version dynamic and pull in settings file
 * FIXME: The event listeners may cause a memory leak
 * FIXME: Scrolling up / down is triggering an update
 */

import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';
import {
  IoMdHelpCircle,
} from 'react-icons/io';

import HeaderAccount from './components/headerAccount';
import headerLogo from '../../common/img/hydro_dapp_store_logo.png';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const el = document.querySelector('nav');

    this.setState({
      top: el.offsetTop,
      height: el.offsetHeight,
    });

    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    const {
      scroll,
      top,
      height,
    } = this.state;

    scroll > top ? document.body.style.paddingTop = `${height}px` : document.body.style.paddingTop = 0;
  }

  handleScroll() {
    this.setState({
      scroll: window.scrollY,
    });
  }

  toggle() {
    const {
      isOpen,
    } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const {
      isOpen,
      scroll,
      top,
    } = this.state;

    return (
      <div>
        <Navbar color="light" light expand="md" className={scroll > top ? 'fixed-nav bg-white' : 'bg-white'}>
          <NavbarBrand tag={RouterNavLink} exact to="/">
            <h2 className="header__title">
              <img src={headerLogo} alt="Powered by Hydro" className="header__logo" />
            </h2>
            <p className="header__version">v0.1.0 BETA</p>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto align-items-center" navbar>
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/faq" activeClassName="active" className="header__faq">
                  <IoMdHelpCircle className="header__icon" />
                </NavLink>
              </NavItem>
              <NavItem>
                <HeaderAccount />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
