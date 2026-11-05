import { useState } from 'react'
import AppLayout from '../components/AppLayout.jsx'
import TodayTasks from '../components/TodayTasks.jsx'
import TimeManagement from '../components/TimeManagement.jsx'
import MiniCalendar from '../components/MiniCalendar.jsx'

export default function Dashboard({ refreshKey: initialRefreshKey }) {
  const [search, setSearch] = useState('')
  const [refreshKey, setRefreshKey] = useState(initialRefreshKey || 0)

  const handleUpdate = () => setRefreshKey(prev => prev + 1)

  return (
    <AppLayout title="Dashboard" onSearch={setSearch} onUpdate={handleUpdate}>
      <div className="flex gap-6 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 reveal">
          <TodayTasks search={search} onUpdate={handleUpdate} refreshKey={refreshKey} />
        </div>
        <div className="w-80 flex-shrink-0 flex flex-col gap-3">
          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <TimeManagement refreshKey={refreshKey} />
          </div>
          <div className="reveal" style={{ transitionDelay: '200ms' }}>
            <MiniCalendar />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
