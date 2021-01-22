import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { getActivities } from '../../features/activity/selectors';

const ActivityDropDown = ({ onClickButton }: any) => {
  // props
  // onClickButton - func

  const dispatch = useDispatch();
  const [options, setOptions] = useState<JSX.Element[]>([]);

  useEffect(() => {
    dispatch({ type: 'activity/fetch' });
  }, []);

  const activities = useSelector(getActivities);

  useEffect(() => {
    const generateOptions = (empty = true) => {
      if (empty) {
        // setOptions([
        //   <option key={`option_${0}`} aria-label="None" value={undefined}>
        //     {' '}
        //     -{' '}
        //   </option>,
        // ]);
        setOptions([]);
        setOptions((q) => {
          const temp = [...q];
          temp.push(
            <option key={`option_${0}`} aria-label="None" value={undefined}>
              {' '}
              -{' '}
            </option>
            // return [<option key={'option_' + 0} aria-label="None" value={null} > - </option>]
          );
          return temp;
        });
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const x of activities) {
        setOptions((q) => {
          const temp = [...q];
          temp.push(
            <option key={`option_${x.id}`} aria-label={x.name} value={x.id}>
              {' '}
              {x.name}
            </option>
          );
          return temp;
        });
      }
    };
    if (activities.length > 0) {
      generateOptions();
    }
  }, [activities]);

  /**
   * Handles change of option in select dropdown
   * @param {Event} event - Event
   */
  function onChange(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ): void {
    dispatch({
      type: 'activity/setCurrentActivityById',
      payload: event.target.value,
    });
  }

  return (
    <div>
      <Select
        style={{ color: '#fff' }}
        label="Activity Selector"
        native
        onChange={onChange}
        inputProps={{
          name: 'activity',
        }}
      >
        {options}
      </Select>
      <Button
        id="submitButton"
        variant="outlined"
        type="submit"
        color="primary"
        onClick={onClickButton}
      >
        Submit
      </Button>
    </div>
  );
};

export default ActivityDropDown;
