// export const BASE_URL='http://localhost:4000/api/v1'
// export const token = localStorage.getItem('token')


import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const BASE_URL = 'http://localhost:4000/api/v1';
export const token = cookies.get('token');
