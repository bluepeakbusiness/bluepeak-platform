import { useMemo } from 'react';
import api from '../utils/api';

export function useApi() {
  return useMemo(() => api, []);
}
