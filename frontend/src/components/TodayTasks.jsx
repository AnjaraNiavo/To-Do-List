import { useState } from 'react'
import { MessageCircle, Check } from 'lucide-react'
import { AvatarStack } from './Avatar.jsx'

const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Spexcircle Mobile App',
    done: false,
    comments: 3,
    members: ['Anna', 'Bob', 'Carl'],
    tag: 'Spexcircle',
    tagColor: 'bg-rose-100 text-rose-600',
  },
  {
    id: 2,
    title: 'Rewardino Marketing Asset',
    done: true,
    comments: 5,
    members: ['Diana', 'Eve'],
    tag: 'Rewardino',
    tagColor: 'bg-emerald-100 text-emerald-600',
  },
  {
    id: 3,
    title: 'Job Search Feedbacks',
    done: false,
    comments: 1,
    members: ['Frank', 'Grace', 'Hank'],
    tag: 'Personal',
    tagColor: 'bg-sky-100 text-sky-600',
  },
  {
    id: 4,
    title: 'Mainbodhi Blog Page',
    done: false,
    comments: 2,
    members: ['Ivan', 'Judy'],
    tag: 'Mainbodhi',
    tagColor: 'bg-amber-100 text-amber-600',
  },
]

export default function TodayTasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)

  const toggle = (id) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))

  return (
    <div className="card fade-in">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-gray-900">Today</h2>
        <span className="text-xs text-gray-400 font-medium">{tasks.filter(t => !t.done).length} remaining</span>
      </div>

      <div className="flex flex-col gap-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
              ${task.done ? 'opacity-60 bg-gray-50' : 'hover:bg-violet-50/40'}`}
          >
            {/* Checkbox */}
            <button
              onClick={() => toggle(task.id)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
                ${task.done
                  ? 'bg-violet-600 border-violet-600'
                  : 'border-gray-300 hover:border-violet-400'
                }`}
            >
              {task.done && <Check size={11} className="text-white" strokeWidth={3} />}
            </button>

            {/* Titre */}
            <span className={`flex-1 text-sm font-medium ${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {task.title}
            </span>

            {/* Commentaires */}
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <MessageCircle size={13} />
              <span>{task.comments}</span>
            </div>

            {/* Avatars */}
            <AvatarStack names={task.members} max={3} size="xs" />

            {/* Tag projet */}
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${task.tagColor}`}>
              {task.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
