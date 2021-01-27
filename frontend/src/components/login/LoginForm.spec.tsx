import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import LoginForm from './LoginForm';
import Form from '../generic/form/Form';
import { TestHelper } from '../../helpers/testHelper';

describe('<MyComponent />', () => {
  it('renders one <Form /> components', () => {
    const wrapper = mount(
      <TestHelper>
        {' '}
        <LoginForm />{' '}
      </TestHelper>
    );
    expect(wrapper.find(Form)).to.have.lengthOf(1);
  });
});
