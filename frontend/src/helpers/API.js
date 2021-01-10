import axios from 'axios';

const baseUrl = () => {
  try {
    return `${window.location.protocol}//${window.location.hostname}:5000/`;
  } catch {
    return 'http://localhost:5000/';
  }
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
    return axios.get(baseUrl() + route)
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
    return axios.post(baseUrl() + route, data)
        .then((res) => {
          return res.data;
        }).catch((error) => {
          console.log(error);
        });
  }
}
