import React, { PureComponent, useState, useEffect } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Feature } from '@paralleldrive/react-feature-toggles';
import UserHeader from 'components/UserHeader/UserHeader';

import { Button, ListCard, Header, NumberInput, ActionBar, TitledCard } from 'components/UiKit';
import { getColorThemeBackground, calcRem } from 'utils/styleHelper';
import { COLORS } from '../../../../../constants/colors';

import './HourlyRate.scss';

const goBackStyle = {
    width: calcRem(60),
    height: calcRem(30),
    fontSize: 13,
};

const convertStyle = {
    width: calcRem(150),
    height: calcRem(40),
    fontSize: 15,
};

class HourlyRate extends PureComponent {
    static propTypes = {
        goBack: PropTypes.func.isRequired,
        addHourlyRateNet: PropTypes.func.isRequired,
        addHourlyRateGross: PropTypes.func.isRequired,
        netHR: PropTypes.number.isRequired,
        minNet: PropTypes.number.isRequired,
    };

    state = {
        convertValue: true,
        value: 0.0,
        gross: 0.0,
    };

    constructor(props) {
        super(props);

        this.updateInput = this.updateInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit() {
        const {
            hourlyRate,
            addHourlyRate,
        } = this.props;

        if (this.state.value == null || this.state.value < 2.0) {
            return null;
        }
        //addHourlyRate(Number(this.state.value));
        const gross = this.state.value / 0.7801;
        this.setState({convertValue: true, gross: gross});
    }

    handleClick = () => {
        this.props.goBack();
    }

    validateRates = () => {
        if (this.state.value < 2.20) {
            return;
        }
        this.props.addHourlyRateNet(Number(this.state.value));
        this.props.addHourlyRateGross(Number(this.state.gross));
        this.props.goBack();
    }

    updateInput(event) {
        const value = event.target.value;
        const gross = value * this.props.netHR;
        this.setState({value : value, gross: gross})
    }

    isClickable() {
        if (this.state.value < 2.20) {
            return 1
        }
        return 0
    }

    renderActionBar() {
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
                        onClick={this.validateRates}
                    />
                </ActionBar>
            </div>
        )
    }

    render () {
        const title = "Taux Horaire";
        const {
            goBack
        } = this.props;

        console.log(this.state.value);
        console.log(this.state.gross);
        return (
            <div>
                <Header title={title}/>
                <div className="hourly-rate-page">
                    <div>
                        <TitledCard
                            className="hourly-rate-card"
                            title="Taux horaire"
                        >
                            <div className="hr-form">
                                <a>Net : </a>
                                <div className="min-hr">
                                    <input className="input-style" type="number" step="0.01" min="2.20" onChange={this.updateInput}/>
                                    <a className="min">min: 2,20 €</a>
                                </div>
                                    <a className="euro-str">€</a>
                            </div>
                            <div className="gross-value">
                                <a>Brut : </a>
                                <a className="conv-gross">{Number(this.state.gross).toFixed(2)}</a>
                                <a className="euro-str">€</a>
                            </div>
                            <div className="line"/>
                            <div className="info-hr">
                                <h4>Informations sur le taux horaire</h4>
                            </div>
                        </TitledCard>
                    </div>
                    {this.renderActionBar()}
                </div>
            </div>
        )
    }
}

export default HourlyRate;