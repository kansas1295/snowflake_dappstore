/**
 * Displays a card to link a new address to the current EIN
 */

import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Input,
  FormText,
  FormGroup,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';
import {
  IoIosCheckmarkCircle,
} from 'react-icons/io';

import SignatureButton from '../../../../components/signatureButton';
import TransactionButton from '../../../../components/transactionButton';
import HelpButton from '../../../../components/helpButton';

import tooltips from '../../../../common/config/tooltips.json';

import {
  createSignedMessageToLinkAddress,
  signPersonal,
  addLinkedAddress,
} from '../../../../services/utilities';

import ethLogo from '../../../../common/img/eth.png';

function LinkAddressCard() {
  const [step, setStep] = useState(0);
  const [newAddress, setNewAddress] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [timestamp] = useState(Math.round(new Date() / 1000) - 120);

  const web3 = useWeb3Context();

  if (web3.active && signedMessage === '' && newAddress !== '') {
    createSignedMessageToLinkAddress(web3.library, web3.account, newAddress, timestamp)
      .then((res) => {
        console.log('Created new signed message');
        setSignedMessage(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (step === 1) {
    return (
      <Card className="link">
        <Row className="p-3">
          <Col xs="10">
            <p className="link__title mb-0">
              Link an Ethereum Wallet
            </p>
          </Col>
          <Col xs="2" className="text-right">
            <HelpButton
              content={tooltips.ethWalletHelp}
            />
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col sm="2">
            <img src={ethLogo} alt="Eth" />
          </Col>
          <Col sm="10">
            <p className="link__new-address">
              <IoIosCheckmarkCircle /> {newAddress}
            </p>
            <p className="link__text">
              The next step is for you to give us permission to link this address to your Identity. This requires your signature of a hashed
               permission string. Be sure to check MetaMask to confirm.
            </p>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col className="text-center">
            <Button color="secondary" onClick={() => setStep(0)}>
              Cancel
            </Button>
          </Col>
          <Col className="text-center">
            <SignatureButton
              text="Accept"
              initialAction={() => signPersonal(web3.library, web3.account, signedMessage)}
              callbackAction={s => setSignature(s)}
              finalAction={() => setStep(2)}
            />
          </Col>
        </Row>
      </Card>
    );
  }

  if (step === 2) {
    return (
      <Card className="link">
        <Row className="p-3">
          <Col>
            <p className="link__title">
              Link an Ethereum Wallet
            </p>
          </Col>
          <Col className="text-right">
            <HelpButton
              content={tooltips.getHydroHelp}
            />
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col sm="2">
            <img src={ethLogo} alt="Eth" />
          </Col>
          <Col sm="10">
            <p>
              Last step
            </p>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col className="text-center">
            <Button color="secondary" onClick={() => setStep(1)}>
              Cancel
            </Button>
          </Col>
          <Col className="text-center">
            <TransactionButton
              intialText="Validate"
              sendAction={() => addLinkedAddress(
                web3.library,
                web3.account,
                newAddress,
                signature,
                timestamp,
              )}
            />
          </Col>
        </Row>
      </Card>
    );
  }

  return (
    <Card className="link">
      <Row className="p-3 justify-content-center align-items-center">
        <Col xs="10">
          <p className="link__title">
            Link an Ethereum Wallet
          </p>
        </Col>
        <Col xs="2" className="text-right">
          <HelpButton
            content={tooltips.getHydroHelp}
          />
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col sm="3" className="text-center">
          <img src={ethLogo} alt="Eth" />
        </Col>
        <Col xs="9">
          <FormGroup>
            <Input
              value={newAddress}
              className="link__input"
              placeholder="Enter an Ethereum address..."
              onChange={e => setNewAddress(e.target.value)}
            />
            <FormText className="link__helper-text">
              You will need to transact from this address.
            </FormText>
          </FormGroup>
        </Col>
      </Row>
      <Row className="pt-3">
        <Col className="text-center">
          <Button color="primary" disabled>
            Next
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default LinkAddressCard;
