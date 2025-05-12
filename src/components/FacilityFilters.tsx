import { FacilityType, FacilityStatus } from '../types';

interface FacilityFiltersProps {
  selectedTypes: FacilityType[];
  selectedStatuses: FacilityStatus[];
  onTypeChange: (type: FacilityType) => void;
  onStatusChange: (status: FacilityStatus) => void;
}

export const FacilityFilters = ({
  selectedTypes,
  selectedStatuses,
  onTypeChange,
  onStatusChange,
}: FacilityFiltersProps) => {
  const facilityTypes: FacilityType[] = [
    'shelter',
    'medical',
    'food',
    'water',
    'communication',
    'evacuation',
    'security',
    'resource'
  ];

  const facilityStatuses: FacilityStatus[] = [
    'operational',
    'limited_capacity',
    'emergency_only',
    'closed'
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Facility Types</h3>
        <div className="flex flex-wrap gap-2">
          {facilityTypes.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${selectedTypes.includes(type)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Status</h3>
        <div className="flex flex-wrap gap-2">
          {facilityStatuses.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${selectedStatuses.includes(status)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {status.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 