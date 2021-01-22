import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import LoginForm from '../components/login/LoginForm';
import DayButtonList from '../components/dayButtonList/DayButtonList';
import ActivityDropdown from '../components/activityDropdown/ActivityDropdown';

import { updateTimes } from '../helpers/times';
import { getCheckedTimes, getCurrentTime } from '../features/time/selectors';
import { getCurrentActivity } from '../features/activity/selectors';

export const Home: React.FC = () => {
  const changedTimes = useSelector(getCheckedTimes);
  const currentActivity = useSelector(getCurrentActivity);
  const currentTime = useSelector(getCurrentTime);

  // const [x, setX] = /useState(0);
  function onSubmit() {
    updateTimes(changedTimes, currentActivity, currentTime);
    // setX((z) => z + 1);
  }

  return (
    <Fragment>
      <LoginForm />
      <DayButtonList />
      <ActivityDropdown onClickButton={onSubmit} />
    </Fragment>
  );
};
