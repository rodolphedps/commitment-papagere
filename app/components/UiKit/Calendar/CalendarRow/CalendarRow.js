import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'utils/date';

import './CalendarRow.scss';


const CalendarRow = ({ date, children }) => (
  <div id={format(date, 'D')} className="calendar-row">
    <div className="calendar-row__date-container">
      <div className="calendar-row__date-container__numeric-date">
        {format(date, 'd')}
      </div>
      <div className="calendar-row__date-container__letters-date">
        {format(date, 'iii')}
      </div>
    </div>
    <div className="calendar-row__child-container">
      {children}
    </div>
  </div>
);

CalendarRow.propTypes = {
  date: PropTypes.instanceOf(Date),
  children: PropTypes.node,
};

export default CalendarRow;
