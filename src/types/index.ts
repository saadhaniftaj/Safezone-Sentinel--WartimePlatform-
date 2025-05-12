export type FacilityType = 'shelter' | 'medical' | 'food' | 'water' | 'communication' | 'evacuation' | 'security' | 'resource';

export type FacilityStatus = 'operational' | 'limited_capacity' | 'emergency_only' | 'closed';

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  status: FacilityStatus;
  description: string;
  coordinates: [number, number];
  capacity: number;
  contact: string;
}

export interface MilitaryUpdate {
  id: string;
  zoneId: string;
  issue: string;
  status: string;
  timestamp: string;
  advice: string;
}

export interface AppState {
  facilities: Facility[];
  militaryUpdates: MilitaryUpdate[];
  activeTab: 'map' | 'reports' | 'updates' | 'admin';
} 