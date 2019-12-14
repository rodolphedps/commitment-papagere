import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

import Icon from '../Icon';

import './Button.scss';


class Button extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    style: PropTypes.object,
    iconStyle: PropTypes.object,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
  };

  static defaultProps = {
    text: '',
    style: { },
    iconStyle: { },
    onClick: () => { },
    disabled: false,
  };

  debounceOnClick() {
    return debounce(
      this.props.onClick,
      200,
      {
        leading: true,
        trailing: false,
      },
    );
  }

  renderIcon() {
    const { icon } = this.props;

    if (!icon) {
      return null;
    }

    return (
      <div className="button__icon">
        <Icon name={icon} style={this.props.iconStyle} />
      </div>
    );
  }

  renderText() {
    const { text } = this.props;

    if (!text) {
      return null;
    }

    return (
      <div className="button__text">
        {this.props.text}
      </div>
    );
  }

  render() {
    return (
      <div
        className={classNames('button', { 'button--disabled': this.props.disabled })}
        style={this.props.style}
        onClick={this.props.disabled ? undefined : this.debounceOnClick()}
      >
        {this.renderIcon()}
        {this.renderText()}
        {this.props.children}
      </div>
    );
  }
}

export default Button;
