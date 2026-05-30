import { useState, useEffect } from 'react';
import axios from 'axios';
import type { TelemetryData } from '../types/types';

export const useTelemetry = (pollingIntervalMs: number = 5000) => {
  const [data, setData] = useState<TelemetryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get<TelemetryData[]>(`${baseUrl}/telemetry`);
        
        setData(response.data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch telemetry:", err);
        setError(err.message || 'An error occurred fetching telemetry data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTelemetry();

    const intervalId = setInterval(fetchTelemetry, pollingIntervalMs);

    return () => clearInterval(intervalId);
    
  }, [pollingIntervalMs]);

  return { data, loading, error };
};