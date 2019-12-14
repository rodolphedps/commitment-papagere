import React, { Component, Fragment, PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Feature } from '@paralleldrive/react-feature-toggles';

import { Button, TitledCard, ListCard, Header, NumberInput, ActionBar } from 'components/UiKit';
import { getColorThemeBackground, calcRem } from 'utils/styleHelper';
import { COLORS } from '../../../../../constants/colors';
import { TimeRangePicker, Icon } from 'components/UiKit';
import { secureFormatTime } from 'utils/timeHelper';
import { GradientPageLayout } from '../../../../../components/PageLayout';

import './CommitmentCreation.scss';

const goBackStyle = {
    width: calcRem(35),
    height: calcRem(35),
    fontSize: 13,
};

class CommitmentCreation extends PureComponent {

    state = {
        firstNameParent: null,
        lastNameParent: null,
        mailParent: null,
        firstNameNanny: null,
        lastNameNanny: null,
        mailNanny: null,
        start: "08:00",
        end: "18:00",
        eveningHour: 0,
        maintenanceFee: 0.0,
        startAt: null,
    };

    constructor(props) {
        super(props);

        //functions binding
        this.updateFirstNameParent = this.updateFirstNameParent.bind(this);
        this.updateLastNameParent = this.updateLastNameParent.bind(this);
        this.updateMailParent = this.updateMailParent.bind(this);
        this.updateFirstNameNanny = this.updateFirstNameNanny.bind(this);
        this.updateLastNameNanny = this.updateLastNameNanny.bind(this);
        this.updateMailNanny = this.updateMailNanny.bind(this);
        this.updateMaintenanceFee = this.updateMaintenanceFee.bind(this);
        this.updateDate = this.updateDate.bind(this);

        //References for parent inputs
        this.parentFRef = React.createRef();
        this.parentNRef = React.createRef();
        this.parentERef = React.createRef();

        //References for nanny inputs
        this.nannyFRef = React.createRef();
        this.nannyNRef = React.createRef();
        this.nannyERef = React.createRef();
    }

    componentDidMount() {
        //Loading parent informations if existing
        if (this.props.parent.size != 0) {
            if (this.props.parent.toJS().slice(-1).pop().firstName != null) {
                this.parentFRef.current.value = this.props.parent.toJS().slice(-1).pop().firstName;
                this.setState({firstNameParent: this.parentFRef.current.value})
            }
            if (this.props.parent.toJS().slice(-1).pop().lastName != null) {
                this.parentNRef.current.value = this.props.parent.toJS().slice(-1).pop().lastName;
                this.setState({lastNameParent: this.parentNRef.current.value})
            }
            if (this.props.parent.toJS().slice(-1).pop().email != null) {
                this.parentERef.current.value = this.props.parent.toJS().slice(-1).pop().email;
                this.setState({mailParent: this.parentERef.current.value})
            }
        }
        //Loading nanny informations if existing
        if (this.props.nanny.size != 0) {
            if (this.props.nanny.toJS().slice(-1).pop().firstName != null) {
                this.nannyFRef.current.value = this.props.nanny.toJS().slice(-1).pop().firstName;
                this.setState({firstNameNanny: this.nannyFRef.current.value})
            }
            if (this.props.nanny.toJS().slice(-1).pop().lastName != null) {
                this.nannyNRef.current.value = this.props.nanny.toJS().slice(-1).pop().lastName;
                this.setState({lastNameNanny: this.nannyNRef.current.value})
            }
            if (this.props.nanny.toJS().slice(-1).pop().email != null) {
                this.nannyERef.current.value = this.props.nanny.toJS().slice(-1).pop().email;
                this.setState({mailNanny: this.nannyERef.current.value})
            }
        }
    }

    updateFirstNameParent(event) {
        this.setState({firstNameParent: event.target.value})
    }

    updateLastNameParent(event) {
        this.setState({lastNameParent: event.target.value})
    }

    updateFirstNameNanny(event) {
        this.setState({firstNameNanny: event.target.value})
    }

    updateLastNameNanny(event) {
        this.setState({lastNameNanny: event.target.value})
    }

    updateMailParent(event) {
        this.setState({mailParent: event.target.value})
    }

    updateMailNanny(event) {
        this.setState({mailNanny: event.target.value})
    }

    updateMaintenanceFee(event) {
        this.setState({maintenanceFee: event.target.value})
    }

    updateDate(event) {
        this.setState({startAt: event.target.value})
    }

    handleClick = () => {
        this.props.addParentInfos({
            firstName: this.state.firstNameParent,
            lastName: this.state.lastNameParent,
            email: this.state.mailParent
        });
        this.props.addNannyInfos({
            firstName: this.state.firstNameNanny,
            lastName: this.state.lastNameNanny,
            email: this.state.mailNanny
        });
        this.props.addMaintenanceFee(this.state.maintenanceFee);
        this.props.addMorningHourLimit(this.state.start);
        this.props.addEveningHourLimit(this.state.end);
        this.props.openSummary();
    }

