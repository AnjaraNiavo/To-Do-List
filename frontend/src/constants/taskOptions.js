export const PRIORITIES = {
  low: { label: 'Basse', color: 'bg-emerald-100 text-emerald-700' },
  medium: { label: 'Moyenne', color: 'bg-amber-100 text-amber-700' },
  high: { label: 'Haute', color: 'bg-rose-100 text-rose-700' },
}

export const CATEGORIES = {
  work: { label: 'Travail', icon: '💼' },
  personal: { label: 'Personnel', icon: '🏠' },
  urgent: { label: 'Urgent', icon: '⚡' },
  other: { label: 'Autre', icon: '📌' },
}

export const STATUSES = {
  pending: { label: 'À faire', color: 'bg-slate-100 text-slate-600' },
  in_progress: { label: 'En cours', color: 'bg-blue-100 text-blue-700' },
  done: { label: 'Terminée', color: 'bg-emerald-100 text-emerald-700' },
  archived: { label: 'Archivée', color: 'bg-gray-100 text-gray-500' },
}

export const STATUS_FILTERS = [
  { id: 'all', label: 'Toutes' },
  { id: 'pending', label: 'À faire' },
  { id: 'in_progress', label: 'En cours' },
  { id: 'done', label: 'Terminées' },
]
