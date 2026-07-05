import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, CheckSquare, Calendar, MessageCircle,
  Settings, Plus, LogOut, Star,
} from 'lucide-react'
import Logo from './Logo.jsx'
import api from '../api/axios'

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard',  to: '/dashboard' },
  { icon: CheckSquare,      label: 'All Task',   to: '/tasks' },
  { icon: Calendar,         label: 'Calendar',   to: '/calendar' },
  { icon: MessageCircle,    label: 'Message',    to: '/messages' },
  { icon: Settings,         label: 'Settings',   to: '/settings' },
]

export default function Sidebar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState({ username: '...', email: '...' })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me/')
        setUser(res.data)
      } catch (err) {
        console.error('Erreur profil:', err)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout/')
      navigate('/login')
    } catch (err) {
      console.error(err)
      navigate('/login')
    }
  }

  return (
    <aside className="w-60 min-h-screen bg-white flex flex-col py-6 px-4 shadow-[1px_0_0_#f0f0f5] flex-shrink-0">
      <div className="px-2 mb-8">
        <Logo size="md" />
      </div>

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
        
      {/* Section TEAMS supprimée */}

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

      {/* Footer utilisateur avec Logout */}
      <div className="mt-auto pt-6 border-t border-gray-100 px-2 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm uppercase">
            {user.username[0]}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{user.username}</p>
            <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-rose-500 hover:bg-rose-50 rounded-xl text-sm font-semibold transition-colors group"
        >
          <LogOut size={16} className="group-hover:rotate-12 transition-transform" />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}
