/**
 * Displays the transactions linked to the current account
 * TODO: Wallet - The "all" tab should mix all the tx
 * TODO: Wallet - Pagination on this page would be nice
 */

import React, {
  useState,
  useEffect,
} from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  TabContent,
  TabPane,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import {
  getPastDeposits,
  getPastPurchasedDapps,
  getPastWithdrawals,
} from '../../../../services/utilities';

import Transaction from '../transaction';

function Transactions() {
  const [tab, setTab] = useState('all');
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [purchasedDapps, setPurchasedDapps] = useState([]);

  const web3 = useWeb3Context();

  useEffect(() => {
    async function fetchTransactions() {
      if (web3.active) {
        getPastDeposits(web3.library, web3.account)
          .then((res) => {
            setDeposits(res);

            return getPastWithdrawals(web3.library, web3.account);
          })
          .then((res) => {
            setWithdrawals(res);

            return getPastPurchasedDapps(web3.library, web3.account);
          })
          .then((res) => {
            setPurchasedDapps(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    fetchTransactions();
  }, [web3.active]);

  return (
    <div>
      <Row className="py-5">
        <Col>
          <Nav className="filters fadeit">
            <NavItem className="filters__nav-item">
              <NavLink
                onClick={() => setTab('all')}
                className={tab === 'all' ? (
                  'filters__link--active'
                ) : (
                  'filters__link'
                )}
              >
                All
              </NavLink>
            </NavItem>
            <NavItem className="filters__nav-item">
              <NavLink
                onClick={() => setTab('deposits')}
                className={tab === 'deposits' ? (
                  'filters__link--active'
                ) : (
                  'filters__link'
                )}
              >
                Deposits
              </NavLink>
            </NavItem>
            <NavItem className="filters__nav-item">
              <NavLink
                onClick={() => setTab('withdraws')}
                className={tab === 'withdraws' ? (
                  'filters__link--active'
                ) : (
                  'filters__link'
                )}
              >
                Withdrawals
              </NavLink>
            </NavItem>
            <NavItem className="filters__nav-item">
              <NavLink
                onClick={() => setTab('purchasedDapps')}
                className={tab === 'purchasedDapps' ? (
                  'filters__link--active'
                ) : (
                  'filters__link'
                )}
              >
                Purchased dApps
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={tab} className="fadeit">
            <TabPane tabId="all">
              {deposits.map(deposit => (
                <Transaction
                  key={deposit.txHash}
                  blocknumber={deposit.blocknumber}
                  type={deposit.event}
                  amount={deposit.amount}
                />
              ))}
              {withdrawals.map(withdrawal => (
                <Transaction
                  blocknumber={withdrawal.blocknumber}
                  key={withdrawal.txHash}
                  type={withdrawal.event}
                  amount={withdrawal.amount}
                />
              ))}
              {purchasedDapps.map(purchase => (
                <Transaction
                  key={purchase.txHash}
                  blocknumber={purchase.blocknumber}
                  type={purchase.event}
                  amount={purchase.amount}
                  resolver={purchase.resolver}
                />
              ))}
            </TabPane>
            <TabPane tabId="deposits">
              {deposits.map(deposit => (
                <Transaction
                  key={deposit.txHash}
                  blocknumber={deposit.blocknumber}
                  type={deposit.event}
                  amount={deposit.amount}
                />
              ))}
            </TabPane>
            <TabPane tabId="withdraws">
              {withdrawals.map(withdrawal => (
                <Transaction
                  blocknumber={withdrawal.blocknumber}
                  key={withdrawal.txHash}
                  type={withdrawal.event}
                  amount={withdrawal.amount}
                />
              ))}
            </TabPane>
            <TabPane tabId="purchasedDapps">
              {purchasedDapps.map(purchase => (
                <Transaction
                  key={purchase.txHash}
                  blocknumber={purchase.blocknumber}
                  type={purchase.event}
                  amount={purchase.amount}
                  resolver={purchase.resolver}
                />
              ))}
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>
  );
}

export default Transactions;
