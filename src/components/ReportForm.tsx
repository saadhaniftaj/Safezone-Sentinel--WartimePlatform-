import { useState } from 'react';
import { FacilityStatus } from '../types';

const ADMIN_SECURITY_CODE = 'ADMIN123'; // This should be moved to environment variables in production

interface ReportFormData {
  facilityId: string;
  status: FacilityStatus;
  description: string;
}

interface ReportFormProps {
  onSubmit: (report: ReportFormData) => void;
}

export const ReportForm = ({ onSubmit }: ReportFormProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [securityCode, setSecurityCode] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<ReportFormData>({
    facilityId: '',
    status: 'operational',
    description: ''
  });

  const handleSecurityCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityCode === ADMIN_SECURITY_CODE) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid security code');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSecurityCode('');
    setFormData({
      facilityId: '',
      status: 'operational',
      description: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      facilityId: '',
      status: 'operational',
      description: ''
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="glass-panel p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-olive-300 mb-4">Security Check</h2>
        <form onSubmit={handleSecurityCodeSubmit} className="space-y-4">
          <div>
            <label className="block text-olive-200 mb-2">Security Code</label>
            <input
              type="password"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              className="w-full p-2 rounded bg-white/10 border border-olive-300 text-olive-200"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-olive-600 text-white py-2 px-4 rounded hover:bg-olive-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-olive-300">Submit Report</h2>
        <button
          onClick={handleLogout}
          className="text-olive-200 hover:text-olive-100"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-olive-200 mb-2">Facility ID</label>
          <input
            type="text"
            value={formData.facilityId}
            onChange={(e) => setFormData({ ...formData, facilityId: e.target.value })}
            className="w-full p-2 rounded bg-white/10 border border-olive-300 text-olive-200"
            required
          />
        </div>

        <div>
          <label className="block text-olive-200 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as FacilityStatus })}
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
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 rounded bg-white/10 border border-olive-300 text-olive-200 h-32"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-olive-600 text-white py-2 px-4 rounded hover:bg-olive-700 transition-colors"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}; 