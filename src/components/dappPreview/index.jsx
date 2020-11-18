/**
 * Displays a preview of a dapp.
 * This component can be used for any situation: buy / open / remove.
 * In Legacy, this component fetches the data from an imported JSON file,
 * but in V2, it will fetch data from an external API.
 */

import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import SnowflakeContext from "../../contexts/snowflakeContext";

import Modal from "../modal";

import imgPlaceholder from "../../common/img/placeholders/dapp.gif";
import resolversJson from "../../legacy/resolvers.json";

function DappPreview(props) {
  const { id, hasIdentity, legacy, isAdded } = props;
  const snowflakeContext = useContext(SnowflakeContext);
  const { networkId, ein } = snowflakeContext;
  const [modalType, setModalType] = useState("");

  const details = {
    title: "Title",
    category: "Category",
    price: "0",
    logo: imgPlaceholder,
  };

  if (legacy && resolversJson[id] !== undefined) {
    details.title = resolversJson[id].title;
    details.category = resolversJson[id].category;
    details.price = resolversJson[id].price;
    details.logo = `${process.env.PUBLIC_URL}/legacy/${id}/logo.png`;
  }

  function displayButton() {
    if (!hasIdentity || details.category === "Under Development") {
      return <></>;
    }

    if (!isAdded) {
      return (
        <Button
          color="outlined"
          size="sm"
          onClick={() => setModalType("Purchase")}
        >
          Explore
        </Button>
      );
    }

    return (
      <>
        <Button
          color="success"
          size="sm"
          onClick={() => setModalType("LegacyDapp")}
        >
          Open
        </Button>
        <Button color="danger" size="sm" onClick={() => setModalType("Remove")}>
          Remove
        </Button>
      </>
    );
  }

  function handleTap() {
    if (networkId === 4 && ein !== "") {
      if (details.category === "Under Development") {
        setModalType("UnderDev");
      } else if (isAdded) {
        setModalType("LegacyDapp");
      } else {
        setModalType("Purchase");
      }
    }
  }

  return (
    <div>
      <Modal
        id={id}
        title={details.title}
        price={details.price || 0}
        isOpen={modalType !== ""}
        toggle={() => setModalType("")}
        modalType={modalType}
      />
      <Card className="dapp-preview">
        <div
          className="dapp-preview__image"
          style={{ backgroundImage: "url(" + details.logo + ")" }}
          onClick={() => handleTap()}
        >
          <div className="dapp-preview__overlay-wrapper none">
            <Button>Details</Button>
          </div>
        </div>
        <CardBody className="dapp-preview__body">
          <h4 className="dapp-preview__title">{details.title}</h4>
          <h5 className="dapp-preview__category">{details.category}</h5>
          <Row className="justify-content-center align-items-center">
            <Col>{displayButton()}</Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default DappPreview;

DappPreview.propTypes = {
  id: PropTypes.string.isRequired,
  legacy: PropTypes.bool.isRequired,
  isAdded: PropTypes.bool,
  hasIdentity: PropTypes.bool,
};

DappPreview.defaultProps = {
  hasIdentity: false,
  added: false,
};
