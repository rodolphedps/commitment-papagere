import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Toggle.scss';

const Toggle = ({ checked, readOnly, onChange }) => (
  <label className={classNames('switch', { 'switch--readonly': readOnly })}>
    <input
      type="checkbox"
      checked={checked}
      onChange={readOnly ? undefined : onChange}
      readOnly={readOnly}
    />
    <div className="slider"></div>
  </label>
);

Toggle.propTypes = {
  checked: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

Toggle.defaultProps = {
  onChange: () => { },
  readOnly: false,
};

export default Toggle;
