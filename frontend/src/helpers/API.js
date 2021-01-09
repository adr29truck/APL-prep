import axios from 'axios';

const baseUrl = () => {
  try {
    return `${window.location.protocol}//${window.location.hostname}:5000/`
  } catch {
    return 'http://localhost:5000/'
  }
}
export default class API {

  static get(route) {
    return axios.get(baseUrl() + route)
    .then(res => {
      return res.data
    })
  }
  static post(route, data) {
    return axios.post(baseUrl() + route, data)
    .then(res => {
      return res.data
    })
  }
}