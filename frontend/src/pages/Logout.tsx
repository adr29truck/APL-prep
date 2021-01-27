import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const Logout: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  dispatch({ type: 'auth/signOut' });
  history.push('/login');

  return <Fragment />;
};
