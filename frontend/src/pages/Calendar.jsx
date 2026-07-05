import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'

export default function CalendarPage() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Calendar" />
        <main className="flex-1 p-6 overflow-auto">
          <div className="card fade-in max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
             <p className="text-gray-400 font-medium">Fonctionnalité Calendrier en cours de développement...</p>
          </div>
        </main>
      </div>
    </div>
  )
}
