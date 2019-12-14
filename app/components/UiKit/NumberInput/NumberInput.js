import React from 'react';
import PropTypes from 'prop-types';

import './NumberInput.scss';


class NumberInput extends React.PureComponent {
  static defaultProps = {
    value: '',
    placeholder: '',
    step: 1,
    min: '',
    max: '',
    disabled: false,
    onChange: () => { },
    onFocusOut: () => { },
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  setFocus() {
    this.inputRef.current.focus();
  }

  render() {
    const {
      value,
      step,
      min,
      max,
      placeholder,
      disabled,
      onChange,
      onFocusOut,
      ...props
    } = this.props;

    return (
      <input
        className="number-input"
        ref={this.inputRef}
        type="number"
        pattern="\d*"
        value={value}
        step={step}
        min={min}
        max={max}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange && onChange(event.target.value, event)}
        onBlur={(event) => onFocusOut && onFocusOut(event.target.value, event)}
        {...props}
      />
    );
  }
}

NumberInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onFocusOut: PropTypes.func,
};

export default NumberInput;
