import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'rmc-date-picker';
import PopPicker from 'rmc-date-picker/lib/Popup';

import { parse, format, formatDateWithDay } from 'utils/date';


export default class DateTimePicker extends PureComponent {
  static propTypes = {
    dateTime: PropTypes.instanceOf(Date).isRequired,
    timeStep: PropTypes.number,
    mode: PropTypes.oneOf(['time', 'date']),
    disabled: PropTypes.bool,
    valueStyle: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    timeStep: 5,
    mode: 'datetime',
    disabled: false,
    onChange: () => { },
  }

  formatMonth(month) {
    return format(parse(month + 1, 'M'), 'MMM');
  }

  renderEditablePicker() {
    const {
      dateTime,
      timeStep,
      mode,
      onChange,
    } = this.props;

    const datePicker = (
      <DatePicker
        rootNativeProps={{ 'data-xx': 'yy' }}
        mode={mode}
        date={dateTime}
        minuteStep={timeStep}
        formatMonth={this.formatMonth}
      />
    );

    return (
      <PopPicker
        datePicker={datePicker}
        transitionName="rmc-picker-popup-slide-fade"
        maskTransitionName="rmc-picker-popup-fade"
        date={dateTime}
        onChange={(date) => onChange(date)}
        okText="Valider"
        dismissText="Fermer"
        style={{ touchAction: 'none' }}
      >
        {this.renderPickerValue()}
      </PopPicker>
    );
  }

  renderPickerValue() {
    const {
      dateTime,
      mode,
      valueStyle,
    } = this.props;

    return (
      <div style={valueStyle}>
        {mode === 'time' ? format(dateTime, 'HH:mm') : formatDateWithDay(dateTime)}
      </div>
    );
  }

  render() {
    const {
      disabled,
    } = this.props;

    if (!disabled) {
      return this.renderEditablePicker();
    }

    return this.renderPickerValue();
  }
}
