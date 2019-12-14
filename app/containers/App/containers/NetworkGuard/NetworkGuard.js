import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TRANSLATIONS } from 'translations';

import './NetworkGuard.scss';

export default class NetworkGuard extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      deviceOnline: navigator.onLine,
    };
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      const updateOnlineStatus = () => {
        if (navigator.onLine) {
          this.setState({ deviceOnline: true });
        } else {
          this.setState({ deviceOnline: false });
        }
      };

      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    });
  }

  get translations() {
    return TRANSLATIONS.networkGuard;
  }

  renderOfflinePage() {
    return (
      <Fragment>
        <div className="network-guard">
          {this.translations.message1}<br />
          {this.translations.message2}<br /><br />
          {this.translations.message3}
        </div>
      </Fragment>
    );
  }

  render() {
    const { deviceOnline } = this.state;

    if (!deviceOnline) {
      return this.renderOfflinePage();
    }

    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}
