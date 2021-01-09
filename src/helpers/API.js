import axios from 'axios';

export default class API {

  static get(route) {
    return axios.get('http://localhost:5000/' + route)
    .then(res => {
      return res.data
    })
  }
}