import React from 'react';
import PropTypes from 'prop-types';

import './ListCard.scss';


const ListCard = ({ theme, children, className }) => (
  <div className={`list-card ${className} ${theme}`}>
    {children}
  </div>
);

ListCard.THEMES = {
  STANDARD: 'standard',
  FULL_GRADIENT: 'full-gradient',
  NONE: 'none',
  DETACHED_GRADIENT: 'detached-gradient',
};

ListCard.propTypes = {
  theme: PropTypes.oneOf(Object.values(ListCard.THEMES)),
  children: PropTypes.node,
  className: PropTypes.string,
};

ListCard.defaultProps = {
  theme: ListCard.THEMES.STANDARD,
  className: '',
};

export default ListCard;
