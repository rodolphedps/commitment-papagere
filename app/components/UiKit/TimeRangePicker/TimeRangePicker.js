import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TimePicker from '../TimePicker';
import { TRANSLATIONS } from '../../../translations';

import './TimeRangePicker.scss';

const TimeRangeValue = PropTypes.shape({
  time: PropTypes.string.isRequired,
  invalidated: PropTypes.bool,
  invalidatedLabel: PropTypes.string,
});

const timeRangeType = PropTypes.shape({
  begin: TimeRangeValue.isRequired,
  end: TimeRangeValue.isRequired,
});

class TimeRangePicker extends React.PureComponent {
  static isBoundValid(bound) {
    return bound === 'begin' || bound === 'end';
  }

  static propTypes = {
    timeRange: timeRangeType.isRequired,
    step: TimePicker.propTypes.step,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    onRangeChange: PropTypes.func,
    action: PropTypes.node,
    onActionClick: PropTypes.func,
  };

  static defaultProps = {
    step: TimePicker.defaultProps.step,
    readOnly: false,
    disabled: false,
    onRangeChange: () => { },
    action: null,
    onActionClick: () => { },
  };

  handleTimeChange = (bound, time) => {
    let newRange = null;

    if (bound === 'begin') {
      newRange = {
        begin: time,
        end: this.props.timeRange.end.time,
      };
    } else if (bound === 'end') {
      newRange = {
        begin: this.props.timeRange.begin.time,
        end: time,
      };
    } else {
      return;
    }

    this.props.onRangeChange(newRange);
  }

  buildTimePicker(bound, value) {
    let invalidatedLabel = null;

    if (value.invalidated && value.invalidatedLabel) {
      invalidatedLabel = (
        <div className="time-range-picker__picker-container__invalid-label">
          {value.invalidatedLabel}
        </div>
      );
    }

    return (
      <div className="time-range-picker__picker-container">
        <TimePicker
          time={value.time}
          onTimeChange={(time) => this.handleTimeChange(bound, time)}
          step={this.props.step}
          invalidated={value.invalidated}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
        />
        {invalidatedLabel}
      </div>
    );
  }

  renderAction() {
    const { action, onActionClick } = this.props;

    if (!action) {
      return null;
    }

    return (
      <div className="time-range-picker__action-container">
        <div onClick={onActionClick}>
          {action}
        </div>
      </div>
    );
  }

  render() {
    const { begin, end } = this.props.timeRange;
    const { from, to } = TRANSLATIONS.components.time_range_picker;

    const timeRangePickerClasses = classNames(
      'time-range-picker',
      { 'time-range-picker__disabled': this.props.disabled },
    );

    return (
      <div className={timeRangePickerClasses}>
        <div className="time-range-picker__label">
          {from}
        </div>
        {this.buildTimePicker('begin', begin)}
        <div className="time-range-picker__label">
          {to}
        </div>
        {this.buildTimePicker('end', end)}
        {this.renderAction()}
      </div>
    );
  }
}

export default TimeRangePicker;
