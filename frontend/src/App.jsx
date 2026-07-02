import { useMemo } from 'react'
import Layout from './components/layout/Layout'
import { Dashboard } from './components/dashboard/Dashboard'
import TaskFilters from './components/tasks/TaskFilters'
import TaskList from './components/tasks/TaskList'
import TaskModal from './components/tasks/TaskModal'
import { useTasks } from './hooks/useTasks'

export default function App() {
  const {
    tasks,
    allTasks,
    projects,
    tags,
    stats,
    selectedProjectId,
    setSelectedProjectId,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    modalOpen,
    editingTask,
    openCreateModal,
    openEditModal,
    closeModal,
    saveTask,
    toggleTaskStatus,
    deleteTask,
  } = useTasks()

  const taskCounts = useMemo(() => {
    const active = allTasks.filter((t) => t.status !== 'archived')
    const byProject = {}
    for (const project of projects) {
      byProject[project.id] = active.filter((t) => t.projectId === project.id).length
    }
    return { all: active.length, byProject }
  }, [allTasks, projects])

  return (
    <>
      <Layout
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        taskCounts={taskCounts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddTask={openCreateModal}
      >
        <Dashboard stats={stats} />
        <TaskFilters statusFilter={statusFilter} onStatusChange={setStatusFilter} />
        <TaskList
          tasks={tasks}
          projects={projects}
          tags={tags}
          onToggle={toggleTaskStatus}
          onEdit={openEditModal}
          onDelete={deleteTask}
          onAddTask={openCreateModal}
        />
      </Layout>

      <TaskModal
        open={modalOpen}
        onClose={closeModal}
        onSave={saveTask}
        task={editingTask}
        projects={projects}
        tags={tags}
      />
    </>
  )
}
