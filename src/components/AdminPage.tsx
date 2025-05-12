import { useState } from 'react';
import { Facility, FacilityStatus } from '../types';

interface AdminPageProps {
  onReportSubmit: (report: { facilityId: string; status: FacilityStatus; description: string }) => void;
}

export const AdminPage = ({ onReportSubmit }: AdminPageProps) => {
  const [selectedFacility, setSelectedFacility] = useState<string>('');
  const [status, setStatus] = useState<FacilityStatus>('operational');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFacility) {
      onReportSubmit({
        facilityId: selectedFacility,
        status,
        description
      });
      setDescription('');
    }
  };

  return (
    <div className="glass-panel p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-olive-300 mb-6">Admin Panel</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-olive-200 mb-2">Facility ID</label>
          <input
            type="text"
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="w-full p-2 rounded bg-white/10 border border-olive-300 text-olive-200"
            required
          />
        </div>

        <div>
          <label className="block text-olive-200 mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as FacilityStatus)}
            className="w-full p-2 rounded bg-white/10 border border-olive-300 text-olive-200"
          >
            <option value="operational">Operational</option>
            <option value="limited_capacity">Limited Capacity</option>
            <option value="emergency_only">Emergency Only</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <label className="block text-olive-200 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-white/10 border border-olive-300 text-olive-200 h-32"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-olive-600 text-white py-2 px-4 rounded hover:bg-olive-700 transition-colors"
        >
          Update Facility Status
        </button>
      </form>
    </div>
  );
}; 