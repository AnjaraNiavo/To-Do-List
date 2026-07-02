import { useState, useEffect } from 'react'
import { PRIORITIES, CATEGORIES, STATUSES } from '../../constants/taskOptions'

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20'

const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700'

export default function TaskForm({ initialData, projects, tags, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'other',
    status: 'pending',
    dueDate: '',
    projectId: '',
    tagIds: [],
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
        category: initialData.category,
        status: initialData.status,
        dueDate: initialData.dueDate ? initialData.dueDate.slice(0, 16) : '',
        projectId: initialData.projectId ?? '',
        tagIds: initialData.tagIds ?? [],
      })
    }
  }, [initialData])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const toggleTag = (tagId) => {
    setForm((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(tagId)
        ? prev.tagIds.filter((id) => id !== tagId)
        : [...prev.tagIds, tagId],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return

    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      projectId: form.projectId || null,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
    })
  }

  return (
    <form id="task-form" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className={labelClass}>
          Titre *
        </label>
        <input
          id="title"
          type="text"
          required
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Ex : Préparer la présentation"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Détails de la tâche..."
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className={labelClass}>
            Priorité
          </label>
          <select
            id="priority"
            value={form.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            className={inputClass}
          >
            {Object.entries(PRIORITIES).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="category" className={labelClass}>
            Catégorie
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className={inputClass}
          >
            {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
              <option key={key} value={key}>
                {icon} {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="status" className={labelClass}>
            Statut
          </label>
          <select
            id="status"
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className={inputClass}
          >
            {Object.entries(STATUSES)
              .filter(([key]) => key !== 'archived')
              .map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="dueDate" className={labelClass}>
            Échéance
          </label>
          <input
            id="dueDate"
            type="datetime-local"
            value={form.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="project" className={labelClass}>
          Projet
        </label>
        <select
          id="project"
          value={form.projectId}
          onChange={(e) => handleChange('projectId', e.target.value)}
          className={inputClass}
        >
          <option value="">Aucun projet</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className={labelClass}>Tags</span>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const selected = form.tagIds.includes(tag.id)
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  selected
                    ? 'text-white ring-2 ring-offset-1'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                style={selected ? { backgroundColor: tag.color, ringColor: tag.color } : undefined}
              >
                #{tag.name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="hidden">
        <button type="button" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  )
}
