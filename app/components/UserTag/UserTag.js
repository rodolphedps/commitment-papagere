import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './UserTag.scss';


class UserTag extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    secondaryName: PropTypes.string,
    avatarUrl: PropTypes.string,
    avatarPosition: PropTypes.oneOf(['top', 'right', 'left']),
    nameStyle: PropTypes.object,
    secondaryNameStyle: PropTypes.object,
    forceSecondaryNameOrientation: PropTypes.oneOf([null, 'vertical', 'horizontal']),
    disabledStyle: PropTypes.bool,
  };

  static defaultProps = {
    avatarUrl: null,
    avatarPosition: 'right',
    nameStyle: { },
    secondaryNameStyle: { },
    forceSecondaryNameOrientation: null,
    disabledStyle: false,
  };

  get renderNameVertically() {
    const { avatarPosition, forceSecondaryNameOrientation } = this.props;

    if (forceSecondaryNameOrientation) {
      return forceSecondaryNameOrientation === 'vertical';
    }

    return avatarPosition !== 'top';
  }

  renderName() {
    return (
      <div className={classNames('user-tag__name-container', { 'user-tag__name-container--vertical': this.renderNameVertically })}>
        {this.renderPrimaryName()}
        {this.renderSecondaryName()}
      </div>
    );
  }

  renderPrimaryName() {
    return (
      <span
        className="user-tag__name"
        style={this.props.nameStyle}
      >
        {this.props.name}
      </span>
    );
  }

  renderSecondaryName() {
    const { secondaryName } = this.props;

    if (!secondaryName) {
      return null;
    }

    const formattedSecondaryName = `(${this.props.secondaryName})`;

    return (
      <span
        className={classNames('user-tag__secondary-name', { 'user-tag__secondary-name--horizontal': !this.renderNameVertically })}
        style={this.props.secondaryNameStyle}
      >
        {formattedSecondaryName}
      </span>
    );
  }

  renderAvatar() {
    const { avatarUrl, avatarPosition, disabledStyle } = this.props;

    if (!avatarUrl) {
      return null;
    }

    return (
      <div className="user-tag__avatar">
        <img src={avatarUrl} alt="user avatar" className={classNames(avatarPosition, { disabled: disabledStyle })} />
      </div>
    );
  }

  render() {
    const { avatarPosition } = this.props;

    if (avatarPosition === 'top') {
      return (
        <div className="user-tag user-tag--vertical">
          {this.renderAvatar()}
          {this.renderName()}
        </div>
      );
    }

    if (avatarPosition === 'left') {
      return (
        <div className="user-tag user-tag--horizontal">
          {this.renderAvatar()}
          {this.renderName()}
        </div>
      );
    }

    return (
      <div className="user-tag user-tag--horizontal">
        {this.renderName()}
        {this.renderAvatar()}
      </div>
    );
  }
}

export default UserTag;
