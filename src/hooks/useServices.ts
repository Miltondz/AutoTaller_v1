import { useData } from './useData';
import { servicesApi } from '../api/services';
import type { Service } from '../types';
import { useMockAutomotiveServices } from './useMockAutomotiveServices';

const USE_MOCK_DATA = import.meta.env.DEV && !import.meta.env.VITE_SUPABASE_URL;

export function useServices() {
  const realServices = useData<Service>(servicesApi.getAll);
  const mockServices = useMockAutomotiveServices();

  if (USE_MOCK_DATA) {
    return {
      services: mockServices.services,
      loading: mockServices.loading,
      error: mockServices.error,
      refreshServices: mockServices.refreshServices,
    };
  }

  return {
    services: realServices.data,
    loading: realServices.loading,
    error: realServices.error,
    refreshServices: realServices.refresh,
  };
}
