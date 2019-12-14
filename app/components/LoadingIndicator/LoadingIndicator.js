import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const LoadingIndicator = ({
  color,
  style,
}) => (
  <div className={`loading-indicator loading-indicator--${color}`} style={style}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

LoadingIndicator.propTypes = {
  color: PropTypes.oneOf([
    'white',
    'black',
  ]),
  style: PropTypes.object,
};

LoadingIndicator.defaultProps = {
  color: 'white',
};

export default LoadingIndicator;
