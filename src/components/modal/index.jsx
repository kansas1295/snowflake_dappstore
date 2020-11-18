import React from "react";
import PropTypes from "prop-types";
import LegacyDapp from "./legacyDapp";
import Purchase from "./purchase";
import Remove from "./remove";
import UnderDev from "./under_dev";

function MyModal(props) {
  const { modalType, ...mainProps } = props;
  switch (modalType) {
    case "LegacyDapp":
      return <LegacyDapp {...mainProps} />;
    case "Purchase":
      return <Purchase {...mainProps} />;
    case "Remove":
      return <Remove {...mainProps} />;
    case "UnderDev":
      return <UnderDev {...mainProps} />;
    default:
      return <></>;
  }
}

MyModal.prototype = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired,
};

MyModal.defaultProps = {
  price: "",
};

export default MyModal;
