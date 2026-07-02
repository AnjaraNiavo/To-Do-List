import { STATUS_FILTERS } from '../../constants/taskOptions'

export default function TaskFilters({ statusFilter, onStatusChange }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {STATUS_FILTERS.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => onStatusChange(filter.id)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            statusFilter === filter.id
              ? 'bg-brand-500 text-white shadow-sm'
              : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
