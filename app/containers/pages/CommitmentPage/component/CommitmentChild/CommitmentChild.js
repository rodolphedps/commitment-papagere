import React, { Component, Fragment, PureComponent } from 'react';
import { Button, ActionBar, Header, TitledCard, Toggle, ListCard } from 'components/UiKit';
import { calcRem } from 'utils/styleHelper';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Feature } from '@paralleldrive/react-feature-toggles';
import { GradientPageLayout } from '../../../../../components/PageLayout';

import { COLORS } from '../../../../../constants/colors';
import { roboto } from '../../../../../constants/font-families';

import {
    fromJS,
} from 'immutable';

import './CommitmentChild.scss'

const goBackStyle = {
    width: calcRem(35),
    height: calcRem(35),
    fontSize: 13,
};

const addWeekStyle = {
    width: calcRem(20),
    height: calcRem(20),
    fontSize: 10,
};

const openScheduleStyle = {
    width: calcRem(20),
    height: calcRem(20),
    fontSize: 13,
};

class CommitmentChild extends PureComponent {

    state = {
        child_weeks: this.props.child.get('childVacation'),
        nanny_weeks: this.props.child.get('nannyVacation'),
        total_weeks: 5,
        weekDuration: 0.0,
        weekOccurences: this.divideOccurWeeks(),
        complete: true,
        is_complete: null,
    };

    constructor(props) {
        super(props);

        this.addWeekChild = this.addWeekChild.bind(this)
        this.deleteWeekChild = this.deleteWeekChild.bind(this)
        this.addWeekNanny = this.addWeekNanny.bind(this)
        this.deleteWeekNanny = this.deleteWeekNanny.bind(this)
    }

    renderFormatHour(hour) {
        var nb_mins = hour * 60;
        var nb_hours = Math.floor(hour);
        var stock_mins = nb_mins - (nb_hours * 60);
        return nb_hours.toString().concat("h", stock_mins.toFixed())
    }

    renderWeeksSummary() {
        const {
            child
        } = this.props;
        if (child.get('schedule').size == 0) {
            return <a>Aucune semaine type</a>
        } else if (child.get('schedule').size == 1){
            this.setState({weekDuration: child.getIn(['schedule', 0, 'weekDuration'])});
            return <a>{child.getIn(['schedule', 0, 'weekDuration'])} h / mois</a>;
        } else {
            var tab = this.state.weekOccurences.slice();
            var stock = [];
            var i = 0;
            child.get('schedule').map(([key, schedule]) => {
                stock.push((this.state.weekOccurences[i] * child.getIn(['schedule', i, 'weekDuration'])) / 12);
                i++;
            });
            var sum = stock.reduce((a, b) => a + b, 0);
            this.setState({weekDuration: sum});
            return <a>{this.renderFormatHour(sum)} / mois</a>
        }
    }

    renderSummary() {
        const title = "Semaines de garde";
        if (this.state.complete == true) {
            this.state.is_complete = "complète";
        }
        if (this.state.child_weeks > 0 || this.state.nanny_weeks > 5) {
            this.state.is_complete = "incomplète";
        }
        this.state.total_weeks = this.state.child_weeks + this.state.nanny_weeks;
        return (
            <div className="summary">
                <div className="summary-card">
                    <TitledCard
                        className="title-infos"
                        title={title}
                    >
                        <div className="host-weeks">
                            {this.renderWeeks()}
                            {this.renderAddWeek()}
                        </div>
                    </TitledCard>
                </div>
            </div>
        )
    }

    manageClickWeeks = () => {
        const {
            child,
        } = this.props;
        const tab = child.get('schedule');
        var index = 0;
        index = tab.size + 1;
        this.props.addData({
            childVacation: this.state.child_weeks,
            nannyVacation: this.state.nanny_weeks,
        }, this.props.child.get('id'));
        this.props.openSchedulePage(this.props.match.params.id, index);
    }

    renderAddWeek() {
        return (
            <div className="btn-add-type">
                <Button
                    text="+"
                    style={addWeekStyle}
                    onClick={this.manageClickWeeks}
                />
                <a className="str-type">Ajouter une semaine</a>
            </div>
        )
    }

