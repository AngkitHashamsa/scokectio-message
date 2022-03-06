import axios from "axios";
import { api } from "./CONFIG";
axios.defaults.baseURL = api.baseURL;
const defaultAxios = () => {
  axios.interceptors.request.use((request) => {
    const token = localStorage.getItem("accessToken");
    // console.log(token);
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }

    return request;
  });

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log(response);
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
};

export default defaultAxios;
