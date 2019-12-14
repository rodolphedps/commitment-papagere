import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DatePicker from 'rmc-date-picker';
import PopPicker from 'rmc-date-picker/lib/Popup';

import { parse, format } from 'utils/date';

import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';
import './TimePicker.scss';


class TimePicker extends React.PureComponent {
  static defaultProps = {
    step: 1,
    invalidated: false,
    disabled: false,
    readOnly: false,
    onTimeChange: () => { },
  }

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  handleChange = (newTime) => {
    const { onTimeChange } = this.props;

    if (onTimeChange) {
      onTimeChange(format(newTime, 'HH:mm'));
    }
  }

  render() {
    const {
      invalidated,
      readOnly,
      disabled,
      time,
      step
    } = this.props;

    const timePickerClasses = classNames(
      'time-picker',
      { 'time-picker__invalidated': invalidated && !disabled },
      { 'time-picker__disabled': disabled },
    );

    const selectedDate = parse(time, 'HH:mm');

    const datePicker = (
      <DatePicker
        rootNativeProps={{ 'data-xx': 'yy' }}
        mode="time"
        defaultDate={selectedDate}
        date={selectedDate}
        minuteStep={step}

      />
    );

    return (
      <PopPicker
        datePicker={datePicker}
        transitionName="rmc-picker-popup-slide-fade"
        maskTransitionName="rmc-picker-popup-fade"
        date={selectedDate}
        onChange={this.handleChange}
        okText="Valider"
        dismissText="Fermer"
        disabled={disabled || readOnly}
      >
        <div className={timePickerClasses}>
          {time}
        </div>
      </PopPicker>
    );
  }
}

TimePicker.propTypes = {
  time: PropTypes.string.isRequired,
  invalidated: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  step: PropTypes.number,
  onTimeChange: PropTypes.func,
};

export default TimePicker;
