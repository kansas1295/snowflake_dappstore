/**
 * Displays a help button triggering a tooltip on hover
 * TODO: Help Button - Create a specific stylesheet for this component
 * TODO: Help Button - Add an active button design
 */

import React, {
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  IoIosHelpCircleOutline,
} from 'react-icons/io';

import Tooltip from '../tooltip';

function HelpButton(props) {
  const {
    content,
  } = props;

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const iconRef = useRef();

  return (
    <div className="help-button" ref={iconRef}>
      <IoIosHelpCircleOutline />
      {iconRef.current && (
        <Tooltip
          target={iconRef}
          content={content}
          isOpen={isTooltipOpen}
          toggle={() => setIsTooltipOpen(!isTooltipOpen)}
        />
      )}
    </div>
  );
}

HelpButton.propTypes = {
  content: PropTypes.string.isRequired,
};

export default HelpButton;
