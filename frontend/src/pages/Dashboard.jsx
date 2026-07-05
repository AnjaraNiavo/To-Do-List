import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import TodayTasks from '../components/TodayTasks.jsx'
import TimeManagement from '../components/TimeManagement.jsx'

export default function Dashboard() {
  const [search, setSearch] = useState('')

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar fixe */}
      <Sidebar />

      {/* Partie principale scrollable */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Dashboard" onSearch={setSearch} />

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex gap-6 max-w-7xl mx-auto">

            {/* Colonne gauche (tâches) */}
            <div className="flex-1 min-w-0">
              <TodayTasks search={search} />
            </div>

            {/* Colonne droite (stats) */}
            <div className="w-80 flex-shrink-0">
              <TimeManagement />
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
