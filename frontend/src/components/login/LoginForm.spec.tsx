import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import LoginForm from './LoginForm';
import Form from '../generic/form/Form';

describe('<MyComponent />', () => {
  it('renders one <Form /> components', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find(Form)).to.have.lengthOf(1);
  });
});