import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, CheckSquare, Calendar, MessageCircle,
  Settings, Plus, Heart, Star, Users,
} from 'lucide-react'
import Logo from './Logo.jsx'
import { Avatar } from './Avatar.jsx'

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard',  to: '/dashboard' },
  { icon: CheckSquare,      label: 'All Task',   to: '/tasks' },
  { icon: Calendar,         label: 'Calendar',   to: '/calendar' },
  { icon: MessageCircle,    label: 'Message',    to: '/messages' },
  { icon: Settings,         label: 'Settings',   to: '/settings' },
]

const TEAM_SUROTO = ['An', 'Bo', 'Ca', 'Di', 'Ed', 'Fi']
const COLORS = ['bg-violet-500','bg-pink-500','bg-sky-500','bg-amber-400','bg-emerald-500','bg-rose-500']

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="w-60 min-h-screen bg-white flex flex-col py-6 px-4 shadow-[1px_0_0_#f0f0f5] flex-shrink-0">
      {/* Logo */}
      <div className="px-2 mb-8">
        <Logo size="md" />
      </div>

      {/* Nav principale */}
      <nav className="flex flex-col gap-1">
        {NAV.map(({ icon: Icon, label, to }) => {
          const active = pathname === to
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group
                ${active
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
                  : 'text-gray-500 hover:bg-violet-50 hover:text-violet-600'
                }`}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Section TEAMS */}
      <div className="mt-8">
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase px-2 mb-3">Teams</p>

        {/* Suroto Studios */}
        <div className="mb-4 px-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Suroto Studios</span>
            <button className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center hover:bg-violet-200 transition-colors">
              <Plus size={12} />
            </button>
          </div>
          <div className="flex items-center -space-x-1.5">
            {TEAM_SUROTO.map((init, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full border-2 border-white ${COLORS[i]} flex items-center justify-center text-[10px] font-bold text-white`}
                title={init}
              >
                {init[0]}
              </div>
            ))}
          </div>
        </div>

        {/* Umukoloid */}
        <div className="px-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">U</div>
            <span className="text-sm font-medium text-gray-600">Umukoloid</span>
          </div>
        </div>
      </div>

      {/* Section FAVORITES */}
      <div className="mt-8">
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase px-2 mb-3">Favorites</p>

        <Link to="#" className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-green-50 transition-colors group">
          <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Star size={12} className="text-white fill-white" />
          </div>
          <span className="text-sm font-medium text-gray-600 group-hover:text-emerald-600">Rewardino</span>
        </Link>

        <Link to="#" className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-rose-50 transition-colors group">
          <div className="w-6 h-6 rounded-lg bg-rose-500 flex items-center justify-center">
            <Star size={12} className="text-white fill-white" />
          </div>
          <span className="text-sm font-medium text-gray-600 group-hover:text-rose-600">Spexcircle</span>
        </Link>
      </div>

      {/* Footer utilisateur */}
      <div className="mt-auto pt-6 border-t border-gray-100 px-2 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">A</div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Anjara</p>
          <p className="text-xs text-gray-400">Pro Plan</p>
        </div>
      </div>
    </aside>
  )
}
