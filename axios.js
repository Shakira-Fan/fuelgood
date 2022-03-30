import axios from 'axios';

// axios.defaults.baseURL = 'https://fuel-good.herokuapp.com';

axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('token');
