import React from 'react';
import PropTypes from 'prop-types';

import TimeRangePicker from '../TimeRangePicker';
import Toggle from '../Toggle';


class DisableableTimeRangePicker extends React.PureComponent {
  static propTypes = {
    ...TimeRangePicker.propTypes,
    disabled: PropTypes.bool,
    onDisableClick: PropTypes.func,
  };

  static defaultProps = {
    ...TimeRangePicker.defaultProps,
    disabled: false,
    onDisableClick: () => { }
  };

  handleDisabledClick = () => {
    const { onDisableClick } = this.props;

    if (onDisableClick) {
      onDisableClick(!this.props.disabled);
    }
  }

  renderDisableToggle() {
    return (
      <div className="disableable-time-range-picker__toggle">
        <Toggle
          checked={!this.props.disabled}
          readOnly={this.props.readOnly}
          onChange={this.handleDisabledClick}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="disableable-time-range-picker">
        <div className="disableable-time-range-picker__time-picker">
          <TimeRangePicker
            {...this.props}
            action={this.renderDisableToggle()}
          />
        </div>
      </div>
    );
  }
}

export default DisableableTimeRangePicker;
