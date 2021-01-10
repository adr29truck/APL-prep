import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import {useState, useEffect} from 'react';
import API from '../helpers/API';
import {DayButton} from './DayButton';

export const DayButtonList = (props) => {
  // props
  // day - date ex 2020-01-01
  // submitted - boolean

  const [buttons, setButtons] = useState([]);
  const [times, setTimes] = useState([]);
  const onClickCheckBox = (x) => {
    console.log(x);
    setTimes((tim) => {
      const temp = tim.find((z) => z.id === x.id);
      temp.isChecked = !temp.isChecked;
      const newArr = [];
      for (const z of tim) {
        if (z.id === temp.id) {
          console.log('This happend');
          newArr.push(temp);
        } else {
          newArr.push(z);
        };
      };
      console.log(temp, '<-- updatedData');
      return newArr;
    });
    console.log('Time was changed');
  };

  useEffect(() => {
    const fetchTimes = async () => {
      const temp = await API.get('times/' + props.day + '/1');
      for (const x of temp) {
        x.label = x.name.split('T')[1];
        x.label = x.label.length === 1 ? '0' + x.label : x.label;
        x.isChecked = false;
        if (x.color != null) {
          x.style ={color: x.color};
        };
      }
      setButtons([]);
      setTimes(temp);
      console.log('Fetched Times');
    };
    fetchTimes();
  }, [props.day, props.submitted]);

  useEffect(() => {
    console.log('Re rendered Times', buttons);
    console.log(times);
    if (buttons.length !== 0) {
      for (const [i, x] of times.entries()) {
        setButtons((q) => [...q.map((z) => {
          return z.key === x.key ? <DayButton key={'box_'+ i} object={x} onClickCheckBox={() => onClickCheckBox(x)} /> : z;
        } )]);
      };
      console.log(buttons, 'buttons');
    } else {
      for (const [i, x] of times.entries()) {
        setButtons((q) => [...q, <DayButton key={'box_'+ i} object={x} onClickCheckBox={() => onClickCheckBox(x)} />]);
      };
    };
    props.onTimes(times);
  }, [times]);

  return (
    <FormGroup column>
      {buttons}
    </FormGroup>);
};

DayButtonList.propTypes = {
  day: PropTypes.string,
  submitted: PropTypes.bool,
  onTimes: PropTypes.func,
};
