import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { NavigationBar } from '../../../../components/Navigation';

class AuthLayout extends React.PureComponent {
  componentDidMount() {
    if (window.$crisp) {
      const { currentUser } = this.props;
      const userId = currentUser.get('id');
      const email = currentUser.get('email');
      const name = `${currentUser.get('first_name')} ${currentUser.get('last_name')}`;
      window.$crisp.push(['set', 'user:email', [email]]);
      window.$crisp.push(['set', 'user:nickname', [name]]);
      window.$crisp.push(['set', 'session:data', [[['userId', userId]]]]);
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
        {!this.props.hideNavigationBar && <NavigationBar />}
      </React.Fragment>
    );
  }
}

AuthLayout.propTypes = {
  hideNavigationBar: PropTypes.bool,
  children: PropTypes.any,
  currentUser: ImmutablePropTypes.map.isRequired,
};

AuthLayout.defaultProps = {
  hideNavigationBar: false,
};

export default AuthLayout;
