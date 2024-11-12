import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosConfig;
