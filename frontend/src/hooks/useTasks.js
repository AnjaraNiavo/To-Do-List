import { useCallback, useMemo, useState } from 'react'
import { mockProjects, mockTags, mockTasks } from '../data/mockData'

const emptyTask = {
  title: '',
  description: '',
  priority: 'medium',
  category: 'other',
  status: 'pending',
  dueDate: '',
  projectId: null,
  tagIds: [],
}

export function useTasks() {
  const [tasks, setTasks] = useState(mockTasks)
  const [projects] = useState(mockProjects)
  const [tags] = useState(mockTags)
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const stats = useMemo(() => {
    const active = tasks.filter((t) => t.status !== 'archived')
    const total = active.length
    const completed = active.filter((t) => t.status === 'done').length
    const pending = active.filter((t) => t.status === 'pending').length
    const inProgress = active.filter((t) => t.status === 'in_progress').length
    const highPriorityOpen = active.filter(
      (t) => t.priority === 'high' && t.status !== 'done',
    ).length
    const completionPct = total ? Math.round((completed / total) * 1000) / 10 : 0

    return { total, completed, pending, inProgress, highPriorityOpen, completionPct }
  }, [tasks])

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return tasks
      .filter((task) => task.status !== 'archived')
      .filter((task) => {
        if (selectedProjectId && task.projectId !== selectedProjectId) return false
        if (statusFilter !== 'all' && task.status !== statusFilter) return false
        if (query && !task.title.toLowerCase().includes(query)) return false
        return true
      })
      .sort((a, b) => a.position - b.position)
  }, [tasks, selectedProjectId, statusFilter, searchQuery])

  const openCreateModal = useCallback(() => {
    setEditingTask(null)
    setModalOpen(true)
  }, [])

  const openEditModal = useCallback((task) => {
    setEditingTask(task)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setEditingTask(null)
  }, [])

  const saveTask = useCallback(
    (formData) => {
      if (editingTask) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === editingTask.id
              ? {
                  ...t,
                  ...formData,
                  completedAt:
                    formData.status === 'done' && !t.completedAt
                      ? new Date().toISOString()
                      : formData.status !== 'done'
                        ? null
                        : t.completedAt,
                }
              : t,
          ),
        )
      } else {
        const newTask = {
          id: crypto.randomUUID(),
          ...emptyTask,
          ...formData,
          position: tasks.length,
          createdAt: new Date().toISOString(),
          completedAt: formData.status === 'done' ? new Date().toISOString() : null,
        }
        setTasks((prev) => [...prev, newTask])
      }
      closeModal()
    },
    [editingTask, tasks.length, closeModal],
  )

  const toggleTaskStatus = useCallback((taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t
        const nextStatus = t.status === 'done' ? 'pending' : 'done'
        return {
          ...t,
          status: nextStatus,
          completedAt: nextStatus === 'done' ? new Date().toISOString() : null,
        }
      }),
    )
  }, [])

  const deleteTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }, [])

  return {
    tasks: filteredTasks,
    allTasks: tasks,
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
  }
}
