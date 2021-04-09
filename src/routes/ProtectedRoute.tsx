import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../store/AppContext';

interface ProtectedRouteProps {
  exact: boolean;
  path: string;
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { user } = useContext(AppContext);

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