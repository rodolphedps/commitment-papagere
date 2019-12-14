/* eslint-disable no-script-url */
import React, { PureComponent, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { TRANSLATIONS } from 'translations';
import { formatPhone } from 'utils/phone';

import { PersonCard, PersonCardLine, PersonCardLineGroup } from '../components';

class ContactCard extends PureComponent {
  static propTypes = {
    contact: ImmutablePropTypes.map.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleMailClick = this.handleMailClick.bind(this);
  }

  get translations() {
    return TRANSLATIONS.contactDetail;
  }

  get contactMobilePhone() {
    const { contact } = this.props;
    const mobilePhone = contact.get('mobile');

    return formatPhone(mobilePhone);
  }

  get contactHomePhone() {
    const { contact } = this.props;
    const personalPhone = contact.get('phone');

    return formatPhone(personalPhone);
  }

  get contactEmail() {
    const { contact } = this.props;
    return contact.get('email');
  }

  handleMailClick() {
    window.location.replace(`mailto:${this.contactEmail}`);
  }

  renderBody() {
    return (
      <Fragment>
        {this.renderPhoneNumbers()}
        {this.renderEmail()}
        {this.renderAddress()}
        {this.renderSSN()}
      </Fragment>
    );
  }

  renderPhoneNumbers() {
    return (
      <PersonCardLineGroup>
        <PersonCardLine
          icon="phone"
          label={this.translations.mobilePhone}
        >
          <a href={`tel:${this.contactMobilePhone}`}>{this.contactMobilePhone}</a>
        </PersonCardLine>
        <PersonCardLine
          label={this.translations.homePhone}
        >
          <a href={`tel:${this.contactHomePhone}`}>{this.contactHomePhone}</a>
        </PersonCardLine>
      </PersonCardLineGroup>
    );
  }

  renderEmail() {
    return (
      <PersonCardLineGroup>
        <PersonCardLine
          icon="email"
          label={this.translations.email}
        >
          <a href="javascript:void(0)" onClick={this.handleMailClick}>{this.contactEmail}</a>
        </PersonCardLine>
      </PersonCardLineGroup>
    );
  }

  renderAddress() {
    const { contact } = this.props;
    const street = contact.get('street') || '';
    const zipcode = contact.get('zipcode') || '';
    const city = contact.get('city') || '';

    return (
      <PersonCardLineGroup>
        <PersonCardLine
          icon="pin"
          label={this.translations.address}
        >
          <div>{street}</div>
          <div>{`${zipcode} ${city}`}</div>
        </PersonCardLine>
      </PersonCardLineGroup>
    );
  }

  renderSSN() {
    const { contact } = this.props;

    const ssn = contact.get('ssn');

    if (!ssn) {
      return null;
    }

    return (
      <PersonCardLineGroup>
        <PersonCardLine
          icon="ss"
          label={this.translations.ssn}
        >
          {ssn}
        </PersonCardLine>
      </PersonCardLineGroup>
    );
  }

  render() {
    const { contact } = this.props;
    const avatarUrl = contact.get('avatarUrl');
    const firstName = contact.get('first_name');
    const lastName = contact.get('last_name');
    const fullName = `${firstName} ${lastName}`;
    const kind = contact.get('kind');

    return (
      <PersonCard
        avatarUrl={avatarUrl}
        fullName={fullName}
        personKind={kind}
      >
        {this.renderBody()}
      </PersonCard>
    );
  }
}

export default ContactCard;
