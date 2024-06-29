import axios from axios;
const API_URL = 'http://localhost:2101/';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });
  
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
      }
      
      return response;
    } catch (e) {
      return e.response;
    }
  },

  logout: () => {
   return localStorage.removeItem('token');
  },

  getToken: () => {
    return localStorage.getItem('token');
  }

  

}

/* interceptador axios. pesquisar e fazser isso depois
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
*/


export default authService;