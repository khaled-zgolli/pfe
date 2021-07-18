import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import './pretected-router.module.css';

/* eslint-disable-next-line */
export interface PretectedRouterProps {}

export const ProtectedRouter = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export const ProtectedRouterAdmin = ({
  component: Component,
  isAdmin,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAdmin) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};
