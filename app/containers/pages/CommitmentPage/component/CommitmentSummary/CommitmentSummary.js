import React, { Component, Fragment, PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Feature } from '@paralleldrive/react-feature-toggles';

import { Button, TitledCard, ActionBar, ListCard, Header, NumberInput } from 'components/UiKit';
import { getColorThemeBackground, calcRem } from 'utils/styleHelper';
import { COLORS } from '../../../../../constants/colors';
import { TimeRangePicker, Icon } from 'components/UiKit';
import { secureFormatTime } from 'utils/timeHelper';

import './CommitmentSummary.scss';
import { GradientPageLayout } from 'components/PageLayout';

class CommitmentSummary extends PureComponent {

    renderParentInfos() {
        return (
            <div>
                <div className="card-parent">
                    <TitledCard
                        title="Informations Parents"
                    >
                        <div className="first-name-parent">
                            <a>{this.props.parent.toJS().slice(-1).pop().firstName} {this.props.parent.toJS().slice(-1).pop().lastName}</a>
                        </div>
                        <div className="email-parent">
                            <a>{this.props.parent.toJS().slice(-1).pop().email}</a>
                        </div>
                    </TitledCard>
                </div>
            </div>
        )
    }

    renderSchedules(child) {
        if (child.get('schedule').size == 0) {
            return
        }
        return child.get('schedule')
            .entrySeq()
            .map(([key, schedule]) => (
                <div>
                    <div className="occurrences-weeks">
                        <a>{child.getIn(['occurrences', -1, key])} semaines / an</a>
                    </div>
                </div>
            ))
    }

    renderMonthHour(child) {
        return (
            <div className="month-format-hour">
                <a>{this.renderFormatHour(child)} / mois</a>
            </div>
        )
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

    getChildName(child) {
        const hosting = "Accueil de ";
        if (child.get('firstName') != "Pas encore né") {
            return hosting.concat(child.get('firstName'));
        } else {
            return "Accueil de votre futur enfant"
        }
    }

    renderChildrenInfos() {
        const {
            children
        } = this.props;

        return children
            .entrySeq()
            .map(([key, child]) => (
                <div className="children-card" key={key}>
                    <TitledCard
                        title={this.getChildName(child)}
                    >
                        {this.renderSchedules(child)}
                        <div>
                            {this.renderMonthHour(child)}
                        </div>
                    </TitledCard>
                </div>
            ))
    }

    renderNannyInfos() {
        return (
            <div>
                <div className="card-nanny">
                    <TitledCard
                        title="Informations Assmat"
                    >
                        <div className="first-name-nanny">
                            <a>{this.props.nanny.toJS().slice(-1).pop().firstName} {this.props.nanny.toJS().slice(-1).pop().lastName}</a>
                        </div>
                        <div className="email-nanny">
                            <a>{this.props.nanny.toJS().slice(-1).pop().email}</a>
                        </div>
                    </TitledCard>
                </div>
            </div>
        )
    }

    renderContractInfos() {
        return (
            <div>
                <div className="contract-card">
                    <TitledCard
                        title="Tarifs"
                    >
                        <div className="maintenance-fee">
                            <a>{this.props.maintenanceFee} € / 9h d'indemnités d'entretien</a>
                        </div>
                    </TitledCard>
                </div>
            </div>
        )
    }

    handleRemove = () => {
        this.props.goBack();
    }

    renderActionBar() {
        return (
            <div className="btn-validate">
                <ActionBar className="action-bar">
                    <Button
                        text="Modifier"
                        icon="person"
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
                        onClick={() => this.props.createCommitment()}
                    />
                </ActionBar>
            </div>
        )
    }

    renderContent() {
        return (
            <div>
                {this.renderParentInfos()}
                {this.renderNannyInfos()}
                {this.renderChildrenInfos()}
                {this.renderContractInfos()}
            </div>
        );
    }

    renderHeader() {
        const title = "Résumé des Informations";
        return (
            <Header
                title={title}
            />
        )
    }

    render() {
        return (
            <GradientPageLayout
                header={this.renderHeader()}
                content={this.renderContent()}
                footer={this.renderActionBar()}
            />
        )
    }
};

CommitmentSummary.propTypes = {
    goBack: PropTypes.func.isRequired,
    children: ImmutablePropTypes.list.isRequired,
    parent: ImmutablePropTypes.list.isRequired,
    nanny: ImmutablePropTypes.list.isRequired,
    morningH: PropTypes.string.isRequired,
    eveningH: PropTypes.string.isRequired,
    maintenanceFee: PropTypes.string.isRequired,
    startAt: PropTypes.string.isRequired,
    createCommitment: PropTypes.func.isRequired,
}

export default CommitmentSummary;