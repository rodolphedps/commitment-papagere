import React, { Component, Fragment, PureComponent } from 'react';
import { Button, ActionBar, Header, TitledCard, Toggle, ListCard } from 'components/UiKit';
import { calcRem } from 'utils/styleHelper';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Feature } from '@paralleldrive/react-feature-toggles';
import { GradientPageLayout } from '../../../../../components/PageLayout';
import { CalendarRow, Card } from 'components/UiKit';

import { COLORS } from '../../../../../constants/colors';
import { roboto } from '../../../../../constants/font-families';
import { secureFormatTime } from 'utils/timeHelper';
import classNames from 'classnames';
import { TimeRangePicker, Icon } from 'components/UiKit';

import './CommitmentScheduleEditor.scss'

const goBackStyle = {
    width: calcRem(35),
    height: calcRem(35),
    fontSize: 13,
};

const arrowStyle = {
    width: calcRem(25),
    height: calcRem(25),
    fontSize: 20,
}

class CommitmentScheduleEditor extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            weekDuration: 0.0,
            weekOccurency: this.props.occur,
            days: [
                {id: 1, name: "LUN.", time: this.props.days.getIn([0, 'time']).toJS()},
                {id: 2, name: "MAR.", time: this.props.days.getIn([1, 'time']).toJS()},
                {id: 3, name: "MER.", time: this.props.days.getIn([2, 'time']).toJS()},
                {id: 4, name: "JEU.", time: this.props.days.getIn([3, 'time']).toJS()},
                {id: 5, name: "VEN.", time: this.props.days.getIn([4, 'time']).toJS()},
                {id: 6, name: "SAM.", time: this.props.days.getIn([5, 'time']).toJS()},
                {id: 7, name: "DIM.", time: this.props.days.getIn([6, 'time']).toJS()},
            ]
        };
        this.handleDayScheduleChange = this.handleDayScheduleChange.bind(this);
    }

    handleClick = () => {
        // this.props.addSchedule({
        //     days: this.state.days,
        //     weekOccurency: 0,
        //     weekDuration: this.state.weekDuration
        // }, this.props.match.params.id);
        this.props.updateSchedule(this.state.days, this.props.child.get('id'), this.props.match.params.index - 1);
        this.props.updateDuration(this.state.weekDuration, this.props.child.get('id'), this.props.match.params.index - 1)
        this.props.goBack();
    }

    renderDuration() {
        return (
            <div className="schedule-summary__weekly-hours">
                <div className="schedule-summary__value">
                    {this.state.weekDuration}h
                </div>
            </div>
        )
    }

    renderOccurrences() {
        const {
            occur
        } = this.props;

        if (occur == null) {
            this.state.weekOccurency = 0;
        };

        return (
            <div className="schedule-summary__occurrences">
              <div className="schedule-summary__value">
                {this.state.weekOccurency}
              </div>
              {this.renderOccurrencesText()}
            </div>
          );
    }

    renderOccurrencesText() {
        return (
            <div className="schedule-summary__text">
                <div className="schedule-summary__text1">
                    semaines
                </div>
                <div className="schedule-summary__text2">
                    par an
                </div>
            </div>
        )
    }

    stockInsideHours(day) {
        var stockS = [];
        var stockE = [];
        var tmpS = [];
        var tmpE = [];
        var total_hours_s = 0;
        var total_hours_e = 0;

        day.time.map((time) => (
            tmpS = time.start.split(":"),
            tmpE = time.end.split(":"),
            stockS.push(Number(tmpS[0])),
            stockE.push(Number(tmpE[0]))
        ));
        stockS.map((value) => (
            total_hours_s = total_hours_s + value
        ));
        stockE.map((value) => (
            total_hours_e = total_hours_e + value
        ))
        const dayDuration = total_hours_e - total_hours_s
        return dayDuration
    }

    renderWeekDuration() {
        const tab = [...this.state.days];
        var hours_s = [];
        var hours_e = [];
        var tmpS = [];
        var tmpE = [];
        var total_hours_s = 0;
        var total_hours_e = 0;

        tab.map((day) => (
            day.time.length !== 0 ? tmpS[0] = this.stockInsideHours(day) : tmpS[0] = 0,
            hours_s.push(Number(tmpS[0]))
        ))
        hours_s.map((value) => (
            total_hours_s = total_hours_s + value
        ));
        const weekDuration = total_hours_s;
        this.setState({ weekDuration: weekDuration });

        return (
            <div className={classNames('schedule-summary', { 'schedule-summary--dark': null })}>
                {this.renderOccurrences()}
                {this.renderDuration()}
            </div>
        )
    }

    renderHeader() {
        const {
            goBack,
        } = this.props;

        return (
            <div className="header-schedule">
                <Fragment>
                    {this.renderWeekDuration()}
                </Fragment>
            </div>
        )
    }

    renderRemoveIcon() {
        return (
            <div className="removable-time-range-picker__remove-icon">
                <Icon name="remove"/>
            </div>
        )
    }

    evaluateHours(hour) {
        var str = hour.split(":");
        str[0] = Number(str[0]);
        return str[0];
    }

    transformNegativeHour(hour, compare) {
        var str = hour.split(":");
        var cmp = compare.split(":");
        str[0] = Number(str[0] - (str[0] - cmp[0]) - 1);
        console.log(str[0]);
        str[0] = str[0].toString();
        return str[0].concat(':', str[1]);
    }

    transformHour(hour) {
        var str = hour.split(":");
        str[0] = Number(str[0]) + 1;
        str[0] = str[0].toString();
        return str[0].concat(':', str[1]);
    }

    handleDayScheduleChange(dayIndex, timeRange, timeIndex, time) {
        const newDays = [...this.state.days];
        const oldTime = [...this.state.days[dayIndex].time];
        oldTime[timeIndex] = {
            start: timeRange.begin,
            end: timeRange.end,
        }
        newDays[dayIndex] = {
            ...newDays[dayIndex],
            time: time = [
                ...oldTime
            ]
        };
        if (timeIndex > 0) {
            if (this.evaluateHours(newDays[dayIndex].time[timeIndex - 1].end) >= this.evaluateHours(newDays[dayIndex].time[timeIndex].start)) {
                newDays[dayIndex].time[timeIndex - 1].end = this.transformNegativeHour(newDays[dayIndex].time[timeIndex - 1].end, newDays[dayIndex].time[timeIndex].start);
            }
        }
        this.setState({
            days: newDays
        });
    }

    manageClick(time, index) {
        const newTime = [...this.state.days];
        newTime[index] = {
            ...newTime[index],
            time: time.concat({start: "08:00", end: "18:00"})
        };
        const indexTime = newTime[index].time.length - 1;
        if (newTime[index].time[indexTime - 1] != null) {
            newTime[index].time[indexTime - 1].end = "12:00";
            newTime[index].time[indexTime].start = "13:00";
        }
        if (indexTime > 1) {
            newTime[index].time[indexTime - 1].end = this.transformHour(newTime[index].time[indexTime - 1].start);
            newTime[index].time[indexTime].start = this.transformHour(newTime[index].time[indexTime - 1].end);
        }
        this.setState({
            days: newTime
        });
    }

    removeSchedule(dayIndex, time, timeIndex) {
        const days = [...this.state.days];
        var oldTime = [...this.state.days[dayIndex].time];
        const newTime = oldTime.filter(function(value, index) {
            return index !== timeIndex;
        });
        days[dayIndex] = {
            ...days[dayIndex],
            time: time = [
                ...newTime,
            ]
        };
        this.setState({
            days: days
        });
    }

    renderTimeRangeTab(day, index) {

        if (day.time.length == 0) {
            return (
                <div className="empty-range">
                    <a>Pas d'accueil prévu</a>
                </div>
            )
        }
        return day.time.map((time, key) => (
            <div className="time-range" key={key}>
                <TimeRangePicker
                    timeRange={{
                        begin: {
                            time: secureFormatTime(`${time.start}`),
                        },
                        end: {
                            time: secureFormatTime(`${time.end}`),
                        }
                    }}
                    action={this.renderRemoveIcon()}
                    onActionClick={() => this.removeSchedule(index, time, key)}
                    step={5}
                    onRangeChange={(newTimeRange) => this.handleDayScheduleChange(index, newTimeRange, key, time)}
                />
            </div>
        ))
    }

    renderCalendar() {
        const {
        } = this.props;

        return this.state.days.map((day, index) => (
            <div className="working-hours-bar__working-hours" key={index}>
                    <ListCard
                        theme="detached-gradient"
                        className="day-card"
                    >
                        <a className="test">{day.name}</a>
                        <div className="input-hours">
                            {this.renderTimeRangeTab(day, index)}
                        </div>
                        <div className="btns-time">
                            <Button
                                className="btn-card"
                                text="+"
                                style={arrowStyle}
                                onClick={() => this.manageClick(day.time, index)}
                            />
                        </div>
                    </ListCard>
            </div>
        ))
    }

    renderContent() {
        return (
            <div className="planning-page">
                <div className="planning-page__calendar">
                    {this.renderCalendar()}
                </div>
            </div>
        )
    }

    isClickable() {
        if (this.state.weekDuration == 0) {
            return 1
        }
        return 0
    }

    renderFooter() {
        return (
            <div className="btn-validate">
                <ActionBar className="action-bar">
                    <Button
                        text="Annuler"
                        style={{
                            background: 'none',
                            textDecoration: 'underline',
                            width: calcRem(120),
                        }}
                        onClick={this.props.goBack}
                    />
                    <Button
                        text="Valider"
                        icon="check"
                        style={{
                            background: COLORS.GREEN1,
                            width: calcRem(120),
                        }}
                        disabled={this.isClickable() == 1 ? true : false}
                        onClick={this.handleClick}
                    />
                </ActionBar>
            </div>
        )
    }

    render() {
        return (
            <GradientPageLayout
                header={this.renderHeader()}
                content={this.renderContent()}
                footer={this.renderFooter()}
            />
        )
    }
}

CommitmentScheduleEditor.propTypes = {
    goBack: PropTypes.func.isRequired,
    child: ImmutablePropTypes.map.isRequired,
    days: ImmutablePropTypes.list.isRequired,
    occur: PropTypes.number.isRequired,
    updateSchedule: PropTypes.func.isRequired,
    updateDuration: PropTypes.func.isRequired,
}

export default CommitmentScheduleEditor;