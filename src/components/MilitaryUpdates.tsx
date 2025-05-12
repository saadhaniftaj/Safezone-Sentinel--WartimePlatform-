import { useState } from 'react';
import { MilitaryUpdate } from '../types';

const mockUpdates: MilitaryUpdate[] = [
  {
    id: '1',
    zoneId: 'ZONE-A',
    issue: 'Heavy shelling reported',
    status: 'Active',
    timestamp: '2024-03-20T10:30:00Z',
    advice: 'Seek immediate shelter. Avoid open areas.'
  },
  {
    id: '2',
    zoneId: 'ZONE-B',
    issue: 'Road blockades',
    status: 'Resolved',
    timestamp: '2024-03-20T09:15:00Z',
    advice: 'Alternative routes available. Use designated safe paths.'
  },
  {
    id: '3',
    zoneId: 'ZONE-C',
    issue: 'Communication disruption',
    status: 'Ongoing',
    timestamp: '2024-03-20T08:45:00Z',
    advice: 'Use emergency communication channels. Stay tuned to radio broadcasts.'
  }
];

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const MilitaryUpdates = () => {
  const [updates] = useState<MilitaryUpdate[]>(mockUpdates);

  return (
    <div className="glass-panel p-6">
      <h2 className="text-3xl font-bold text-olive-300 mb-6">Military Updates</h2>
      
      <div className="space-y-4">
        {updates.map((update) => (
          <div
            key={update.id}
            className="bg-white/10 p-4 rounded-lg border border-olive-300"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-olive-200">
                {update.issue}
              </h3>
              <span className="text-sm text-olive-300">
                {formatTimestamp(update.timestamp)}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-olive-200">Zone:</span>
              <span className="text-sm text-olive-300">{update.zoneId}</span>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-olive-200">Status:</span>
              <span className={`text-sm px-2 py-1 rounded ${
                update.status === 'Active' ? 'bg-red-500/20 text-red-300' :
                update.status === 'Resolved' ? 'bg-green-500/20 text-green-300' :
                'bg-yellow-500/20 text-yellow-300'
              }`}>
                {update.status}
              </span>
            </div>
            
            <div className="mt-3 pt-3 border-t border-olive-300/30">
              <h4 className="text-sm font-medium text-olive-200 mb-1">Advice for Civilians:</h4>
              <p className="text-sm text-olive-300">{update.advice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 