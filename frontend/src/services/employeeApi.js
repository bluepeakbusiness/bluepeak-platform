import api from '../utils/api';

export const employeeApi = {
  getEmployees: () => api.get('/employees'),
};
