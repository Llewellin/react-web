import axios from 'axios';

export const getLazy = () => {
  return axios.get('https://httpbin.org/get')
}