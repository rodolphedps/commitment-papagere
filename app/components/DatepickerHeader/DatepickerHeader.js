import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'rmc-date-picker';
import dateFnsFRLocale from 'date-fns/locale/fr';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once

import { parse, format, addYears } from 'utils/date';
import { COLORS } from '../../constants/colors';

import './DatepickerHeader.scss';


export class DatepickerHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    selected: PropTypes.any,
    opened: PropTypes.bool.isRequired,
    displayMode: PropTypes.oneOf(['years', 'days']),
    onSelect: PropTypes.func.isRequired,
    onHeaderClick: PropTypes.func.isRequired,
    rightPanel: PropTypes.node,
    subHeader: PropTypes.node,
  };

  static defaultProps = {
    selected: new Date(),
    displayMode: 'days',
  };

  renderDaysCalendar() {
    return (
      <InfiniteCalendar
        displayOptions={{
          overscanMonthCount: 1,
          shouldHeaderAnimate: false,
          showHeader: false,
          showMonthsForYears: false,
        }}
        width="100%"
        selected={this.props.selected}
        onSelect={this.props.onSelect}
        locale={{
          locale: dateFnsFRLocale,
          weekStartsOn: 1,
          weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
          blank: 'Aucune date selectionnée',
          todayLabel: {
            long: 'Aujourd\'hui',
            short: 'Auj.'
          }
        }}
        display={this.props.displayMode}
        theme={{
          selectionColor: COLORS.RED2,
          textColor: {
            default: '#333',
            active: '#FFF'
          },
          weekdayColor: COLORS.RED2,
          floatingNav: {
            background: '#d64d52',
            color: '#FFF',
            chevron: '#FFA726'
          }
        }}
      />
    );
  }

  renderYearsCalendar() {
    return (
      <DatePicker
        mode="year"
        date={this.props.selected}
        minDate={parse('2018', 'yyyy')}
        maxDate={addYears(new Date(), 1)}
        onDateChange={(year) => this.props.onSelect(year)}
      />
    );
  }

  render() {
    const {
      onHeaderClick,
      selected,
      displayMode,
      opened,
      rightPanel
    } = this.props;

    return (
      <div className="datepicker-header-container">
        <div className="datepicker-header-container__header">
          <div
            className="left-container"
            onClick={onHeaderClick}
          >
            <span className="date">{format(selected, displayMode === 'days' ? 'MMM yyyy' : 'yyyy')}</span>
            <span className="picker-arrow">{opened ? '▾' : '▸'}</span>
          </div>
          {!!rightPanel &&
            <div className="right-container">
              {rightPanel}
            </div>
          }
          <div className="overlay" style={{ visibility: opened ? 'visible' : 'hidden' }}>
            {displayMode === 'days' && this.renderDaysCalendar()}
            {displayMode === 'years' && this.renderYearsCalendar()}
          </div>
        </div>
        {this.props.subHeader}
      </div>
    );
  }
}
