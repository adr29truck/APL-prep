/* eslint-disable react/require-default-props */
import { TextField, capitalize, InputLabel } from '@material-ui/core';
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
    <div key={`form_key${field.name}`}>
      <InputLabel htmlFor={`input_field_${field.name}`}>
        {capitalize(field.name)}
      </InputLabel>
      <TextField
        id={`input_field_${field.name}`}
        name={field.name}
        onChange={field.onChange}
        placeholder={field.placeholder || capitalize(field.name)}
        type={field.type}
        value={field.value}
        inputProps={{ 'aria-label': field.placeholder }}
      />
    </div>
  ));

  return (
    <form onSubmit={onSubmit}>
      {fieldsJsx}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
