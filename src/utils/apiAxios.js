import axios from 'axios';

const apiAxios = axios.create({
  baseURL: 'https://plotter-task.herokuapp.com/',
  headers: { Accept: 'application/json' },
});

export default apiAxios;
