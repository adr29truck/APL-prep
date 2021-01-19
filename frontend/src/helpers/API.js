import axios from 'axios';

const baseUrl = () => {
  try {
    return `${window.location.protocol}//${window.location.hostname}:5000/`;
  } catch {
    return 'http://localhost:5000/';
  }
};

const axiosConfig = {
  headers: {
    'content-Type': 'application/json',
    'Accept': '/',
    'Cache-Control': 'no-cache',
    'Authorization': window.localStorage.getItem('jwt'),
  },
  credentials: 'true',
};

/**
 * Represents everythin API related
 */
export default class API {
  /**
   * Does get requests to the API
   * @param {string} route - string representation of API endpoint after baseUrl
   * @return {object} JSON response from API request
   */
  static get(route) {
    return axios.get(baseUrl() + route, axiosConfig)
        .then((res) => {
          return res.data;
        }).catch((error) => {
          console.log(error);
        });
  }

  /**
   * Does post requests to the API
   * @param {string} route - string representation of API endpoint after baseUrl
   * @param {object} data - data to pass to the API
   * @return {object} JSON response from API request
   */
  static post(route, data) {
    return axios.post(baseUrl() + route, data, axiosConfig)
        .then((res) => {
          return res.data;
        }).catch((error) => {
          console.log(error);
        });
  }
}
