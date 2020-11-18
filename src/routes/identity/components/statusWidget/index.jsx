/**
 * Displays a widget connected to the Status dApp
 */

import React, { useState, useContext, useEffect } from "react";
import { useWeb3Context } from "web3-react";
import { Row, Col, Button } from "reactstrap";
import SnowflakeContext from "../../../../contexts/snowflakeContext";
import Modal from "../../../../components/modal";
import { getStatus } from "../../../../services/utilities";

function StatusWidget() {
  const user = useContext(SnowflakeContext);
  const { dapps, ethAddress } = user;
  const statusAddress = "0x16fD6e2E1C4afB9C4e7B901141706596317e4ceB";
  const web3 = useWeb3Context();
  const [status, setStatus] = useState("");
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    async function getCurrentStatus() {
      if (dapps.includes(statusAddress)) {
        const currentStatus = await getStatus(web3.library, ethAddress);
        setStatus(currentStatus);
      }
    }

    getCurrentStatus();
  }, [dapps, ethAddress, web3.library]);

  return (
    <div>
      <Modal
        id={statusAddress}
        title="Status"
        isOpen={modalType !== ""}
        toggle={() => setModalType("")}
      />
      <Row className="mb-4 no-gutters status">
        <Col>
          <Row>
            <Col>
              <p className="status__title">My Status:</p>
            </Col>
            <Col>
              {dapps.includes(statusAddress) ? (
                <Button
                  className="status__edit"
                  onClick={() => setModalType("LegacyDapp")}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  className="status__edit"
                  onClick={() => setModalType("Purchase")}
                >
                  Get
                </Button>
              )}
            </Col>
          </Row>
          <p className="status__current">
            {status !== "" ? status : "No status yet!"}
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default StatusWidget;
