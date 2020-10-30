import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';

import {
  IoIosFolder,
  IoIosFilm,
  IoMdCard,
  IoIosGlobe,
  IoLogoGameControllerA,
  IoIosPeople,
  IoIosCalculator,
  IoIosCog,
  IoMdBuild
} from 'react-icons/io';

import categoriesJson from '../../../../common/config/categories.json';

function CategoriesMenu() {
  const Components = {
    IoIosFilm,
    IoMdCard,
    IoIosGlobe,
    IoLogoGameControllerA,
    IoIosPeople,
    IoIosCalculator,
    IoIosCog,
    IoMdBuild,
  };

  return (
    <div className="categories-menu">
      <h2 className="categories-menu__title">
        Categories
      </h2>
      <Nav vertical>

        {categoriesJson.map(Categorie => (
          <NavItem key={Categorie.name}>
            <NavLink tag={RouterNavLink} exact to={`/category/${Categorie.name}`} className="sidebar__link" activeClassName="sidebar__link--active">
              {React.createElement(Components[Categorie.icon], {
                className: 'sidebar__icon',
              })}
              {' '}
              {Categorie.name}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </div>
  );
}

export default CategoriesMenu;

//snippet for all categorys
// <NavItem key="all">
//   <NavLink tag={RouterNavLink} exact to="/category/All" className="sidebar__link" activeClassName="sidebar__link--active">
//     <IoIosFolder
//       className="sidebar__icon"
//     />
//     {' '}
//     All Categories
//   </NavLink>
// </NavItem>
