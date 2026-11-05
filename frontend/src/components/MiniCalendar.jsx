import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function MiniCalendar() {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  
  // Hardcoded current month data (July 2026 for example)
  const monthName = "Juillet 2026"
  const totalDays = 31
  const startOffset = 2 // Starts on Wednesday if 1st is Wednesday (index 2)
  
  const dates = []
  // Empty slots for offset
  for (let i = 0; i < startOffset; i++) dates.push(null)
  // Real dates
  for (let i = 1; i <= totalDays; i++) dates.push(i)

  const events = [7, 12, 13, 21, 28] // Days with task dots

  return (
    <div className="card mt-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-extrabold text-white">{monthName}</h3>
        <div className="flex gap-1">
          <button className="p-0.5 hover:bg-white/5 rounded-lg text-white/30 hover:text-violet-400 transition-colors">
            <ChevronLeft size={14} />
          </button>
          <button className="p-0.5 hover:bg-white/5 rounded-lg text-white/30 hover:text-violet-400 transition-colors">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-1 mb-1">
        {days.map((d, i) => (
          <div key={i} className="text-[9px] font-bold text-white/30 text-center uppercase tracking-tighter">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {dates.map((date, i) => {
          const isToday = date === 7
          const hasEvent = events.includes(date)

          return (
            <div key={i} className="aspect-square flex flex-col items-center justify-center relative group cursor-pointer">
              {date && (
                <>
                  <div className={`w-6 h-6 flex items-center justify-center rounded-lg text-[9px] font-semibold transition-all duration-200
                    ${isToday ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/40 scale-110' : 'text-white/70 hover:bg-violet-500/15 hover:text-violet-400'}
                  `}>
                    {date}
                  </div>
                  {hasEvent && !isToday && (
                    <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-violet-400 group-hover:bg-violet-600" />
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-dark">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-white/40 font-medium tracking-tight">Prochain événement</span>
          <span className="text-violet-400 font-bold bg-violet-500/15 px-2 py-0.5 rounded-full">12 Juil.</span>
        </div>
      </div>
    </div>
  )
}
