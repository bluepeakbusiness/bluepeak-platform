import api from '../utils/api';

export const crmApi = {
  getLeads: () => api.get('/crm'),
};
