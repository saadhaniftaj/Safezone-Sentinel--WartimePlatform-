import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Facility } from '../types';
import { mockFacilities } from '../data/mockFacilities';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const getMarkerColor = (type: string, status: string): string => {
  if (status === 'closed') return '#FF0000';
  if (status === 'emergency_only') return '#FFA500';
  if (status === 'limited_capacity') return '#FFFF00';
  
  switch (type) {
    case 'shelter':
    case 'evacuation':
      return '#00FF00';
    case 'medical':
      return '#FF0000';
    case 'food':
    case 'water':
      return '#0000FF';
    case 'communication':
    case 'security':
      return '#800080';
    default:
      return '#808080';
  }
};

const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="
      background-color: ${color};
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 4px rgba(0,0,0,0.5);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

export const Map = () => {
  const [facilities, setFacilities] = useState<Facility[]>(mockFacilities);
  const [mapCenter, setMapCenter] = useState<[number, number]>([33.6844, 73.0479]); // Islamabad coordinates

  return (
    <div className="h-[calc(100vh-4rem)] w-full">
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {facilities.map((facility) => {
          const color = getMarkerColor(facility.type, facility.status);
          const icon = createCustomIcon(color);
          
          return (
            <Marker
              key={facility.id}
              position={facility.coordinates}
              icon={icon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg">{facility.name}</h3>
                  <p className="text-sm text-gray-600">Type: {facility.type}</p>
                  <p className="text-sm text-gray-600">Status: {facility.status}</p>
                  <p className="text-sm mt-2">{facility.description}</p>
                  <p className="text-sm mt-1">Capacity: {facility.capacity}</p>
                  <p className="text-sm">Contact: {facility.contact}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}; 