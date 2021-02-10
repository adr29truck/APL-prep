import React from 'react';
import { mount } from 'enzyme';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom/extend-expect';
import LoginForm from './LoginForm';
import Form from '../generic/form/Form';
import { TestHelper } from '../../helpers/testHelper';

describe('<Login />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <TestHelper>
        <LoginForm />
      </TestHelper>
    );
    expect(wrapper.find(Form).html()).toMatchSnapshot();
  });
  it('handles form submission correctly', () => {
    render(
      <TestHelper>
        <LoginForm />
      </TestHelper>
    );
    userEvent.type(screen.getByPlaceholderText('Username'), 'admin');
    userEvent.type(screen.getByPlaceholderText('Password'), 'admin');
    expect(screen.getByRole('form')).toHaveFormValues({
      username: 'admin',
      password: 'admin',
    });

    userEvent.click(screen.getByText('Submit'));
    expect(screen.getByRole('form')).toHaveFormValues({
      username: '',
      password: '',
    });
  });
});
