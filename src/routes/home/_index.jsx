/**
 * This file is a backup version
 */

import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardDeck,
} from 'reactstrap';

import Featured from '../../components/featured';
import DappPreview from '../../components/dappPreview';

import resolversJson from '../../legacy/resolvers.json';

function Home() {
  const [tab, setTab] = useState('home');

  return (
    <div>
      <Nav className="filters">
        <NavItem className="filters__nav-item">
          <NavLink
            onClick={() => setTab('home')}
            className={tab === 'home' ? (
              'filters__link--active'
            ) : (
              'filters__link'
            )}
          >
            Home
          </NavLink>
        </NavItem>
        <NavItem className="filters__nav-item">
          <NavLink
            onClick={() => setTab('featured')}
            className={tab === 'featured' ? (
              'filters__link--active'
            ) : (
              'filters__link'
            )}
          >
            Featured
          </NavLink>
        </NavItem>
        <NavItem className="filters__nav-item">
          <NavLink
            onClick={() => setTab('popular')}
            className={tab === 'popular' ? (
              'filters__link--active'
            ) : (
              'filters__link'
            )}
          >
            Most Popular
          </NavLink>
        </NavItem>
        <NavItem className="filters__nav-item">
          <NavLink
            onClick={() => setTab('last')}
            className={tab === 'last' ? (
              'filters__link--active'
            ) : (
              'filters__link'
            )}
          >
            Last Releases
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={tab}>
        <TabPane tabId="home">
          <CardDeck>
            {Object.keys(resolversJson).map(resolver => (
              <DappPreview
                key={resolver}
                id={resolver}
                added={false}
                legacy
              />
            ))}
          </CardDeck>
        </TabPane>
        <TabPane tabId="featured">
          <Featured />
        </TabPane>
        <TabPane tabId="popular">
          <h1>
            Popular dApps
          </h1>
          <p>dApps that are trending</p>
        </TabPane>
        <TabPane tabId="last">
          <h1>
            Latest dApps
          </h1>
          <p>Recently Added dApps</p>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Home;
