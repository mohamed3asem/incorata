import axios from 'axios';

// note : url should be in process .env but i out it here to simplify the case
const apiAxios = axios.create({
  baseURL: 'https://plotter-task.herokuapp.com/',
  headers: { Accept: 'application/json' },
});

export default apiAxios;
