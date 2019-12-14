import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';

import './style.scss';

export default class TextArea extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    containerStyle: PropTypes.object,
    textareaStyle: PropTypes.object,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func, // "equivalent to onFocusOut",
  };

  static defaultProps = {
    placeholder: '',
    containerStyle: { },
    textareaStyle: { },
    disabled: false,
    readOnly: false,
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
        className="text-area"
        style={this.props.containerStyle}
      >
        <TextareaAutosize
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={() => this.props.onBlur(this.state.value)}
          style={this.props.textareaStyle}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
        />
      </div>
    );
  }
}
