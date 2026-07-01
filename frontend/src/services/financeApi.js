import api from '../utils/api';

export const financeApi = {
  getOverview: () => api.get('/finance'),
};
