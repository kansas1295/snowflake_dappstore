/**
 * Displays a QA
 * TODO: QA - Make chevron clickable to toggle row.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Button,
  CardBody,
  CardHeader,
  Card,
} from 'reactstrap';
import {
  IoIosArrowForward,
  IoIosArrowDown,
} from 'react-icons/io';

function QA(props) {
  const {
    question,
    answer,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="qa">
      <Card>
        <CardHeader className="qa__header">
          {isOpen ? (
            <IoIosArrowDown />
          ) : (
            <IoIosArrowForward />
          )}
          <Button color="link qa__question" onClick={() => setIsOpen(!isOpen)}>
            {question}
          </Button>
        </CardHeader>
        <Collapse isOpen={isOpen}>
          <CardBody>
            {answer}
          </CardBody>
        </Collapse>
      </Card>
    </div>
  );
}

QA.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default QA;
