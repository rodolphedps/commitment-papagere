import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class UnauthLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
  };

  componentDidMount() {
    window.CRISP_TOKEN_ID = undefined;
  }

  render() {
    return (
      <div className="unauth-layout">
        <div className="unauth-layout__container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
