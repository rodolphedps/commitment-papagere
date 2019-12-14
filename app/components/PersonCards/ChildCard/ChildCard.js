import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { TRANSLATIONS } from 'translations';
import { secureAvatarUrl } from 'utils/avatars';
import { format } from 'utils/date';
import { PersonCard, PersonCardLineGroup, PersonCardLine } from '../components';

import './ChildCard.scss';

class ChildCard extends PureComponent {
  static propTypes = {
    child: ImmutablePropTypes.mapContains({
      id: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }),
  };

  get translations() {
    return TRANSLATIONS.childDetail;
  }

  get fullName() {
    const { child } = this.props;
    const firstName = child.get('first_name');
    const lastName = child.get('last_name');

    return `${firstName} ${lastName}`;
  }

  get avatarUrl() {
    const { child } = this.props;
    return secureAvatarUrl(child);
  }

  get birthdate() {
    const { child } = this.props;
    const birthdate = child.get('birthdate') || '';
    return format(birthdate, 'dd/MM/yyyy');
  }

  render() {
    return (
      <PersonCard
        avatarUrl={this.avatarUrl}
        fullName={this.fullName}
      >
        <PersonCardLineGroup>
          <PersonCardLine
            label={this.translations.birthdate}
          >
            {this.birthdate}
          </PersonCardLine>
        </PersonCardLineGroup>
      </PersonCard>
    );
  }
}

export default ChildCard;
