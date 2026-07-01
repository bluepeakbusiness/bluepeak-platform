import api from '../utils/api';

export const authApi = {
  login: (payload) => api.post('/auth/login', payload),
  register: (payload) => api.post('/auth/register', payload),
  getProfile: () => api.get('/auth/profile'),
  logout: () => Promise.resolve({ success: true }),
};
