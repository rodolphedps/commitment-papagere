import React, { Children } from 'react';
import PropTypes from 'prop-types';

import './ActionBar.scss';


const ActionBar = ({ children }) => (
  <div className="action-bar">
    {Children.map(Children.toArray(children).filter((child) => child), (child) => (
      <div className="action-bar__action">
        {child}
      </div>
    ))}
  </div>
);

ActionBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default ActionBar;
