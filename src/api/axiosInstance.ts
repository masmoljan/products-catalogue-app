import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_API_URL;

const axiosInstance = axios.create({
  baseURL
});

export default axiosInstance;