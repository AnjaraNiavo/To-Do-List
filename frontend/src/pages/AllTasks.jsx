import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import TodayTasks from '../components/TodayTasks.jsx'

export default function AllTasks() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="All Tasks" />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <TodayTasks />
          </div>
        </main>
      </div>
    </div>
  )
}
