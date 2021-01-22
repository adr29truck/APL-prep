/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from '../generic/form';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function onUsernameChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setUsername(target.value);
  }
  function onPasswordChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setPassword(target.value);
  }

  const dispatch = useDispatch();

  function onLoginFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch({ type: 'auth/signIn', payload: { username, password } });
    setUsername('');
    setPassword('');
  }

  return (
    <Form
      fields={[
        {
          name: 'username',
          type: 'text',
          value: username,
          onChange: onUsernameChange,
        },
        {
          name: 'password',
          type: 'password',
          value: password,
          onChange: onPasswordChange,
        },
      ]}
      onSubmit={onLoginFormSubmit}
    />
  );
};

export default LoginForm;
