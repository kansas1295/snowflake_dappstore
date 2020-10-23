import React from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';
import { IoLogoGithub } from 'react-icons/io';

import CallToAction from '../callToAction';

import footerLogo from '../../common/img/ethereum_built_on_wide_color.png';

function Footer() {
  return (
    <div>
      <CallToAction />
      <Container fluid className="py-4 footer">
        <Row>
          <Col xs="12" sm="12" md="12" lg="3" className="footer__built-on center">
            <a href="https://ethereum.org/" target="_blank" rel="noopener noreferrer">
              <img src={footerLogo} className="builtOnEthereum" alt="Powered by Ethereum" />
            </a>
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" className="text-center center footer__nav-links">
            <Nav className="footer__menu">
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/privacy" className="footer__link">
                  Privacy
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/terms" className="footer__link">
                  Terms
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col xs="12" sm="12" md="12" lg="3" className="center footer__powered">
            <p className="mb-0 footer__powered-by center">
              Maintained and hosted on
              {' '}
              <a href="https://github.com/HydroBlockchain" className="maintainedAndHostedOn" target="_blank" rel="noopener noreferrer">
                <IoLogoGithub />
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
