import { useState, useEffect } from 'react';
import type { ServiceTracking } from '../types/automotive';

export function useMockServiceTracking() {
  const [trackingData, setTrackingData] = useState<ServiceTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch('/data/mockServiceTracking.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ServiceTracking[] = await response.json();
        setTrackingData(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMockData();
  }, []);

  return { trackingData, loading, error };
}
