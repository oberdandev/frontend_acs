import axios from 'axios';

export const baseUrl = "http://localhost:2101";

export const api = new axios.create({
  baseURL: baseUrl
})