import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({
  component: Component,
  layout: Layout,
  layoutProps,
  currentUser,
  ...rest
}) => {
  if (!currentUser || !currentUser.get('token')) {
    if (window.CRISP_TOKEN_ID) {
      window.location.href = window.location.origin;
      return null;
    }
    return <Redirect to="/" />;
  }

  return (
    <Route
      {...rest}
      render={
        (props) => (
          <Layout {...layoutProps}>
            <Component {...props} />
          </Layout>
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.any,
  layout: PropTypes.any
};


export default ProtectedRoute;
