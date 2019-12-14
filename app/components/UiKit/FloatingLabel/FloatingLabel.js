import React from 'react';
import PropTypes from 'prop-types';

import './FloatingLabel.scss';


const FloatingLabel = ({
  id,
  onChange,
  value,
  type,
  error,
  placeholder,
  onKeyPress,
}) => (
  <div className="has-float-label">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder=" "
      onKeyPress={onKeyPress}
    />
    <label htmlFor={id}>
      {placeholder}
    </label>
    {!!error && (
      <div className="has-float-label__error">
        {error}
      </div>
    )}
  </div>
);

FloatingLabel.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onKeyPress: PropTypes.func,
  onChange: PropTypes.func,
};


export default FloatingLabel;
