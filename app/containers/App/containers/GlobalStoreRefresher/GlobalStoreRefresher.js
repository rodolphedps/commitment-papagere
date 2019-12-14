import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';


export default class GlobalStoreRefresher extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    startRefreshConnectedPeople: PropTypes.func.isRequired,
    stopRefreshConnectedPeople: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.startRefreshConnectedPeople();
  }

  componentWillUnmount() {
    this.props.stopRefreshConnectedPeople();
  }

  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}