    manageClick = () => {
        this.props.openSummary();
    }

    handleDayScheduleChange(timeRange) {
        this.setState({
            start: timeRange.begin,
            end: timeRange.end
        });
    }

    renderMaintenance() {
        return (
            <div>
                <TitledCard
                    className="fares-infos"
                    title="Entretien"
                >
                    <div className="fee-input">
                        <a className="str-second">Pour une journée de 9h :</a>
                        <input className="fee-style" type="number" placeholder="0€" onChange={this.updateMaintenanceFee}/>
                        <a className="str-first">€ / h</a>
                    </div>
                </TitledCard>
            </div>
        )
    }

    renderMaximumHours() {
        return (
            <div>
                <TitledCard
                    className="fares-infos"
                    title="Amplitude maximale"
                >
                    <div className="hours-input">
                        <TimeRangePicker
                            timeRange={{
                                begin: {
                                    time: secureFormatTime(`${this.state.start}`),
                                },
                                end: {
                                    time: secureFormatTime(`${this.state.end}`),
                                }
                            }}
                            step={5}
                            onRangeChange={(newTimeRange) => this.handleDayScheduleChange(newTimeRange)}
                        />
                    </div>
                </TitledCard>
            </div>
        )
    }

    renderInfos() {
        return (
            <div className="infos-fares">
                {this.renderMaintenance()}
                {this.renderMaximumHours()}
            </div>
        )
    }

    renderContent() {
        const {
            goBack,
        } = this.props;

        return (
            <div>
                <div className="list-parent">
                    <TitledCard
                        className="parent-infos"
                        title="Coordonnées Parent"
                    >
                        <div className="info-parent">
                            <div className="name-input">
                                <a>Prénom :</a>
                                <input className="name-style" type="text" ref={this.parentFRef} placeholder="Prénom" onChange={this.updateFirstNameParent}/>
                            </div>
                            <div className="name-input">
                                <a>Nom :</a>
                                <input className="name-style" type="text" ref={this.parentNRef} placeholder="Nom" onChange={this.updateLastNameParent}/>
                            </div>
                            <div className="mail-input">
                                <a>Adresse mail :</a>
                                <input className="mail-style" type="email" ref={this.parentERef} placeholder="Adresse mail" onChange={this.updateMailParent}/>
                            </div>
                        </div>
                    </TitledCard>
                </div>
                <div className="list-nanny">
                    <TitledCard
                        className="nanny-infos"
                        title="Coordonnées Assmat"
                    >
                        <div className="info-nanny">
                            <div className="name-input">
                                <a>Prénom :</a>
                                <input className="name-style" type="text" ref={this.nannyFRef} placeholder="Prénom" onChange={this.updateFirstNameNanny}/>
                            </div>
                            <div className="name-input">
                                <a>Nom :</a>
                                <input className="name-style" type="text" ref={this.nannyNRef} placeholder="Nom" onChange={this.updateLastNameNanny}/>
                            </div>
                            <div className="mail-input">
                                <a>Adresse mail :</a>
                                <input className="mail-style" type="email" ref={this.nannyERef} placeholder="Adresse mail" onChange={this.updateMailNanny}/>
                            </div>
                        </div>
                    </TitledCard>
                    {this.renderInfos()}
                </div>
            </div>
        )
    }

    renderHeader() {
        const title = "Informations Parents et Assmat";
        return (
            <Header
                title={title}
            />
        )
    }

    isClickable() {
        if (!this.state.firstNameParent || !this.state.lastNameParent ||
            !this.state.firstNameNanny || !this.state.lastNameNanny ||
            !this.state.mailParent || !this.state.mailNanny ||
            this.state.maintenanceFee == 0) {
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
                        icon="remove"
                        style={{
                            background: COLORS.RED1,
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
};

CommitmentCreation.propTypes = {
    goBack: PropTypes.func.isRequired,
    addMorningHourLimit: PropTypes.func.isRequired,
    addEveningHourLimit: PropTypes.func.isRequired,
    addMaintenanceFee: PropTypes.func.isRequired,
    addStartDate: PropTypes.func.isRequired,
    createCommitment: PropTypes.func.isRequired,
    addParentInfos: PropTypes.func.isRequired,
    addNannyInfos: PropTypes.func.isRequired,
    parent: ImmutablePropTypes.list.isRequired,
    nanny: ImmutablePropTypes.list.isRequired,
    openSummary: PropTypes.func.isRequired,
};

export default CommitmentCreation;