import React, { Component, Fragment, PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Feature } from '@paralleldrive/react-feature-toggles';

import { Button, ListCard, Header, DateTimePicker, NumberInput, TitledCard } from 'components/UiKit';
import { getColorThemeBackground, calcRem } from 'utils/styleHelper';
import { ChildrenList } from './component';
import { loginButtonEnabledSelector } from '../LoginPage/selectors';
import { COLORS } from '../../../constants/colors';

import './CommitmentPage.scss';

// const backButtonStyle = {
//     width: calcRem(50),
//     height: calcRem(30),
//     fontSize: 11,
// };

const addChildStyle = {
    width: calcRem(25),
    height: calcRem(25),
    fontSize: 25,
}

const hourlyRateStyle = {
    width: calcRem(25),
    height: calcRem(25),
    fontSize: 20,
}

// const inputValueStyle = {
//     color: COLORS.PURPLE,
//     fontWeight: roboto.medium,
// };

class CommitmentPage extends PureComponent {

    state = {
        start: this.isNotNull(),
    };

    constructor(props) {
        super(props);

        this.updateDate = this.updateDate.bind(this);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        //this.myRef.current.value = this.props.startAt;
    }

    isNotNull() {
        if (this.props.startAt != "DD-MM-YYYY") {
            var date = new Date();
            var stock = this.props.startAt.split("-");
            date.setFullYear(stock[0]);
            date.setMonth(stock[1]);
            date.setDate(stock[2]);
            return date;
        } else {
            return new Date;
        }
    }

    openChild = (child) => {
        var date = this.state.start.getFullYear() + '-' + this.state.start.getMonth() + '-' + this.state.start.getDate()
        this.props.addStartDate(date);
        this.props.openChildInfos(child.get('id'));
    }

    renderFormatHour(child) {
        if (child.get('weekDuration')) {
            var hour = child.get('weekDuration');
            var nb_mins = hour * 60;
            var nb_hours = Math.floor(hour);
            var stock_mins = nb_mins - (nb_hours * 60);
            if (stock_mins == 0) {
                return nb_hours.toString().concat("h", "00");
            } else {
                return nb_hours.toString().concat("h", stock_mins.toFixed())
            }
        } else {
            return "0h";
        }
    }

    renderChildren() {
        const {
            childcare,
            openChildInfos,
            deleteChild,
        } = this.props;

        // if (childcare.isEmpty()) {
        //     return (
        //         <div className="no-child">
        //             Aucun enfant ajouté
        //         </div>
        //     )
        // }

        const zero = "0";
        return childcare
            .entrySeq()
            .map(([key, child]) => (
                <div className="child-card" key={key}>
                    <div className="content-child-card">
                        <a>{child.get('firstName')}</a>
                    </div>
                    <div className="week-duration-child">
                        <a>{this.renderFormatHour(child)} / mois</a>
                    </div>
                    <div className="btn-child-card">
                        <Button
                            icon="dropdown-arrow-right"
                            style={{
                                width: calcRem(25),
                                height: calcRem(25),
                                background: 'none',
                                color: COLORS.BLUE
                            }}
                            onClick={() => this.openChild(child)}
                        />
                    </div>
                </div>
            ))
    }

    isClickable() {
        if (this.props.childcare.size == 0 || !this.props.hourlyRateNet) {
            return 1
        }
        return 0
    }

    renderCreateCommitment () {
        const {
            openCommitmentCreation,
        } = this.props;

        return (
            <div className="navigation-bar">
                <div className="str-nav">
                    Créer Engagement Réciproque
                </div>
                <div className="btn-creation">
                    <Button
                        text=">"
                        style={hourlyRateStyle}
                        disabled={this.isClickable() == 1 ? true : false}
                        onClick={openCommitmentCreation}
                    />
                </div>
            </div>
        )
    }

    calculateMonthrate() {
        const {
            childcare,
            hourlyRateNet
        } = this.props;
        if (childcare.size == 0 || !hourlyRateNet) {
            return
        }
        var tab = childcare.toJS();
        var stock = 0;
        tab.map((key) => (
            key.weekDuration !== null ? stock += key.weekDuration : stock += 0
        ))

        return ((stock) * hourlyRateNet).toFixed(2)
    }

    renderMonthRate () {
        return (
            <div className="month-value-bar">
                <a className="str-month">Votre Mensualité</a>
                <a className="month-right">{this.calculateMonthrate()} € / Mois</a>
            </div>
        )
    }

    renderHourlyRate () {
        const {
            hourlyRateNet,
            openHourlyRatePage,
            hourlyRateGross
        } = this.props;

        return (
            <div className="hourly-rate">
                <ListCard className="hr-list" theme="detached-gradient">
                    <div className="hr-txt">Taux horaire</div>
                    <div className="value">{hourlyRateNet} € net / {hourlyRateGross.toFixed(2)} € brut</div>
                    <Button
                        icon="dropdown-arrow-right"
                        style={{
                            width: calcRem(25),
                            height: calcRem(25),
                            background: 'none',
                            color: COLORS.BLUE
                        }}
                        onClick={openHourlyRatePage}
                    />
                </ListCard>
            </div>
        )
    }

    updateDate(newDate) {
        var date = this.state.start;
        date = newDate;
        this.setState({start: date});
    }

    renderStartContract() {
        return (
            <div className="start-div">
                <ListCard className="start-list" theme="detached-gradient">
                    <a>Début du contrat</a>
                    <div className="date">
                        <DateTimePicker
                            dateTime={this.state.start}
                            mode="date"
                            onChange={(newDate) => this.updateDate(newDate)}
                        />
                    </div>
                </ListCard>
            </div>
        )
    }

    stockGrossHourlyRate() {
        if (this.props.grossHR == 0.0) {
            this.props.getGrossHourlyRate();
            return;
        } else {
            return;
        }
    }

    renderChildrenCard() {
        return (
            <div>
                <TitledCard
                    title="Enfants"
                    className="titlted-card-children"
                >
                    {this.renderChildren()}
                    <div className="add-child-btn">
                        <a className="str-btn">Ajouter un enfant</a>
                        <div className="btn-add">
                            <Button
                                text="+"
                                style={addChildStyle}
                                onClick={this.props.openNewChildPage}
                            />
                        </div>
                    </div>
                </TitledCard>
            </div>
        )
    }

    render() {
        const title = "Calcul Mensualité";

        const {
            childcare,
            addChildStore,
            openNewChildPage
        } = this.props;

        this.stockGrossHourlyRate();
        return (
            <div>
                <Header title={title}/>
                <div className="commitment-page">
                    <div className="add-child">
                        {this.renderChildrenCard()}
                    </div>
                    {this.renderMonthRate()}
                    {this.renderCreateCommitment()}
                    {this.renderStartContract()}
                    {this.renderHourlyRate()}
                </div>
            </div>
        );
    }
}

CommitmentPage.propTypes = {
    childcare: ImmutablePropTypes.list.isRequired,
    startAt: PropTypes.string.isRequired,
    hourlyRateNet: PropTypes.number.isRequired,
    hourlyRateGross: PropTypes.number.isRequired,
    addChildStore: PropTypes.func.isRequired,
    openHourlyRatePage: PropTypes.func.isRequired,
    openNewChildPage: PropTypes.func.isRequired,
    openChildInfos: PropTypes.func.isRequired,
    openCommitmentCreation: PropTypes.func.isRequired,
    addStartDate: PropTypes.func.isRequired,
    grossHR: PropTypes.number.isRequired,
    getGrossHourlyRate: PropTypes.func.isRequired,
}

export default CommitmentPage;