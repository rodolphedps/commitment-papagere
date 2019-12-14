import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';

import { formatFinancialValue } from 'utils/formatters';
import { WageRecapLine } from '../../../components/WageRecapLine';
import { getColorThemeBackground } from '../../../utils/styleHelper';
import { secureAvatarUrl } from '../../../utils/avatars';

import './MonthlyWage.scss';


class MonthlyWage extends Component {
  static propTypes = {
    monthName: PropTypes.string.isRequired,
    journalEntries: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.string.isRequired,
        salary: PropTypes.number.isRequired,
      }),
    ),
    connectedPeople: ImmutablePropTypes.list,
    onRecapLineClick: PropTypes.func,
  };

  static defaultProps = {
    journalEntries: List(),
    connectedPeople: List(),
    onRecapLineClick: () => { },
  };

  findPerson(personId) {
    return this.props.connectedPeople
      .find((person) => person.get('id') === personId);
  }

  computeTotalWage() {
    return formatFinancialValue(this.props.journalEntries
      .reduce(
        (amount, wage) => amount + (wage.get('salary') || 0),
        0,
      ));
  }

  renderHeader() {
    const { monthName, journalEntries } = this.props;

    return (
      <div className="monthly-wage__header">
        <div className="monthly-wage__header__title">
          <div className="monthly-wage__header__title__text">
            {monthName}
          </div>
          {journalEntries.size > 1 &&
            <div className="monthly-wage__header__title__total">
              {`${this.computeTotalWage()}`}
            </div>
          }
        </div>

      </div>
    );
  }

  renderWageRecapLines() {
    return this.props.journalEntries
      .map((journalEntry) => this.renderWageRecapLine(journalEntry));
  }

  renderWageRecapLine(journalEntry) {
    const person = this.findPerson(journalEntry.get('related_to_user'));

    if (!person) {
      return null;
    }

    const journalId = journalEntry.get('id');

    return (
      <WageRecapLine
        key={journalId}
        gradientTheme={getColorThemeBackground(person)}
        firstname={person.get('first_name')}
        avatarUrl={secureAvatarUrl(person)}
        wage={journalEntry.get('salary')}
        onClick={() => this.props.onRecapLineClick(journalId)}
      />
    );
  }

  render() {
    return (
      <div className="monthly-wage">
        {this.renderHeader()}
        {this.renderWageRecapLines()}
      </div>
    );
  }
}

export default MonthlyWage;
