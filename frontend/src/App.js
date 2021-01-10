// import logo from './logo.svg';
import React, {useState} from 'react';

import './App.css';
import {Header} from './components/Header';
import Typography from '@material-ui/core/Typography';
import {DayButtonList} from './components/DayButtonList';
import {ActivityDropDown} from './components/ActivityDropDown';
import API from './helpers/API';


/**
 * Default app handler
 * @return {jsx} - App render
 */
export function App() {
  const [times, setTimes] = useState([]);
  const [activitiy, setActivity] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  /**
   * Submitts changes to times to the backend
   * @param {*} _ - Uninportant
   */
  async function onClick(_) {
    const filteredTimes = times.filter((x) => x.isChecked === true);
    for (const t of filteredTimes) {
      await API.post('times/' + t.name + '/1', {id: t.id, activity_id: activitiy});
    }
    setSubmitted((q) => !q);
  }

  const [day, setDay] = useState(new Date());

  /**
   * Returns the selected day as a date string
   * @return {string} - day objects date as string
   */
  function getDayAsString() {
    let temp = day;
    if (temp.getTimezoneOffset() < 0) {
      temp = new Date(temp.valueOf() + (60_000 * (-temp.getTimezoneOffset())));
    } else {
      temp = new Date(temp.valueOf() - (60_000 * (temp.getTimezoneOffset())));
    }
    return temp.toISOString().split('T')[0];
  }

  /**
   * Updates day when going backwards in time
   */
  function onClickLeftArrow() {
    setDay((q) => new Date(q.valueOf() - 86_400_000));
  }

  /**
   * Updates day when going forward in time
   */
  function onClickRightArrow() {
    const temp = new Date(day + 86_400_000);
    const temp2 = new Date();
    if (!(temp.getFullYear() === temp2.getFullYear() &&
        temp.getDate() === temp2.getDate() &&
        temp.getMonth() === temp2.getMonth())) {
      setDay((q) => new Date(q.valueOf() + 86_400_000));
    }
  }

  return (
    <div>
      <Header onClickLeftArrow={onClickLeftArrow} onClickRightArrow={onClickRightArrow} />
      <Typography variant="h2" component="h2" gutterBottom className="text-center">{getDayAsString()}</Typography>
      <DayButtonList day={getDayAsString()} onTimes={setTimes} submitted={submitted} />
      <ActivityDropDown onActivity={setActivity} onClickButton={onClick} />
    </div>
  );
}
