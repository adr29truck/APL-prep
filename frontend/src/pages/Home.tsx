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

  function onSubmit() {
    updateTimes(changedTimes, currentActivity, currentTime);
  }

  return (
    <Fragment>
      <DayButtonList />
      <ActivityDropdown onClickButton={onSubmit} />
    </Fragment>
  );
};
