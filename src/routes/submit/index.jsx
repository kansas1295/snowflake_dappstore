import React, {
  useState,
} from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardText,
  Collapse,
} from 'reactstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

import contractsJson from '../../common/config/submit/contracts.json';
import resourcesJson from '../../common/config/submit/resources.json';
import partnersJson from '../../common/config/submit/partners.json';
import snippetsJson from '../../common/config/submit/snippets.json';

import QA from '../../components/qa';
import faqJson from '../../common/config/submit/faq.json';

function Submit() {
  const [isSandboxOpen, toggleSandbox] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState(0);

  function handleSnippetClick(snippetId) {
    if (snippetId === currentSnippet) {
      if (!isSandboxOpen) {
        toggleSandbox(true);
      } else {
        toggleSandbox(false);
      }
    } else {
      toggleSandbox(true);
      setCurrentSnippet(snippetId);
    }
  }

  return (
    <div>
      <Row className="submitDapp">
        <Col>
          <h1 className="title">Submit A dApp</h1>
          <p>Looking to submit a dApp? Use the resources below to get started on bringing you idea to life.</p>

          <h3>3rd Party Partners</h3>
          <p>The following resources are from our partners.</p>

          {partnersJson.map(Partner => (
            <Card className="submit_card" key={Partner.title}>
              <CardHeader>{Partner.title}</CardHeader>
              <CardBody>
                <CardText>
                  {Partner.description}
                  <br /><br />
                  <img src={Partner.icon} alt={Partner.title} className="submit__partner-logo" width={Partner.imageWidth} />
                </CardText>
              </CardBody>
              <CardFooter>
                <Button className="partner" onClick={() =>{window.open(Partner.link)}}>
                  View Partner
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Card className="submit_card" key="Become a Partner">
            <CardHeader>Become A Partner</CardHeader>
            <CardBody>
              <CardText>
                Want to see your buttoned up dApp developer tools listed here? Join our growing curated list today!
                <br /><br />
                <img src="../../img/settings_icon.png" alt="Become A Partner" className="submit__partner-logo" width="100" />
              </CardText>
            </CardBody>
            <CardFooter>
              <Button className="become_partner" onClick={() => {window.open("mailto:da@projecthydro.org")}}>
                Become A Partner
              </Button>
            </CardFooter>
          </Card>

          <h3>Resources & Tutorials</h3>
          <p>Use the resources below to learn about best practices.</p>

          {resourcesJson.map(Resource => (
            <Card className="submit_card" key={Resource.title}>
              <CardHeader>
                {Resource.title}
              </CardHeader>
              <CardBody>
                <CardText>
                  {Resource.description}
                  <br /><br />
                  <img src={Resource.icon} alt={Resource.title} className="submit__partner-logo" width={100} />
                </CardText>
              </CardBody>
              <CardFooter>
                <Button className="resource" onClick={() =>{window.open(Resource.link)}}>
                  View Resource
                </Button>
              </CardFooter>
            </Card>
          ))}

          <h3>Code Snippets</h3>
          <p>Below are some code snippets to get you started.</p>

          {snippetsJson.map((Snippet, index) => (
            <Card className="submit_card" key={Snippet.title}>
              <CardHeader>{Snippet.title}</CardHeader>
              <CardBody>
                <CardText>
                  {Snippet.description}
                  <br /><br />
                  <img src={Snippet.icon} alt={Snippet.title} className="submit__partner-logo" width={100} />
                </CardText>
              </CardBody>
              <CardFooter>
                <Button className="snippet" onClick={() => handleSnippetClick(index)}>
                  View Code Snippet
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Collapse className="submit__code-window" isOpen={isSandboxOpen}>
            <SyntaxHighlighter
              language="javascript"
              style={okaidia}
            >
              {snippetsJson[currentSnippet].snippet}
            </SyntaxHighlighter>
          </Collapse>


          <h3>Hydro Smart Contracts</h3>
          <p>The smart contracts below can speed up your dApp development time.</p>

          {contractsJson.map(Contract => (
            <Card className="submit_card" key={Contract.title}>
              <CardHeader>{Contract.title}</CardHeader>
              <CardBody>
                <CardText>
                  {Contract.description}
                  <br /><br />
                  <img src={Contract.icon} alt={Contract.title} className="submit__partner-logo" width={100} />
                </CardText>
              </CardBody>
              <CardFooter>
                <Button className="smart_contract" onClick={() =>{window.open(Contract.link)}}>
                  View Contract
                </Button>
              </CardFooter>
            </Card>
          ))}

          <h3>FAQ</h3>
          <p>Have a question about dApp development or submitting to the store, read below</p>

          <Row>
            <Col className="nopadding">
              <div className="accordion">
                {faqJson.map(qa => (
                  <QA
                    key={qa.question}
                    question={qa.question}
                    answer={qa.answer}
                  />
                ))}
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="nopadding">
              <Row className="additional-help align-items-center">
                <Col sm="12" md="12" lg="8">
                  <h4 className="additional-help__title">Need Additional Help?</h4>
                  <p className="additional-help__subtitle">Send us a message via Telegram</p>
                </Col>
                <Col sm="12" md="12" lg="4" className="text-right">
                  <Button className="btn-outlined" onClick={() =>{window.open('https://t.me/projecthydro')}}>
                  Get Assistance
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Submit;
