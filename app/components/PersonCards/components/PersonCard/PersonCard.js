import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ListCard } from 'components/UiKit';

import './PersonCard.scss';

class PersonCard extends PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    personKind: PropTypes.string,
    children: PropTypes.node,
  };

  renderHeader() {
    const { avatarUrl, fullName, personKind } = this.props;

    return (
      <div className="person-card__header">
        <div className="left" />
        <div className="middle">
          <img className="person-avatar" src={avatarUrl} alt="person avatar" />
          <span className="person-name">
            {`${fullName}`}
          </span>
          {!!personKind &&
            <span className="person-kind">
              {personKind}
            </span>
          }
        </div>
        <div className="right" />
      </div>
    );
  }

  renderBody() {
    const { children } = this.props;

    return (
      <div className="person-card__body">
        {children}
      </div>
    );
  }

  render() {
    return (
      <ListCard>
        <div className="person-card">
          {this.renderHeader()}
          {this.renderBody()}
        </div>
      </ListCard>
    );
  }
}

export default PersonCard;
