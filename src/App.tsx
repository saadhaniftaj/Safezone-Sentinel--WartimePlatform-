import { useState } from 'react'
import { Map } from './components/Map'
import { QuoteRotator } from './components/QuoteRotator'
import { ReportForm } from './components/ReportForm'
import { FacilityFilters } from './components/FacilityFilters'
import { AdminPage } from './components/AdminPage'
import { MilitaryUpdates } from './components/MilitaryUpdates'
import { mockFacilities } from './data/mockFacilities'
import type { Facility, FacilityStatus, FacilityType, FacilityFilters as FacilityFiltersType, MilitaryUpdate } from './types'
import './App.css'

interface AppState {
  isLoading: boolean;
  activeTab: 'map' | 'report' | 'info' | 'admin' | 'updates';
  currentQuote: number;
  facilityFilters: FacilityFiltersType;
  facilities: Facility[];
}

function App() {
  const [state, setState] = useState<AppState>({
    isLoading: false,
    activeTab: 'map',
    currentQuote: 0,
    facilityFilters: {
      type: null,
      status: null,
    },
    facilities: mockFacilities
  })

  const handleTabChange = (tab: 'map' | 'report' | 'info' | 'admin' | 'updates') => {
    setState(prev => ({ ...prev, activeTab: tab }))
  }

  const handleReportSubmit = (report: { facilityId: string; status: FacilityStatus; description: string }) => {
    setState(prev => ({
      ...prev,
      facilities: prev.facilities.map(facility =>
        facility.id === report.facilityId
          ? { ...facility, status: report.status, description: report.description }
          : facility
      )
    }))
  }

  const handleFilterChange = (filters: FacilityFiltersType) => {
    setState(prev => ({
      ...prev,
      facilityFilters: filters
    }))
  }

  const filteredFacilities = state.facilities.filter(facility => {
    const typeMatch = !state.facilityFilters.type || facility.type === state.facilityFilters.type
    const statusMatch = !state.facilityFilters.status || facility.status === state.facilityFilters.status
    return typeMatch && statusMatch
  })

  const renderContent = () => {
    switch (state.activeTab) {
      case 'map':
        return (
          <div className="relative">
            <div className="absolute top-4 left-4 z-10">
              <FacilityFilters
                selectedTypes={state.facilityFilters.type ? [state.facilityFilters.type] : []}
                selectedStatuses={state.facilityFilters.status ? [state.facilityFilters.status] : []}
                onTypeChange={(type) => handleFilterChange({ ...state.facilityFilters, type })}
                onStatusChange={(status) => handleFilterChange({ ...state.facilityFilters, status })}
              />
            </div>
            <div className="glass-panel p-4 h-[calc(100vh-16rem)]">
              <Map facilities={filteredFacilities} />
            </div>
            <div className="mt-4">
              <QuoteRotator />
            </div>
          </div>
        )
      case 'report':
        return (
          <div className="max-w-2xl mx-auto">
            <ReportForm onSubmit={handleReportSubmit} />
          </div>
        )
      case 'info':
        return (
          <div className="glass-panel p-6">
            <h2 className="text-4xl font-bold text-olive-300 mb-6">CE308 – Cloud Computing ⚔️</h2>
            <h3 className="text-3xl font-bold text-olive-400 mb-8">SafeZoneSentient – A Cloud-Based War Crisis Management System 🇵🇰</h3>
            
            <div className="mb-8">
              <h4 className="text-2xl font-bold text-olive-300 mb-4">Submitted by: ⚔️</h4>
              <ul className="text-olive-200 text-xl space-y-2">
                <li>Saad – 2022509</li>
                <li>Ahmed – 2022054</li>
                <li>Aiza – 2022077</li>
                <li>Mustafa – 2022407</li>
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="text-2xl font-bold text-olive-300 mb-4">Submitted to: 🇵🇰</h4>
              <p className="text-olive-200 text-xl">Ma'am Safia Baloch</p>
            </div>

            <div className="mt-8">
              <h4 className="text-2xl font-bold text-olive-300 mb-4">About SafeZone Sentinel ⚔️</h4>
              <p className="text-olive-200 text-lg mb-4">
                SafeZone Sentinel is a real-time emergency facility tracking system designed to help communities
                during crisis situations. Our platform provides up-to-date information about available resources,
                shelter locations, and emergency services.
              </p>
              <h5 className="text-xl font-bold text-olive-300 mb-2">Features 🇵🇰</h5>
              <ul className="list-disc list-inside text-olive-200 text-lg space-y-2">
                <li>Real-time facility status updates</li>
                <li>Interactive map interface</li>
                <li>Resource availability tracking</li>
                <li>Emergency reporting system</li>
                <li>Community support integration</li>
              </ul>
            </div>
          </div>
        )
      case 'admin':
        return (
          <AdminPage onReportSubmit={handleReportSubmit} />
        )
      case 'updates':
        return (
          <MilitaryUpdates />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-panel p-4 mb-4">
        <nav className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-olive-300">SafeZone Sentinel 🇵🇰</h1>
          <div className="flex space-x-4">
            <button
              className={`nav-tab ${state.activeTab === 'map' ? 'active' : ''}`}
              onClick={() => handleTabChange('map')}
            >
              Map ⚔️
            </button>
            <button
              className={`nav-tab ${state.activeTab === 'report' ? 'active' : ''}`}
              onClick={() => handleTabChange('report')}
            >
              Report ⚔️
            </button>
            <button
              className={`nav-tab ${state.activeTab === 'info' ? 'active' : ''}`}
              onClick={() => handleTabChange('info')}
            >
              Info 🇵🇰
            </button>
            <button
              className={`nav-tab ${state.activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => handleTabChange('admin')}
            >
              Admin ⚔️
            </button>
            <button
              className={`nav-tab ${state.activeTab === 'updates' ? 'active' : ''}`}
              onClick={() => handleTabChange('updates')}
            >
              Military Updates
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
