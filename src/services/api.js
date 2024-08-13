import axios from 'axios';
import { useAuth } from '../context/AuthContext';
export const baseUrl = "http://localhost:3000";

export const api = new axios.create({
  baseURL: baseUrl,
  withCredentials: true, 
})

const addInterceptor = () => {
 return ''
}
