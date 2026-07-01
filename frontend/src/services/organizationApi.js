import api from '../utils/api';

export const organizationApi = {
  getOverview: () => api.get('/organization'),
};
