import AppLayout from '../components/AppLayout.jsx'
import TodayTasks from '../components/TodayTasks.jsx'

export default function AllTasks() {
  return (
    <AppLayout title="Toutes les tâches">
      <div className="max-w-7xl mx-auto reveal">
        <TodayTasks />
      </div>
    </AppLayout>
  )
}
