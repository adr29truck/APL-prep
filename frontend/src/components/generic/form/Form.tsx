/* eslint-disable react/require-default-props */
import { capitalize } from '@material-ui/core';
import React from 'react';

interface X {
  type: string;
  placeholder?: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props {
  fields: X[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ fields, onSubmit }: Props) => {
  const fieldsJsx = fields.map((field) => (
    <input
      type={field.type}
      placeholder={field.placeholder || capitalize(field.name)}
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      key={field.name}
    />
  ));

  return (
    <form onSubmit={onSubmit}>
      {fieldsJsx}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
