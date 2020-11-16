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
import ReactPaginate from "react-paginate";
import { useWeb3Context } from "web3-react";

import {
  getPastDeposits,
  getPastPurchasedDapps,
  getPastWithdrawals,
} from "../../../../services/utilities";
import Transaction from "../transaction";

function Transactions() {
  const [tab, setTab] = useState("All");
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [purchasedDapps, setPurchasedDapps] = useState([]);
  const [activePage, setActivePage] = useState(0);

  const web3 = useWeb3Context();
  const itemList = ["All", "Deposits", "Withdrawals", "Purchased dApps"];

  useEffect(() => {
    async function fetchTransactions() {
      if (!web3.active) {
        return;
      }
      try {
        const pastDeposits = await getPastDeposits(web3.library, web3.account);
        setDeposits(pastDeposits);
        const pastWithdrawals = await getPastWithdrawals(
          web3.library,
          web3.account
        );
        setWithdrawals(pastWithdrawals);
        const pastPurchasedDapps = await getPastPurchasedDapps(
          web3.library,
          web3.account
        );
        setPurchasedDapps(pastPurchasedDapps);
      } catch (e) {
        console.log(e);
      }
    }

    fetchTransactions();
  }, [web3.active, web3.account, web3.library]);

  const getActiveArray = (tabName) => {
    if (tabName === "All") {
      return deposits.concat(withdrawals).concat(purchasedDapps);
    }
    if (tabName === "Deposits") {
      return deposits;
    }
    if (tabName === "Withdrawals") {
      return withdrawals;
    }
    return purchasedDapps;
  };

  const getBody = (activeTab, currentPage) => {
    const arr = getActiveArray(activeTab);
    const tabID = activeTab;

    return (
      <TabPane tabId={tabID}>
        {arr.length > 0 &&
          arr
            .slice(currentPage * 10, (currentPage + 1) * 10 - 1)
            .map((ele) => (
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
          {itemList.map((ele, index) => (
            <NavItem className="filters__nav-item" key={index}>
              <NavLink
                onClick={() => setTab(ele)}
                className={
                  tab === ele ? "filters__link--active" : "filters__link"
                }
              >
                {ele}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={tab} className="fadeit">
          {getBody(tab, activePage)}
        </TabContent>
        {getActiveArray(tab).length > 10 && (
          <div id="react-paginate">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel="..."
              breakClassName="break-me"
              containerClassName="pagination"
              activeClassName="active"
              pageCount={getActiveArray(tab).length / 10}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              forcePage={activePage}
              onPageChange={(data) => setActivePage(data.selected)}
            />
          </div>
        )}
      </Col>
    </Row>
  );
}

export default Transactions;
