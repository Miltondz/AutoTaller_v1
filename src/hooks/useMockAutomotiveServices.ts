
import { useState, useEffect } from 'react';
import { mockAutomotiveServices } from '../data/mockAutomotiveServices';
import type { AutomotiveService } from '../types/automotive';

export function useMockAutomotiveServices() {
  const [services, setServices] = useState<AutomotiveService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      // Simulate async fetching
      setTimeout(() => {
        setServices(mockAutomotiveServices);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load mock services.');
      setLoading(false);
    }
  }, []);

  const refreshServices = () => {
    // In a mock environment, this could re-run the effect
    setLoading(true);
    try {
      // Simulate async fetching
      setTimeout(() => {
        setServices(mockAutomotiveServices);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load mock services.');
      setLoading(false);
    }
  };

  return { services, loading, error, refreshServices };
}
