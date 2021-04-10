import React from 'react';
import { Redirect } from 'react-router-dom';
import * as localStorage from '../utils/localStorage';

const Signout: React.FC = () => {
  localStorage.clear();

  return (
    <Redirect to='/signin' />
  );
};

export default Signout;
