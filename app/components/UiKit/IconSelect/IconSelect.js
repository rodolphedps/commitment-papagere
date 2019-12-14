import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../Icon';

import './IconSelect.scss';

const IconSelect = ({
  iconName, checked, readOnly, onClick
}) => (
  <div
    className={classNames(
      'icon-select',
      { 'icon-select--checked': checked },
      { 'icon-select--readonly': readOnly },
    )}
    onClick={onClick}
  >
    <div className="icon-select__icon-container">
      <Icon name={iconName} />
    </div>
  </div>
);

IconSelect.propTypes = {
  iconName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool,
  onClick: PropTypes.func,
};

IconSelect.defaultProps = {
  readOnly: false,
  onClick: () => { },
};

export default IconSelect;
