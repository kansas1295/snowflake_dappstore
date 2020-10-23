import {
  Connectors,
} from 'web3-react';

import BitskiConnector from './bitskiConnector';

const { InjectedConnector } = Connectors;

const MetaMask = new InjectedConnector();

const Bitski = new BitskiConnector('590d77f9-f1c9-4b4d-aa4e-20ad706a0861');

const connectors = { MetaMask, Bitski };

export default connectors;
