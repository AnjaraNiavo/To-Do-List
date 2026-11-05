import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, CheckSquare, Calendar, MessageCircle,
  Settings, Plus, LogOut, Star, ShieldCheck,
} from 'lucide-react'
import Logo from './Logo.jsx'
import api from '../api/axios'

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard',  to: '/dashboard' },
  { icon: CheckSquare,      label: 'Toutes les tâches',   to: '/tasks' },
  { icon: Calendar,         label: 'Calendrier',   to: '/calendar' },
  { icon: MessageCircle,    label: 'Messages',    to: '/messages' },
]

export default function Sidebar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState({ username: '...', email: '...' })
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [countdown, setCountdown] = useState(15)

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

  const handleLogout = () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    
    let timeLeft = 10
    const interval = setInterval(() => {
      timeLeft -= 1
      setCountdown(timeLeft)
      
      if (timeLeft <= 0) {
        clearInterval(interval)
        performLogout()
      }
    }, 1000)
  }

  const performLogout = async () => {
    try {
      await api.post('/auth/logout/')
      navigate('/login')
    } catch (err) {
      console.error(err)
      navigate('/login')
    }
  }

  return (
    <aside className="w-60 min-h-screen bg-surface-dark flex flex-col py-6 px-4 border-r border-dark flex-shrink-0">
      <div className="px-2 mb-8">
        <Logo size="md" variant="light" />
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
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-900/40'
                  : 'text-white/50 hover:bg-white/5 hover:text-violet-400'
                }`}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
              {label}
            </Link>
          )
        })}
      </nav>
        
      {/* Section TEAMS supprimée */}


      {/* Footer utilisateur */}
      <div className="mt-auto pt-6 border-t border-dark px-2 relative">
        {showProfileMenu && (
          <div className="absolute bottom-full left-0 mb-2 w-full bg-[#1a1a1e] rounded-2xl shadow-xl border border-dark p-2 animate-in fade-in slide-in-from-bottom-2 duration-200 z-30">
            <Link 
              to="/settings"
              onClick={() => setShowProfileMenu(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:bg-violet-500/10 hover:text-violet-400 rounded-xl text-sm font-medium transition-colors"
            >
              <Settings size={16} />
              Modifier profil
            </Link>
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mt-1
                ${isLoggingOut 
                  ? 'bg-white/5 text-white/30 cursor-wait' 
                  : 'text-rose-400 hover:bg-rose-500/10'}`}
            >
              <LogOut size={16} className={isLoggingOut ? 'animate-spin' : ''} />
              {isLoggingOut ? `Déconnexion` : 'Déconnexion'}
            </button>
          </div>
        )}

        <button 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className={`flex items-center gap-3 w-full p-2 rounded-2xl transition-all duration-200 
            ${showProfileMenu ? 'bg-white/5' : 'hover:bg-white/5'}`}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm uppercase flex-shrink-0 shadow-sm">
            {user.username[0]}
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-sm font-semibold text-white truncate">{user.username}</p>
          </div>
        </button>
      </div>
    </aside>
  )
}
