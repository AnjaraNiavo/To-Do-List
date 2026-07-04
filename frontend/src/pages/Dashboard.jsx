import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import TodayTasks from '../components/TodayTasks.jsx'
import Timeline from '../components/Timeline.jsx'
import TimeManagement from '../components/TimeManagement.jsx'
import RecentProjects from '../components/RecentProjects.jsx'

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar fixe */}
      <Sidebar />

      {/* Partie principale scrollable */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Dashboard" />

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex gap-6 max-w-7xl mx-auto">

            {/* Colonne gauche (tâches + timeline) */}
            <div className="flex-1 min-w-0 flex flex-col">
              <TodayTasks />
              <Timeline />
            </div>

            {/* Colonne droite (stats + projets) */}
            <div className="w-80 flex-shrink-0 flex flex-col">
              <TimeManagement />
              <RecentProjects />
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
