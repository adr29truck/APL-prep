import React from 'react';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import API from '../helpers/API';
import {useState, useEffect} from 'react';

export const ActivityDropDown = (props) => {
  // props
  // activities - Object {id, name}
  // onClickButton - func

  const [activities, setActivities] = useState([]);
  const [options, setOptions] = useState([]);
  const rendered = true;

  useEffect(() => {
    console.log('RENDER');
    const fetchActivities = async () => {
      const temp = await API.get('activities');
      setActivities(temp);
      console.log('Fetched Activities', temp);
    };
    fetchActivities();
  }, [rendered]);

  useEffect(() => {
    const generateOptions = (empty = true) => {
      if (empty) {
        setOptions((q) => {
          const temp = [...q]; temp.push(<option key={'option_' + 0} aria-label="None" value={null} > - </option>); return temp;
        });
      }
      for (const x of activities) {
        setOptions((q) => {
          const temp = [...q]; temp.push(<option key={ 'option_' + x.id} aria-label={x.name}
            value={x.id} > {x.name}</option>); return temp;
        });
      }
    };
    if (activities.length > 0 && options.length === 0) {
      generateOptions();
    }
  }, [activities, options.length]);

  /**
   * Handles on change
   * @param {*} target - event target
   */
  function onChange({target}) {
    props.onActivity(target.value);
  }

  return (
    <div>
      <Select
        style={{color: '#fff'}}
        label="Activity Selector"
        native
        onChange={onChange}
        inputProps={{
          name: 'activiity',
        }}
      >
        {options}
      </Select>
      <Button id="submitButton" variant="outlined" type="submit" color="primary" onClick={props.onClickButton}>Submit</Button>
    </div>
  );
};

ActivityDropDown.propTypes = {
  onClickButton: PropTypes.func,
  activities: PropTypes.array,
  onActivity: PropTypes.func,
};
