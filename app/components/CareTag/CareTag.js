import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { UserTag } from 'components/UserTag';
import { secureAvatarUrl } from 'utils/avatars';

class CareTag extends PureComponent {
  static propTypes = {
    care: ImmutablePropTypes.map.isRequired,
    avatarPosition: PropTypes.oneOf(['top', 'right', 'left']),
    nameStyle: PropTypes.object,
    secondaryNameStyle: PropTypes.object,
    forceSecondaryNameOrientation: PropTypes.oneOf([null, 'vertical', 'horizontal']),
    disabledStyle: PropTypes.bool,
  };

  static defaultProps = {
    avatarPosition: 'right',
    nameStyle: { },
    secondaryNameStyle: { },
    forceSecondaryNameOrientation: null,
    disabledStyle: false,
  };

  get childName() {
    const { care } = this.props;
    return care.getIn(['child', 'first_name']);
  }

  get shouldDisplayNannyName() {
    const { care } = this.props;
    return care.get('childHasMultipleCares');
  }

  get secondaryName() {
    if (!this.shouldDisplayNannyName) {
      return null;
    }

    const { care } = this.props;

    return care.getIn(['nanny', 'first_name']);
  }

  get avatarUrl() {
    const { care } = this.props;
    return secureAvatarUrl(care.get('stylingProps'));
  }

  render() {
    const {
      avatarPosition,
      nameStyle,
      secondaryNameStyle,
      forceSecondaryNameOrientation,
      disabledStyle
    } = this.props;

    return (
      <UserTag
        name={this.childName}
        secondaryName={this.secondaryName}
        avatarUrl={this.avatarUrl}
        nameStyle={nameStyle}
        secondaryNameStyle={secondaryNameStyle}
        avatarPosition={avatarPosition}
        forceSecondaryNameOrientation={forceSecondaryNameOrientation}
        disabledStyle={disabledStyle}
      >
      </UserTag>
    );
  }
}

export default CareTag;
