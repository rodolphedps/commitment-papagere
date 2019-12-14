import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components/UiKit';

import './PersonCardLine.scss';

class PersonCardLine extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };


  renderIcon() {
    const { icon } = this.props;

    if (!icon) {
      return null;
    }

    return (
      <Icon
        className="person-info__icon"
        name={icon}
      />
    );
  }

  render() {
    const { label, children } = this.props;

    return (
      <div className="person-info">
        <div className="icon-ctn">
          {this.renderIcon()}
        </div>
        <div className="label-ctn">
          {label}
        </div>
        <div className="value-ctn">
          {children}
        </div>
      </div>
    );
  }
}

export default PersonCardLine;