    divideOccurWeeks() {
        const {
            child,
        } = this.props;
        var final = 0;
        var tab = [];
        if (child != null) {
            if (child.get('occurrences').toJS().slice(-1).pop() != null && child.get('schedule').size != 0) {
                const occur = child.get('occurrences').toJS().slice(-1).pop();
                const size_schedule = child.get('schedule').size;
                if (occur.size != 0 && occur.length == size_schedule) {
                    tab = child.get('occurrences').toJS().slice(-1).pop();
                    return tab;
                }
            }
            const childV = child.get('childVacation');
            const nannyV = child.get('nannyVacation');
            const schedules = child.get('schedule');
            const total_size = schedules.size;
            const sum_nanny = nannyV - 5;
            schedules.map(([key]) => (
                final = 47 - childV,
                final = final / total_size,
                tab.push(parseInt(final))
            ));
            var sum = tab.reduce((a, b) => a + b, 0);
            const total = 47 - childV - sum_nanny;
            if (sum != total) {
                var stock = total - sum;
                tab[0] = tab[0] + stock;
            }
            return tab;
        }
    }

    addWeekOccurrence(key) {
        if (this.state.weekOccurences[key] == ((52 - this.state.child_weeks - this.state.nanny_weeks))) {
            return
        }
        const newOccurency = [...this.state.weekOccurences];
        newOccurency[key] = this.state.weekOccurences[key] + 1;
        var sum = newOccurency.reduce((a,b) => a + b, 0);
        const total = 47 - this.state.child_weeks;
        var stock = stock = sum - total;
        if (sum != total) {
            if (key ==  0) {
                newOccurency[1] = newOccurency[1] - stock;
            } else if (key > 0) {
                newOccurency[0] = newOccurency[0] - stock;
            }
        }
        this.setState({weekOccurences: newOccurency});
        return newOccurency;
    }

    deleteWeekOccurrence(key) {
        if (this.state.weekOccurences[key] == ((52 - this.state.cheventild_weeks - this.state.nanny_weeks)) || this.state.weekOccurences[key] == 1) {
            return;
        }
        const newOccurency = [...this.state.weekOccurences];
        newOccurency[key] = this.state.weekOccurences[key] - 1;
        var sum = newOccurency.reduce((a,b) => a + b, 0);
        const total = 47 - this.state.child_weeks;
        var stock = stock = total - sum;;
        if (sum != total) {
            if (key == 0) {
                newOccurency[1] = newOccurency[1] + stock;
            } else if (key > 0) {
                newOccurency[0] = newOccurency[0] + stock;
            }
        }
        this.setState({weekOccurences: newOccurency});
        return newOccurency;
    }

    handleEditorOpening = (key, child) => {
        const {
            openScheduleEditor,
        } = this.props;

        this.props.addData({
            childVacation: this.state.child_weeks,
            nannyVacation: this.state.nanny_weeks,
        }, child.get('id'));
        this.props.addWeekOccurrences(this.state.weekOccurences[key], child.get('id'), key);
        openScheduleEditor(child.get('id'), (key + 1));
    }

    renderWeeks() {
        const {
            openScheduleEditor,
            child,
        } = this.props;

        if (child != null) {
            return child.get('schedule')
                .entrySeq()
                .map(([key]) => (
                    <div className="week-type-info" key={key}>
                        <div className="btn-occur">
                            <Button
                                text="-"
                                style={addWeekStyle}
                                onClick={() => this.deleteWeekOccurrence(key)}
                            />
                            <a className="str-week">{this.state.weekOccurences[key]} sem / an</a>
                            <Button
                                text="+"
                                style={addWeekStyle}
                                onClick={() => this.addWeekOccurrence(key)}
                            />
                        </div>
                        <a>{child.getIn(['schedule', key, 'weekDuration'])}h/sem</a>
                        <div className="arrow-schedule">
                            <Button
                                icon="right-arrow"
                                style={{
                                    background: "none",
                                    color: COLORS.BLUE,
                                }}
                                onClick={() => this.handleEditorOpening(key, child)}
                            />
                        </div>
                    </div>
                ))
        }
    }

    addWeekChild() {
        this.setState({child_weeks: this.state.child_weeks + 1});
    }

    deleteWeekChild() {
        if (this.state.child_weeks > 0) {
            this.setState({child_weeks: this.state.child_weeks - 1})
        }
    }

    addWeekNanny() {
        this.setState({nanny_weeks: this.state.nanny_weeks + 1})
    }

    deleteWeekNanny() {
        if (this.state.nanny_weeks > 5) {
            this.setState({nanny_weeks: this.state.nanny_weeks - 1})
        }
    }

