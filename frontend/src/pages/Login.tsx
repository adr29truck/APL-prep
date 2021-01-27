import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUser } from '../features/auth/selectors';

import LoginForm from '../components/login/LoginForm';

export const Login: React.FC = () => {
  const history = useHistory();
  const user = useSelector(getUser);

  useEffect(() => {
    if (user.id !== 0) {
      history.push('/');
    }
  }, [user]);

  return (
    <Fragment>
      <LoginForm />
    </Fragment>
  );
};
