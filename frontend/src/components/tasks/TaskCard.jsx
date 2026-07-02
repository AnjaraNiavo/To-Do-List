import Badge from '../ui/Badge'
import { PRIORITIES, STATUSES, CATEGORIES } from '../../constants/taskOptions'
import { formatDateTime, getProjectById, getTagsByIds, isOverdue } from '../../utils/helpers'

export default function TaskCard({
  task,
  projects,
  tags,
  onToggle,
  onEdit,
  onDelete,
}) {
  const project = getProjectById(projects, task.projectId)
  const taskTags = getTagsByIds(tags, task.tagIds)
  const overdue = isOverdue(task.dueDate, task.status)

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-brand-200 hover:shadow-md">
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          aria-label={task.status === 'done' ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            task.status === 'done'
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : 'border-slate-300 hover:border-brand-500'
          }`}
        >
          {task.status === 'done' && (
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`text-base font-semibold ${
                task.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-900'
              }`}
            >
              {task.title}
            </h3>
            <Badge className={PRIORITIES[task.priority].color}>
              {PRIORITIES[task.priority].label}
            </Badge>
            <Badge className={STATUSES[task.status].color}>
              {STATUSES[task.status].label}
            </Badge>
          </div>

          {task.description && (
            <p className="mt-2 line-clamp-2 text-sm text-slate-500">{task.description}</p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              {CATEGORIES[task.category].icon} {CATEGORIES[task.category].label}
            </span>
            {project && (
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                {project.name}
              </span>
            )}
            {task.dueDate && (
              <span className={`flex items-center gap-1 ${overdue ? 'font-medium text-rose-600' : ''}`}>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDateTime(task.dueDate)}
                {overdue && ' · En retard'}
              </span>
            )}
          </div>

          {taskTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {taskTags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-md px-2 py-0.5 text-xs font-medium text-white"
                  style={{ backgroundColor: tag.color }}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Modifier"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
            aria-label="Supprimer"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}
