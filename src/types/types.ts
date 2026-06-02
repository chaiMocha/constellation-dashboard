export interface TelemetryData {
  satellite_id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  altitude_km: number;
  battery_level: number;
  status: 'NOMINAL' | 'WARNING' | 'CRITICAL';
}