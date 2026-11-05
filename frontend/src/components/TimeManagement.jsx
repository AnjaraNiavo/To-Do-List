import { useState, useEffect } from 'react'
import api from '../api/axios'

// Sparkline SVG inline
function Sparkline() {
  const points = [
    [0, 70], [1, 55], [2, 65], [3, 40], [4, 60], [5, 30], [6, 50],
  ]
  const W = 200
  const H = 60
  const numPts = points.length - 1
  const toX = i => (i / numPts) * W
  const toY = v => H - (v / 100) * H

  const d = points
    .map(([i, v], idx) => `${idx === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`)
    .join(' ')

  const fillD = `${d} L ${toX(numPts)} ${H} L 0 ${H} Z`

  const highlight = points[4]
  const hx = toX(highlight[0])
  const hy = toY(highlight[1])

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-14 overflow-visible">
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#8b6cf5" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8b6cf5" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={fillD} fill="url(#sparkGrad)" />
        <path d={d} fill="none" stroke="#8b6cf5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className="sparkline-path"
        />
        <circle cx={hx} cy={hy} r="5" fill="#8b6cf5" stroke="white" strokeWidth="2.5" />
      </svg>

      <div className="flex justify-between mt-1 px-1">
        {['Mon','Tue','Wed','Thu','Fri'].map(d => (
          <span key={d} className="text-[10px] text-white/30 font-medium">{d}</span>
        ))}
      </div>
    </div>
  )
}

export default function TimeManagement({ refreshKey }) {
  const [stats, setStats] = useState({ 
    total: 0, completed: 0, completion_pct: 0, pending: 0, in_progress: 0 
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats/')
        setStats(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchStats()
  }, [refreshKey])

  return (
    <div className="card fade-in">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-white">Statistiques</h2>
        <span className="text-[10px] bg-emerald-500/15 text-emerald-400 font-semibold px-1.5 py-0.5 rounded-full">Global</span>
      </div>

      <div className="flex items-end gap-2 mb-2">
        <span className="text-2xl font-extrabold text-white">{stats.completion_pct}%</span>
        <span className="text-[10px] font-semibold text-emerald-400 mb-1 flex items-center gap-0.5">
          Terminées
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-white/5 p-2 rounded-xl border border-dark">
          <p className="text-[9px] font-bold text-white/40 uppercase mb-0.5">Total</p>
          <p className="text-base font-bold text-white">{stats.total || 0}</p>
        </div>
        <div className="bg-white/5 p-2 rounded-xl border border-dark">
          <p className="text-[9px] font-bold text-white/40 uppercase mb-0.5">En cours</p>
          <p className="text-base font-bold text-white">{(stats.in_progress || 0) + (stats.pending || 0)}</p>
        </div>
      </div>

      <Sparkline />
    </div>
  )
}
