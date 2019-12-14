import React from 'react';
import PropTypes from 'prop-types';

import './Header.scss';

const Header = ({ title }) => (
  <div className="header">
    <div className="header__title">
      {title}
    </div>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
