import React, { Fragment, PureComponent } from 'react';
import { Button, ActionBar, ListCard } from 'components/UiKit';
import { calcRem } from 'utils/styleHelper';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { GradientPageLayout } from '../../../../../components/PageLayout';
import { TimeRangePicker, Icon } from 'components/UiKit';

import { COLORS } from '../../../../../constants/colors';

import './CommitmentSchedule.scss'
import { secureFormatTime } from 'utils/timeHelper';
import classNames from 'classnames';

const goBackStyle = {
    width: calcRem(35),
    height: calcRem(35),
    fontSize: 13,
};

const arrowStyle = {
    width: calcRem(22),
    height: calcRem(24),
    fontSize: 17,
}

class CommitmentSchedule extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            weekDuration: 0.0,
            weekOccurency: 0,
            days: [
                {id: 1, name: "LUN.", time: []},
                {id: 2, name: "MAR.", time: []},
                {id: 3, name: "MER.", time: []},
                {id: 4, name: "JEU.", time: []},
                {id: 5, name: "VEN.", time: []},
                {id: 6, name: "SAM.", time: []},
                {id: 7, name: "DIM.", time: []},
            ]
        };
        this.handleDayScheduleChange = this.handleDayScheduleChange.bind(this);
    }

    handleClick = () => {
        var tab = [];
        this.props.addSchedule({
            days: this.state.days,
            weekOccurency: 0,
            weekDuration: this.state.weekDuration
        }, this.props.match.params.id);
        this.props.goBack();
    }

    divideOccurWeeks() {
        const {
            child,
        } = this.props;
        var final = 0;
        var tab = [];
        const childV = child.get('childVacation');
        const schedules = child.get('schedule');
        const total_size = schedules.size + 1;
        schedules.map(([key]) => (
            final = 47 - childV,
            final = final / total_size,
            tab.push(parseInt(final))
        ))
        return tab;
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
            occur,
            child
        } = this.props;

        if (occur == null) {
            this.state.weekOccurency = 0;
        };

        return (
            <div className="schedule-summary__occurrences">
              <div className="schedule-summary__value">
                {Math.floor(((52 - child.get('childVacation') - child.get('nannyVacation')) / (child.get('schedule').size + 1)))}
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
        var test = [];

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
            openScheduleEditor,
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

CommitmentSchedule.propTypes = {
    goBack: PropTypes.func.isRequired,
    openScheduleEditor: PropTypes.func.isRequired,
    addSchedule: PropTypes.func.isRequired,
    addData: PropTypes.func.isRequired,
    child: ImmutablePropTypes.map.isRequired,
}

export default CommitmentSchedule;
