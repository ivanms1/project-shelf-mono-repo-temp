import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAppContext } from '../app/Context/AppContext';

function PublicRoutes({ path, children, ...props }: RouteProps) {
  const { isAuthenticated } = useAppContext();

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Route path={path} {...props}>
      {children}
    </Route>
  );
}

export default PublicRoutes;
