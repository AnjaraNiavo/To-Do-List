import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({
  children,
  projects,
  selectedProjectId,
  onSelectProject,
  taskCounts,
  searchQuery,
  onSearchChange,
  onAddTask,
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={onSelectProject}
        taskCounts={taskCounts}
      />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onAddTask={onAddTask}
        />
        <main className="flex-1 overflow-y-auto scrollbar-thin p-6">{children}</main>
      </div>
    </div>
  )
}
