import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as localStorage from '../utils/localStorage';

interface ProtectedRouteProps {
  exact: boolean;
  path: string;
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const user = localStorage.getUser();

  if (!user.token) {
    return (
      <Redirect to='/signin' />
    )
  }
  return (
    <Route {...props} />
  );
}

export default ProtectedRoute;