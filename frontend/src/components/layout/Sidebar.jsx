export default function Sidebar({
  projects,
  selectedProjectId,
  onSelectProject,
  taskCounts,
}) {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-sm">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900">TaskFlow</h1>
          <p className="text-xs text-slate-500">Organisez vos tâches</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin p-4">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Vue
        </p>
        <button
          type="button"
          onClick={() => onSelectProject(null)}
          className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            selectedProjectId === null
              ? 'bg-brand-50 text-brand-700'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span className="flex items-center gap-2">
            <span>📊</span> Toutes les tâches
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
            {taskCounts.all}
          </span>
        </button>

        <p className="mb-2 mt-6 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Projets
        </p>
        <ul className="space-y-1">
          {projects.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => onSelectProject(project.id)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  selectedProjectId === project.id
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="truncate">{project.name}</span>
                </span>
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                  {taskCounts.byProject[project.id] ?? 0}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-slate-100 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
            AN
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">Anjara Niavo</p>
            <p className="truncate text-xs text-slate-500">anjara@taskflow.dev</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
