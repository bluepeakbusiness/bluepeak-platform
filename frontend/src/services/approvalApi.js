import api from '../utils/api';

export const approvalApi = {
  getApprovals: () => api.get('/approvals'),
};
