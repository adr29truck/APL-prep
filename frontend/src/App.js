// import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import  Typography from '@material-ui/core/Typography';
import {useState, useEffect } from 'react'
import {DayButtonList} from './components/DayButtonList';
import {ActivityDropDown} from './components/ActivityDropDown';
import API from './helpers/API';

export function App() {
  const [times, setTimes] = useState([]);
  const [activitiy, setActivity] = useState(0);

  const day = "2021-01-09";

  function onClick(_) {
    const filteredTimes = times.filter(x => x.isChecked === true);
    for (const t of filteredTimes) {
      API.post('times/' + t.name + '/1', {id: t.id, activity_id: activitiy});
    }
  }

  return (
  <div>
    <Header />
    <Typography variant="h2" component="h2" gutterBottom className="text-center">{day}</Typography>
    <DayButtonList day={day} onTimes={setTimes}/>
    <ActivityDropDown onActivity={setActivity} onClickButton={onClick} />
  </div>
  )
}
