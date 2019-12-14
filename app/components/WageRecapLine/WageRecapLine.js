import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { formatFinancialValue } from 'utils/formatters';
import { UserTag } from '../UserTag';
import { Icon } from '../UiKit';
import { calcRem } from '../../utils/styleHelper';

import './WageRecapLine.scss';


/* eslint-disable class-methods-use-this */
class WageRecapLine extends PureComponent {
  static propTypes = {
    gradientTheme: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    wage: PropTypes.number,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    avatarUrl: '',
    onClick: () => { },
  };

  renderAvatar() {
    const { firstname, avatarUrl } = this.props;

    return (
      <UserTag
        name={firstname}
        avatarUrl={avatarUrl}
        avatarPosition="left"
        nameStyle={{ margin: `0 ${calcRem(15)}`, fontSize: calcRem(16) }}
      />
    );
  }

  renderSalary() {
    return (
      <div className="wage-recap-line__salary">
        {formatFinancialValue(this.props.wage)}
      </div>
    );
  }

  renderDetailIcon() {
    return (
      <Icon
        name="dropdown-arrow-right"
        style={{ fontSize: calcRem(7), marginLeft: calcRem(10) }}
      />
    );
  }

  render() {
    return (
      <div
        className={`wage-recap-line ${this.props.gradientTheme}`}
        onClick={this.props.onClick}
      >
        {this.renderAvatar()}
        {this.renderSalary()}
        {this.renderDetailIcon()}
      </div>
    );
  }
}
/* eslint-enable class-methods-use-this */

export default WageRecapLine;
