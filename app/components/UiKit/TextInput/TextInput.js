import React from 'react';
import PropTypes from 'prop-types';

import './TextInput.scss';

export default class TextInput extends React.PureComponent {
  static defaultProps = {
    placeholder: '',
    containerStyle: { },
    inputStyle: { },
    onChange: () => { },
    onBlur: () => { },
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };

    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return { value: nextProps.value };
    }

    return null;
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ value });

    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }

  render() {
    return (
      <div
        className="text-input"
        style={this.props.containerStyle}
      >
        <input
          type="text"
          value={this.state.value}
          placeholder={this.props.placeholder}
          style={this.props.inputStyle}
          onChange={this.handleChange}
          onBlur={() => this.props.onBlur(this.state.value)}
        />
      </div>
    );
  }
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func, // "equivalent to onFocusOut"
};
