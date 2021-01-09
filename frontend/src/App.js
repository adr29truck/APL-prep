// import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import  Typography from '@material-ui/core/Typography';
import {useState, useEffect } from 'react'
import {DayButtonList} from './components/DayButtonList';
import {ActivityDropDown} from './components/ActivityDropDown';
import API from './helpers/API';


// async function API(route) {
//   return axios.get('http://localhost:5000/' + route)
//       .then(res => {
//         return res.data
//       })
// }


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
// export function App() {

//   const [activities, setActivities] = useState([])

//   const [data, setData] = useState({
//     "2021-01-02T00:00:00.000Z0": {activity: 2, checked: false},
//     "2021-01-02T00:00:00.000Z1": {activity: 1, checked: false}
//   })
//   function generateHours(date = new Date().toISOString().split('T')[0]) {
//     const t = API('/times/' + date + '/1');

//     console.log(t);
//     let x = new Array(24)
//     // const parsedTime = t.toISOString()
//     for(let z of t){
//       let name = z

//       if (data[name] == undefined) {
//         console.log('undef data below');
//         console.log(data);
//         setData(prevData => ({...prevData, [name]: {checked: false}}));
//         // setData(x => { return {...x, [name]: {checked: false}} });
//         console.log(data);
//       };
//       // updateData = (d) => { temp = {...d}; temp.name = {...d[name], checked: false}}
//       // setData((d) => { let temp = {...d}; temp[name] = {...temp[name], checked: false}; return temp})
//       let isChecked = data[name] == null ? false : (data[name].activity == null ? false : true)
//       x[z.id-1] = (<FormControlLabel
//         control={
//           <Checkbox
//             style={ isChecked ? {color: activities.filter(activity => activity.id === data[name].activity)[0].color} : {}}
//             name={name}
//             // checked={data[name].checked}
//             key={'box_' + z.id-1}
//             color="primary"
//             id={z.id-1}
//             onChange={onChangeCheckBox}
//           />
//         }
//         label={ z.id-1 < 10 ? '0' + z.id : z.id }
//       />)
      
//     }
//     return x
//   }
//   const [selected, setSelected] = useState([])
//   const [boxStates, setBoxStates] = useState(new Array(24))
//   const rendered = true

//   function deSelectAll() {
//     const arr = new Array(boxStates.length)
//     const z  = []
//     for (let _ of arr) {
//       z.push(false)
//     }
//     setBoxStates(z)
//   }

//   useEffect(() => {
//     const temp = async () => {
//       let tempp = await API('activities');
//       setActivities(tempp);
//     }
//     temp()
//     const arr = new Array(24)
//     const z  = []
//     for (let _ of arr) {
//       z.push(false)
//     }
//     setBoxStates(z)
//   }, [rendered]);
  

//   const [selectedActivity, setSelectedActivity] = useState(null)
  

//   function onChangeCheckBox({target}) {
//     if (target.checked) {
//       setSelected((sel) => [...sel, target.name])
//     } else {
//       setSelected((sel) => sel.filter(value => value !== target.name))
//     }
//   }

//   function onChangeSelect({target}) {
//     setSelectedActivity(target.value)
//   }


//   function onSubmit(e) {
//     e.preventDefault()
//     if (selectedActivity) {
//       console.log('Saving..')
//       console.log(selected)
//       console.log(selectedActivity)
//       for (let x of selected) {
//         axios.post('http://localhost:5000/' + `times/${x}/1`, {id:1, activity:1})
//           .then(res => {
//             return res.data
//           })
//       }
//       const button = document.querySelector('#submitButton');
//       button.style.color = 'green';
//       setTimeout(() => {
//         button.style.color = '';
//       }, 1000);
//       deSelectAll()
  
//     } else {
//       console.log('No activity selected')
//     }
    
//   }

//   function generateOptions() {
//     return activities.map(activity => <option style={{color: "initial"}} key={'activity_' + activity.id} value={activity.id}>{activity.name}</option>)
//   }

  
//   return (
//     <div className="App">
//       <Header />
//       <main>
//         <LoginForm/>
//         <form id="day-x" onSubmit={onSubmit}>
//           <h1>{new Date().toISOString().split('T')[0]}</h1>
//           <FormGroup row>
//             {generateHours()}
//           </FormGroup>
//           <Select
//             style={{color: "#fff"}}
//             native
//             onChange={onChangeSelect}
//             inputProps={{
//               name: 'age',
//               id: 'age-native-helper',
//             }}
//           >
//             <option aria-label="None" value={null} />
//             {generateOptions()}
//           </Select>
//           <Button id="submitButton" variant="outlined" type="submit" color="primary">Submit</Button>
    
//         </form>        
//       </main>
//     </div>
//   );
// }
