import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const DayButton = ({ object, onClickCheckBox }: any) => {
  // props
  // object - obj {id, isChecked, style, name}
  // onClickCheckBox - Func

  return (
    <FormControlLabel
      control={
        <Checkbox
          style={object.style}
          name={object.name}
          checked={object.isChecked}
          color="primary"
          id={object.id.toString()}
          onChange={onClickCheckBox}
        />
      }
      label={object.label}
    />
  );
};

export default DayButton;
