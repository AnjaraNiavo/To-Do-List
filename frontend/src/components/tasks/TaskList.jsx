import TaskCard from './TaskCard'
import EmptyState from '../ui/EmptyState'
import Button from '../ui/Button'

export default function TaskList({ tasks, projects, tags, onToggle, onEdit, onDelete, onAddTask }) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        title="Aucune tâche trouvée"
        description="Créez une nouvelle tâche ou modifiez vos filtres pour voir plus de résultats."
        action={
          <Button onClick={onAddTask}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Créer une tâche
          </Button>
        }
      />
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          projects={projects}
          tags={tags}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
