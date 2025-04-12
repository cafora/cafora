import axios from 'axios';

const API_URL = 'http://localhost:4000';

const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      if (token) {
        await axios.post(`${API_URL}/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('user');
    }
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  // Add axios interceptor to add token to all requests
  setupAxiosInterceptors: () => {
    axios.interceptors.request.use(
      (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
};

export default authService;