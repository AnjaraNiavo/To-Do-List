import { AvatarStack } from './Avatar.jsx'
import { TrendingUp } from 'lucide-react'

const PROJECTS = [
  {
    id: 1,
    name: 'Rewardino',
    icon: '🏆',
    iconBg: 'bg-emerald-100',
    progress: 90,
    barColor: 'bg-emerald-500',
    members: ['Anna', 'Bob', 'Carl'],
    tag: 'Marketing',
    tagColor: 'text-emerald-600',
  },
  {
    id: 2,
    name: 'Spexcircle',
    icon: '👁️',
    iconBg: 'bg-rose-100',
    progress: 67,
    barColor: 'bg-rose-500',
    members: ['Diana', 'Eve', 'Frank'],
    tag: 'Design',
    tagColor: 'text-rose-600',
  },
  {
    id: 3,
    name: 'Arify Company',
    icon: '🚀',
    iconBg: 'bg-violet-100',
    progress: 40,
    barColor: 'bg-violet-600',
    members: ['Grace', 'Hank'],
    tag: 'Dev',
    tagColor: 'text-violet-600',
  },
  {
    id: 4,
    name: 'Scuba Company',
    icon: '🤿',
    iconBg: 'bg-sky-100',
    progress: 80,
    barColor: 'bg-sky-500',
    members: ['Ivan', 'Judy', 'Karl'],
    tag: 'Branding',
    tagColor: 'text-sky-600',
  },
]

function ProjectCard({ project: p }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-card-hover transition-shadow duration-200 group cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${p.iconBg} flex items-center justify-center text-xl`}>
          {p.icon}
        </div>
        <span className={`text-xs font-bold ${p.tagColor}`}>{p.tag}</span>
      </div>

      <h3 className="text-sm font-bold text-gray-800 mb-1">{p.name}</h3>

      <div className="flex items-center justify-between mb-2">
        <AvatarStack names={p.members} max={3} size="xs" />
        <span className="text-xs font-bold text-gray-700">{p.progress}%</span>
      </div>

      {/* Barre de progression */}
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${p.barColor} transition-all duration-700`}
          style={{ width: `${p.progress}%` }}
        />
      </div>
    </div>
  )
}

export default function RecentProjects() {
  return (
    <div className="card fade-in mt-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-gray-900">Recent Projects</h2>
        <button className="text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors flex items-center gap-1">
          <TrendingUp size={13} />
          View all
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  )
}
