import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import { Icon } from '../../UiKit';

import './NavigationItem.scss';

const NavigationItem = ({ path, icon, label }) => (
  <NavLink
    to={path}
    className="navigation-item"
    activeClassName="navigation-item--selected"
  >
    <div className="navigation-item__icon">
      <Icon name={icon} />
    </div>
    <div className="navigation-item__label">
      {label}
    </div>
  </NavLink>
);

NavigationItem.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default NavigationItem;
