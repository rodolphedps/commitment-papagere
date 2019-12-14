import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../UiKit';
import { UserTag } from '../UserTag';
import { COLORS } from '../../constants/colors';
import { calcRem } from '../../utils/styleHelper';

import './UserHeader.scss';


const bemPrefix = 'user-header';
export default class UserHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    label: PropTypes.string,
    userName: PropTypes.string,
    userAvatarUrl: PropTypes.string,
    hideBackArrow: PropTypes.bool,
    goBack: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    userName: '',
    userAvatarUrl: '',
    hideBackArrow: false,
    goBack: () => { },
  };

  render() {
    const {
      label,
      userName,
      userAvatarUrl,
      hideBackArrow,
      goBack
    } = this.props;

    return (
      <div className={bemPrefix}>
        <div
          className={`${bemPrefix}__left-container`}
          onClick={hideBackArrow ? undefined : goBack}
        >
          {!hideBackArrow &&
            <Icon
              name="left-arrow"
              style={{ marginRight: calcRem(11) }}
            />
          }
          {label}
        </div>
        <div className={`${bemPrefix}__right-container`}>
          <UserTag
            name={userName}
            avatarUrl={userAvatarUrl}
            nameStyle={{ color: COLORS.WHITE, fontSize: calcRem(16) }}
          />
        </div>
      </div>
    );
  }
}