    handleClick = () => {
        this.props.addData({
            childVacation: this.state.child_weeks,
            nannyVacation: this.state.nanny_weeks,
            weekDuration: this.state.weekDuration
        }, this.props.child.get('id'));
        if (this.props.child.get('schedule').size != 0) {
            this.props.updateOccurrences(this.state.weekOccurences, this.props.child.get('id'));
        }
        this.props.goBack();
    }

    handleRemove = () => {
        this.props.deleteChild(this.props.child.get('id'));
        this.props.goBack();
    }

    renderActionBar() {
        return (
            <div className="btn-validate">
                <ActionBar className="action-bar">
                    <Button
                        text="Supprimer"
                        icon="remove"
                        style={{
                            background: COLORS.RED1,
                            width: calcRem(120),
                        }}
                        onClick={this.handleRemove}
                    />
                    <Button
                        text="Valider"
                        icon="check"
                        style={{
                            background: COLORS.GREEN1,
                            width: calcRem(120),
                        }}
                        onClick={this.handleClick}
                    />
                </ActionBar>
            </div>
        )
    }

    renderInfosWeeks() {
        var total_weeks = this.state.child_weeks + this.state.nanny_weeks;
        return (
            <div>
                <div className="total-weeks">
                    <a>Il y a {52 - total_weeks} semaines d'accueil sur 52.</a>
                </div>
                <div className="complete">
                    <a>47 semaines d'accueil : année complète, les congés sont inclus dans la mensualité</a>
                </div>
                <div className="incomplete">
                    <a>{"< "}47 semaines d'accueil : année incomplète, les congés sont à payer en plus du salaire mensuel</a>
                </div>
            </div>
        )
    }

    renderMonthRate () {
        return (
            <div className="hour-value-bar">
                <a className="str-month">Horaire mensualisé</a>
                <div className="month-right">{this.renderWeeksSummary()}</div>
            </div>
        )
    }

    renderContent() {
        const {
            goBack,
            addData,
            openSchedulePage,
            child
        } = this.props;
        if (child == null) {
            return null;
        }
        const title = "Semaines sans accueil";
        const tmp_data = [0, 5];
        if (this.state.child_weeks == null) {
            this.state.child_weeks = tmp_data[0];
        }
        if (this.state.nanny_weeks == null) {
            this.state.nanny_weeks = tmp_data[1];
        }
        return (
            <div className="infos-content">
                <div className="schedule-infos">
                    <TitledCard
                        className="title-infos"
                        title={title}
                    >
                    <div className="content-card">
                        <div className="child-vacation">
                            <div className="btn-weeks">
                                <Button
                                    text="-"
                                    style={addWeekStyle}
                                    onClick={this.deleteWeekChild}
                                />
                                <a className="str-week">{this.state.child_weeks} sem. / an</a>
                                <Button
                                    text="+"
                                    style={addWeekStyle}
                                    onClick={this.addWeekChild}
                                />
                            </div>
                            <a className="child-str">Congés Enfant</a>
                        </div>
                        <div className="nanny-vacation">
                            <div className="btn-weeks">
                                <Button
                                    text="-"
                                    style={addWeekStyle}
                                    onClick={this.deleteWeekNanny}
                                />
                                <a className="str-week">{this.state.nanny_weeks} sem. / an</a>
                                <Button
                                    text="+"
                                    style={addWeekStyle}
                                    onClick={this.addWeekNanny}
                                />
                            </div>
                            <a className="nanny-str">Congés Assmat</a>
                        </div>
                        {this.renderInfosWeeks()}
                    </div>
                    </TitledCard>
                </div>
                <div>
                    {this.renderSummary()}
                </div>
                <div>
                    {this.renderMonthRate()}
                </div>
            </div>
        )
    }

    renderHeader() {
        const title = "Planning accueil " + this.props.child.get('firstName');
        return (
            <Header
                title={title}
            />
        )
    }

    render() {
        if (this.props.child) {
            return (
                <GradientPageLayout
                    header={this.renderHeader()}
                    content={this.renderContent()}
                    footer={this.renderActionBar()}
                />
            )
        }
        return null
    }
}

CommitmentChild.propTypes = {
    child: ImmutablePropTypes.map.isRequired,
    goBack: PropTypes.func.isRequired,
    addData: PropTypes.func.isRequired,
    openScheduleEditor: PropTypes.func.isRequired,
    openSchedulePage: PropTypes.func.isRequired,
    deleteChild: PropTypes.func.isRequired,
    addWeekOccurrences: PropTypes.func.isRequired,
    updateOccurrences: PropTypes.func.isRequired,
}

export default CommitmentChild;