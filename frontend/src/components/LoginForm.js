import PropTypes from 'prop-types';
import React from 'react';

export const LoginForm = (props) => {
  const fields = props.fields.map((field) =>
    <input type={field.type}
      placeholder={field.placeholder || field.name}
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      key={field.name}>
    </input>);


  return (
    <form onSubmit={props.onSubmit}>
      {fields}
      <button type="submit">Submit</button>
    </form>
  );
};

LoginForm.defaultProps = {
  fields: [
    {name: 'email', type: 'email'},
    {name: 'password', type: 'password'},
  ],
  onSubmit: (e) => {
    e.preventDefault(); console.log('A form was submitted');
  },
};

LoginForm.propTypes = {
  fields: PropTypes.array,
  onSubmit: PropTypes.func,
};
