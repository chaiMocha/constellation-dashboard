import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { TelemetryData } from '../types/types';
import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  satellites: TelemetryData[];
}

export default function MapView({ satellites }: MapViewProps) {
  const globalCenter: [number, number] = [0, 0];

  return (
    <div className="map-wrapper" style={{ height: '450px', width: '100%' }}>
      <MapContainer 
        center={globalCenter} 
        zoom={2} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {satellites.map((sat) => (
          <Marker 
            key={sat.satellite_id} 
            position={[sat.latitude, sat.longitude]}
          >
            <Popup>
              <div className="popup-card">
                <h3>{sat.satellite_id}</h3>
                <p><strong>Status:</strong> {sat.status}</p>
                <p><strong>Battery:</strong> {sat.battery_level}%</p>
                <p><strong>Altitude:</strong> {sat.altitude_km.toFixed(2)} km</p>
                <p><strong>Last Sync:</strong> {new Date(sat.timestamp).toLocaleTimeString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}