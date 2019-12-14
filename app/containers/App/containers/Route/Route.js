import React from 'react';
import PropTypes from 'prop-types';
import { Route as RouteDom, Redirect } from 'react-router-dom';


const Route = ({
  component: Component,
  layout: Layout,
  allowConnected,
  currentUser,
  ...rest,
}) => {
  if (!allowConnected && currentUser && currentUser.get('token')) {
    return <Redirect to="/planning" />;
  }

  return (
    <RouteDom
      {...rest}
      render={
        (props) => (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
    />
  );
};


Route.propTypes = {
  component: PropTypes.any,
  layout: PropTypes.any
};


export default Route;
