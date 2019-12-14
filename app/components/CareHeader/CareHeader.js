import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { CareTag } from 'components/CareTag';
import { Icon } from '../UiKit';
import { calcRem } from '../../utils/styleHelper';
import { COLORS } from '../../constants/colors';

import './CareHeader.scss';


const bemPrefix = 'care-header';
export default class CareHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    label: PropTypes.string,
    care: ImmutablePropTypes.map,
    hideBackArrow: PropTypes.bool,
    goBack: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    care: null,
    hideBackArrow: false,
    goBack: () => { },
  };

  render() {
    const {
      label,
      care,
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
          <CareTag
            care={care}
            forceSecondaryNameOrientation="horizontal"
            nameStyle={{ color: COLORS.WHITE, fontSize: calcRem(16) }}
            secondaryNameStyle={{ color: COLORS.WHITE, fontSize: calcRem(10) }}
          />
        </div>
      </div>
    );
  }
}
