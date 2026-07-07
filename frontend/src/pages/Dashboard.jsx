import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import TodayTasks from '../components/TodayTasks.jsx'
import TimeManagement from '../components/TimeManagement.jsx'
import MiniCalendar from '../components/MiniCalendar.jsx'

export default function Dashboard({ refreshKey: initialRefreshKey }) {
  const [search, setSearch] = useState('')
  const [refreshKey, setRefreshKey] = useState(initialRefreshKey || 0)

  const handleUpdate = () => setRefreshKey(prev => prev + 1)

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar fixe */}
      <Sidebar />

      {/* Partie principale scrollable */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Dashboard" onSearch={setSearch} onUpdate={handleUpdate} />

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex gap-6 max-w-7xl mx-auto">

            {/* Colonne gauche (tâches) */}
            <div className="flex-1 min-w-0">
              <TodayTasks search={search} onUpdate={handleUpdate} refreshKey={refreshKey} />
            </div>

            {/* Colonne droite (stats) */}
            <div className="w-80 flex-shrink-0">
              <TimeManagement refreshKey={refreshKey} />
              <MiniCalendar />
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
