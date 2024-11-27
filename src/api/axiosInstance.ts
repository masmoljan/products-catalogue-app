import axios from 'axios';

const baseURL = 'https://dummyjson.com/';

const axiosInstance = axios.create({
  baseURL
});

export default axiosInstance;