import React from "react";
import PropTypes from "prop-types";
import { Popover, PopoverBody } from "reactstrap";

function Tooltip({ isOpen, toggle, content, target }) {
  return (
    <Popover
      target={target}
      trigger="hover"
      placement="top"
      isOpen={isOpen}
      toggle={toggle}
    >
      <PopoverBody>{content}</PopoverBody>
    </Popover>
  );
}

Tooltip.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  target: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
};

export default Tooltip;
