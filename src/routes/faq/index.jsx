/**
 * Displays the FAQ page
 * QA are taken from the faq.json file located in the config folder
 */

import React from 'react';
import {
  Row,
  Col,
} from 'reactstrap';

import QA from '../../components/qa';
import AdditionalHelp from '../../components/additionalHelp';

import faqJson from '../../common/config/faq.json';

const Faq = () => (
  <div>
    <Row className="pb-4">
      <Col>
        <h1>FAQ</h1>
      </Col>
    </Row>
    <Row>
      <Col>
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
      <Col>
        <AdditionalHelp />
      </Col>
    </Row>
  </div>
);

export default Faq;
