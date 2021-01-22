/* eslint-disable no-console */
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

const baseUrl = () => {
  try {
    return `${window.location.protocol}//${window.location.hostname}:5000/`;
  } catch {
    return 'http://localhost:5000/';
  }
};

const axiosConfig: AxiosRequestConfig = {
  headers: {
    'content-Type': 'application/json',
    Accept: '/',
    'Cache-Control': 'no-cache',
    // Authorization: localStorage.getItem('jwt'),
    // FIXME: IM BROKEN
    Authorization:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTEyMzk0NjUsImV4cCI6MTYxMTMyNTg2NSwianRpIjoiYjJhNDY5YTItZGE1My00MGM1LWExNDYtMDg1ZTIxNzBkOTYwIiwiaWQiOjEsInJscyI6IiIsInJmX2V4cCI6MTYxMzgzMTQ2NX0.s702zGzynnTmyBgc0VzB6HJvccIRPMrH75pQ0YcR0fY',
  },
  // credentials: 'true',
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
  static get(route: string) {
    return axios
      .get(baseUrl() + route, axiosConfig)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  /**
   * Does post requests to the API
   * @param {string} route - string representation of API endpoint after baseUrl
   * @param {object} data - data to pass to the API
   * @return {object} JSON response from API request
   */
  static post(route: string, data: object) {
    return axios
      .post(baseUrl() + route, data, axiosConfig)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }
}
