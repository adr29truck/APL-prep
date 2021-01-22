import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormGroup from '@material-ui/core/FormGroup';
import { getCurrentTime, getTimes } from '../../features/time/selectors';

import DayButton from '../dayButton';

const DayButtonList = () => {
  const dispatch = useDispatch();

  const times = useSelector(getTimes);
  const day = useSelector(getCurrentTime);
  const [buttons, setButtons] = useState([] as JSX.Element[]);

  const onClickCheckBox = (x: any) => {
    dispatch({ type: 'time/checkBoxById', payload: x.id });
  };

  useEffect(() => {
    setButtons([]);
    dispatch({ type: 'time/fetch' });
  }, [day]);

  const count = 1;

  useEffect(() => {
    // eslint-disable-next-line no-restricted-syntax
    setButtons([]);
    // eslint-disable-next-line no-restricted-syntax
    for (const [i, x] of times.entries()) {
      setButtons((q) => [
        ...q,
        <DayButton
          key={`box_${i * count}`}
          object={x}
          onClickCheckBox={() => onClickCheckBox(x)}
        />,
      ]);
    }
  }, [times]);

  return <FormGroup>{buttons}</FormGroup>;
};

export default DayButtonList;
