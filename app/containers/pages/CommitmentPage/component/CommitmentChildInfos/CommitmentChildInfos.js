import React, { Component, Fragment, PureComponent } from 'react';
import { Button, ActionBar, Header, TitledCard, Toggle, DateTimePicker } from 'components/UiKit';
import { calcRem } from 'utils/styleHelper';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Feature } from '@paralleldrive/react-feature-toggles';

import { COLORS } from '../../../../../constants/colors';
import { roboto } from '../../../../../constants/font-families';

import './CommitmentChildInfos.scss';

const goBackStyle = {
    width: calcRem(60),
    height: calcRem(30),
    fontSize: 13,
};

class CommitmentChildInfos extends PureComponent {

    state = {
        firstName: null,
        birthdate: new Date(),
        bool: false,
    };

    constructor(props) {
        super(props);

        this.updateName = this.updateName.bind(this);
        this.updateBirth = this.updateBirth.bind(this);
        this.setTrueFalse = this.setTrueFalse.bind(this);
    }

    updateName(event) {
        this.setState({firstName : event.target.value})
    }

    updateBirth(event) {
        this.setState({birthdate : event.target.value});
    }

    validateChild() {
        const {
            addChildStore
        } = this.props;
        var id = 0;

        addChildStore({
            firstName: this.state.firstName,
            birthdate: this.state.birthdate,
            id: uuid.v4(),
        });
        goBack();
    }

    handleClick = () => {
        if (this.state.bool == false) {
            const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
            var date = this.state.birthdate.getFullYear() + '-' + months[this.state.birthdate.getMonth()] + '-' + this.state.birthdate.getDate()
            this.props.addChildStore({
                firstName: this.state.firstName,
                birthdate: date,
                id: uuid.v4(),
                schedule: [],
                occurrences: [],
            })
        } else {
            this.props.addChildStore({
                firstName: "Pas encore né",
                birthdate: {},
                id: uuid.v4(),
                schedule: [],
                occurrences: [],
            })
        }
        this.props.goBack()
    }

    setTrueFalse() {
        if (this.state.bool == false) {
            this.setState({bool: true});
        } else {
            this.setState({bool: false});
        }
    }

    updateDate(newDate) {
        var date = this.state.birthdate;
        date = newDate;
        this.setState({birthdate: date});
    }

    renderNameBirthdate() {
        if (this.state.bool == false) {
            return (
                <div>
                    <div className="name">
                        <a>Prénom</a>
                    </div>
                    <div className="name-input">
                        <input className="name-style" type="text" placeholder="Prénom enfant" onChange={this.updateName}/>
                    </div>
                    <div className="line"/>
                    <div className="birth">
                        <a>Date de naissance</a>
                    </div>
                    <div className="birth-input">
                        <DateTimePicker
                            dateTime={this.state.birthdate}
                            mode="date"
                            onChange={(newDate) => this.updateDate(newDate)}
                        />
                    </div>
                    <div className="line"/>
                </div>
            )
        } else {
            return
        }
    }

    renderWholePage() {
        const title_page = "Ajouter un enfant";
        return (
            <div className="add-child-page">
                <div className="global-content">
                    <TitledCard
                        className="list-infos"
                        title={title_page}
                    >
                        {this.renderNameBirthdate()}
                        <div className="is-child-born">
                            <a>Pas encore né</a>
                            <Toggle
                                checked={this.state.bool}
                                onChange={this.setTrueFalse}
                            />
                        </div>
                    </TitledCard>
                </div>
            </div>
        )
    }

    isClickable() {
        if (this.state.bool == true) {
            return 0;
        }
        if (this.state.firstName == null && this.state.bool == false) {
            return 1
        }
        if (this.state.firstName.length == 0 && this.state.bool == false) {
            return 1
        }
        return 0
    }

    renderActionBar() {
        return (
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
        )
    }

    render() {
        const title_page = "Ajouter un enfant";
        const {
            goBack,
            addChildStore,
            goHomePage
        } = this.props;

        return (
            <div className="body-infos-child">
                <Header title={title_page}/>
                {this.renderWholePage()}
                {this.renderActionBar()}
            </div>
        )
    }
}

CommitmentChildInfos.propTypes = {
    goBack: PropTypes.func.isRequired,
    childcare: ImmutablePropTypes.list.isRequired,
    addChildStore: PropTypes.func.isRequired,
}

export default CommitmentChildInfos;