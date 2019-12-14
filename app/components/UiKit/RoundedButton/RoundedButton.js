import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import './RoundedButton.scss';

const RoundedButton = ({
  iconName, style, onClick, className
}) => (
  <div
    className={`rounded-button ${className}`}
    style={style}
    onClick={onClick}
  >
    <Icon name={iconName} />
  </div>
);

RoundedButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

RoundedButton.defaultProps = {
  className: '',
  style: { },
  onClick: () => { },
};


export default RoundedButton;
