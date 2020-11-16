/**
 * Displays the transactions linked to the current account
 * TODO: Wallet - Pagination on this page would be nice
 */

import React, { useState, useEffect } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  TabContent,
  TabPane,
} from "reactstrap";
import { useWeb3Context } from "web3-react";

import {
  getPastDeposits,
  getPastPurchasedDapps,
  getPastWithdrawals,
} from "../../../../services/utilities";

import Transaction from "../transaction";

function Transactions() {
  const [tab, setTab] = useState("all");
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [purchasedDapps, setPurchasedDapps] = useState([]);

  const web3 = useWeb3Context();
  const itemList = ["All", "Deposits", "Withdrawals", "Purchased dApps"];

  useEffect(() => {
    async function fetchTransactions() {
      if (!web3.active) {
        return;
      }
      getPastDeposits(web3.library, web3.account)
        .then((res) => {
          setDeposits(res);
          return getPastWithdrawals(web3.library, web3.account);
        })
        .then((res) => {
          setWithdrawals(res);
          return getPastPurchasedDapps(web3.library, web3.account);
        })
        .then(setPurchasedDapps)
        .catch(console.log);
    }

    fetchTransactions();
  }, [web3.active, web3.account, web3.library]);

  const getBody = (activeTab) => {
    const getCorrectArray = (tabName) => {
      if (tabName === "All") {
        return [...deposits, ...withdrawals, ...purchasedDapps];
      }
      if (tabName === "Deposits") {
        return deposits;
      }
      if (tabName === "Withdrawals") {
        return withdrawals;
      }
      return purchasedDapps;
    };

    const arr = getCorrectArray(activeTab);
    const tabID = activeTab;

    return (
      <TabPane tabId={tabID}>
        {arr.length > 0 &&
          arr.map((ele) => (
            <Transaction
              key={ele.txHash}
              blocknumber={ele.blocknumber}
              type={ele.event}
              amount={ele.amount}
              resolver={ele?.resolver}
            />
          ))}
      </TabPane>
    );
  };

  return (
    <Row className="py-5">
      <Col>
        <Nav className="filters fadeit">
          {itemList.map((ele) => (
            <NavItem className="filters__nav-item">
              <NavLink
                onClick={() => setTab(ele)}
                className={
                  tab === ele ? "filters__link--active" : "filters__link"
                }
                key={ele}
              >
                {ele}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={tab} className="fadeit">
          {getBody(tab)}
        </TabContent>
      </Col>
    </Row>
  );
}

export default Transactions;
