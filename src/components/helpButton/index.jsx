import React, { useRef, useState } from "react";
import { IoIosHelpCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";
import Tooltip from "../tooltip";

function HelpButton({ content }) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const iconRef = useRef();

  return (
    <div className="help-button" ref={iconRef}>
      <IoIosHelpCircleOutline onMouseOver={() => setIsTooltipOpen(true)} />
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
