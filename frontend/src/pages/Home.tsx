import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../components/header';
import DayButtonList from '../components/dayButtonList/DayButtonList';
import ActivityDropdown from '../components/activityDropdown/ActivityDropdown';

import { updateTimes } from '../helpers/times';
import { getCheckedTimes, getCurrentTime } from '../features/time/selectors';
import { getCurrentActivity } from '../features/activity/selectors';
import { getUser } from '../features/auth/selectors';

export const Home: React.FC = () => {
  const changedTimes = useSelector(getCheckedTimes);
  const currentActivity = useSelector(getCurrentActivity);
  const currentTime = useSelector(getCurrentTime);
  const user = useSelector(getUser);
  const history = useHistory();

  useEffect(() => {
    if (user.id === 0) {
      history.push('/login');
    }
  }, [user]);

  function onSubmit() {
    updateTimes(changedTimes, currentActivity, currentTime);
  }

  // Makes sure the components are never loaded if unathorized,
  // meaning no invalid network request should be sent.
  if (user.id === 0) {
    return <Fragment />;
  }
  return (
    <Fragment>
      <Header />
      <DayButtonList />
      <ActivityDropdown onClickButton={onSubmit} />
    </Fragment>
  );
};
