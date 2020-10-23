import React, {
  useEffect,
  useState,
} from 'react';
import {
  Row,
  Col,
} from 'reactstrap';

import MetaMaskLogo from 'metamask-logo';

function ProviderStep() {
  const [isLogoPresent, setIsLogoPresent] = useState(false);

  function renderLogo() {
    const viewer = MetaMaskLogo({
      pxNotRatio: true,
      width: '100%',
      height: 400,
      followMouse: true,
      slowDrift: false,
    });

    const container = document.getElementById('logo-container');
    container.appendChild(viewer.container);
  }

  useEffect(() => {
    if (!isLogoPresent) {
      renderLogo();
      setIsLogoPresent(true);
    }
  });

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="12" sm="4" className="text-center">
          <div id="logo-container" />
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs="12" sm="8" className="text-center">
          <p className="text-white">
            To interact with Snowflake and the Hydro dApp store you must install MetaMask (a wallet for your browser) and have a balance of Ethereum in it. Once you install it this message will go away and you can proceed.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="12" sm="10" className="text-center">
          <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="btn btn-white">
            Let&apos;s get started
          </a>
        </Col>
      </Row>
    </div>
  );
}

export default ProviderStep;
