export function formatDate(dateString) {
  if (!dateString) return null
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateTime(dateString) {
  if (!dateString) return null
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function isOverdue(dateString, status) {
  if (!dateString || status === 'done') return false
  return new Date(dateString) < new Date()
}

export function getProjectById(projects, id) {
  return projects.find((p) => p.id === id) ?? null
}

export function getTagsByIds(tags, ids) {
  return tags.filter((t) => ids.includes(t.id))
}
