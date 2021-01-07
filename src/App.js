// import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {useState, useEffect } from 'react'

const activities = [
  {
    name: 'Sleeping',
    color: '#fff',
    id: 0
  },
  {
    name: 'Coding',
    color: "rgb(120, 120, 120)",
    id: 1
  },
  {
    name: 'Social Time',
    color: 'blue',
    id: 2
  }
]

export function App() {
  const [data, setData] = useState({
    "2021-01-02T00:00:00.000Z0": {activity: 2, checked: false},
    "2021-01-02T00:00:00.000Z1": {activity: 1, checked: false}
  })
  function generateHours(date = new Date().toISOString().split('T')[0]) {
    const t = new Date(date)


    let x = new Array(24)
    const parsedTime = t.toISOString()
    for(let i = 0; i < x.length; i++){
      let name = parsedTime + i

      if (data[name] == undefined) {
        console.log('undef data below')
        console.log(data)
        setData(prevData => ({...prevData, [name]: {checked: false}}))
        // setData(x => { return {...x, [name]: {checked: false}} })
        console.log(data)
      }
      // updateData = (d) => { temp = {...d}; temp.name = {...d[name], checked: false}}
      // setData((d) => { let temp = {...d}; temp[name] = {...temp[name], checked: false}; return temp})
      let isChecked = data[name] == null ? false : (data[name].activity == null ? false : true)
      x[i] = (<FormControlLabel
        control={
          <Checkbox
            style={ isChecked ? {color: activities.filter(activity => activity.id === data[name].activity)[0].color} : {}}
            name={name}
            // checked={data[name].checked}
            key={'box_' + i}
            color="primary"
            id={i}
            onChange={onChangeCheckBox}
          />
        }
        label={ i < 10 ? '0' + i : i }
      />)
      
    }
    return x
  }
  const [selected, setSelected] = useState([])
  const [boxStates, setBoxStates] = useState(new Array(24))
  const rendered = true

  function deSelectAll() {
    const arr = new Array(boxStates.length)
    const z  = []
    for (let _ of arr) {
      z.push(false)
    }
    console.log("Hello")
    setBoxStates(z)
  }

  useEffect(() => {
    const arr = new Array(24)
    const z  = []
    for (let _ of arr) {
      z.push(false)
    }
    setBoxStates(z)
  }, [rendered]);
  

  const [selectedActivity, setSelectedActivity] = useState(null)
  

  function onChangeCheckBox({target}) {
    if (target.checked) {
      setSelected((sel) => [...sel, target.name])
    } else {
      setSelected((sel) => sel.filter(value => value !== target.name))
    }
  }

  function onChangeSelect({target}) {
    setSelectedActivity(target.value)
  }


  function onSubmit(e) {
    e.preventDefault()
    if (selectedActivity) {
      console.log('Saving..')
      console.log(selected)
      console.log(selectedActivity)
      const button = document.querySelector('#submitButton');
      button.style.color = 'green';
      setTimeout(() => {
        button.style.color = '';
      }, 1000);
      deSelectAll()
  
    } else {
      console.log('No activity selected')
    }
    
  }

  function generateOptions() {
    return activities.map(activity => <option style={{color: "initial"}} key={'activity_' + activity.id} value={activity.id}>{activity.name}</option>)
  }

  
  return (
    <div className="App">
      <Header />
      <main>
        <LoginForm/>
        <form id="day-x" onSubmit={onSubmit}>
          <h1>{new Date().toISOString().split('T')[0]}</h1>
          <FormGroup row>
            {generateHours()}
          </FormGroup>
          <Select
            style={{color: "#fff"}}
            native
            onChange={onChangeSelect}
            inputProps={{
              name: 'age',
              id: 'age-native-helper',
            }}
          >
            <option aria-label="None" value={null} />
            {generateOptions()}
          </Select>
          <Button id="submitButton" variant="outlined" type="submit" color="primary">Submit</Button>
    
        </form>        
      </main>
    </div>
  );
}
