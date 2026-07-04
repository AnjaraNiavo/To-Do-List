// Timeline / Gantt chart May 9-13
const DAYS = ['9 May', '10 May', '11 May', '12 May', '13 May']

const BARS = [
  { label: 'Arify Landing Page',          color: 'bg-rose-400',    start: 0, span: 2, row: 0 },
  { label: 'Scuba Icon',                  color: 'bg-sky-400',     start: 1, span: 2, row: 1 },
  { label: 'Si-oio Responsive',           color: 'bg-violet-500',  start: 0, span: 4, row: 2, featured: true },
  { label: 'Linsy Illustration',          color: 'bg-pink-400',    start: 2, span: 2, row: 3 },
  { label: 'Suborati Illustration',       color: 'bg-amber-400',   start: 3, span: 2, row: 4 },
  { label: 'Rewardino Marketing Asset',   color: 'bg-emerald-500', start: 1, span: 3, row: 5 },
]

const COL_W = 20 // % per column

export default function Timeline() {
  const currentCol = 2 // colonne "aujourd'hui"

  return (
    <div className="card fade-in mt-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-gray-900">Timeline</h2>
        <span className="text-xs text-gray-400 font-medium">May 9 – 13</span>
      </div>

      {/* En-têtes des jours */}
      <div className="flex mb-3">
        {DAYS.map((d, i) => (
          <div
            key={d}
            className={`flex-1 text-center text-xs font-semibold ${i === currentCol ? 'text-violet-600' : 'text-gray-400'}`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grille + barres */}
      <div className="relative">
        {/* Lignes de grille verticales */}
        <div className="absolute inset-0 flex pointer-events-none">
          {DAYS.map((_, i) => (
            <div key={i} className="flex-1 border-r border-gray-100 last:border-r-0" />
          ))}
        </div>

        {/* Ligne rouge "maintenant" */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-rose-400 z-10"
          style={{ left: `${(currentCol + 0.5) * COL_W}%` }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400 -translate-x-1/2 -translate-y-1/2 absolute top-0 left-0" />
        </div>

        {/* Barres */}
        <div className="flex flex-col gap-2 pb-1">
          {BARS.map((bar, i) => (
            <div key={i} className="relative h-8">
              <div
                className={`absolute top-0 h-full rounded-full flex items-center px-3 ${bar.color}
                  ${bar.featured ? 'shadow-lg shadow-violet-200/60 border-2 border-violet-300' : 'opacity-90'}
                `}
                style={{
                  left:  `${bar.start * COL_W}%`,
                  width: `${bar.span  * COL_W}%`,
                }}
              >
                <span className="text-white text-[11px] font-semibold truncate">{bar.label}</span>
                {bar.featured && (
                  <div className="w-5 h-5 rounded-full bg-white/30 border border-white/60 flex items-center justify-center text-[9px] font-bold text-white ml-auto flex-shrink-0">
                    A
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
