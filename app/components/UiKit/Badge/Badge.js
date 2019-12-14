import React from 'react';
import PropTypes from 'prop-types';

import './Badge.scss';


const Badge = ({ text, color }) => (
  <div className="badge" style={{ background: color }}>
    {text}
  </div>
);

Badge.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};


export default Badge;
