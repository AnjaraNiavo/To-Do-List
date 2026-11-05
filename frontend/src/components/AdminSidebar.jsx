import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, LogOut, Settings, ShieldCheck, BarChart3
} from 'lucide-react'
import Logo from './Logo.jsx'
import api from '../api/axios'

const ADMIN_NAV = [
  { icon: BarChart3, label: 'Dashboard', to: '/admin' },
  { icon: Users, label: 'Utilisateurs', to: '/admin' }, // Redundant if same page, but good for navigation scaling
]

export default function AdminSidebar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState({ username: 'Admin', email: '...' })
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me/')
        setUser(res.data)
      } catch (err) {
        console.error('Erreur profil admin:', err)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await api.post('/auth/logout/')
      navigate('/login')
    } catch (err) {
      console.error(err)
      navigate('/login')
    }
  }

  return (
    <aside className="w-64 min-h-screen bg-[#0f0f12] flex flex-col py-6 px-4 border-r border-white/5 flex-shrink-0">
      <div className="px-2 mb-10 flex items-center gap-3">
        <Logo size="md" variant="light" />
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-black uppercase tracking-tighter">Admin Panel</span>
      </div>

      <nav className="flex flex-col gap-1">
        {ADMIN_NAV.map(({ icon: Icon, label, to }, i) => {
          const active = pathname === to
          return (
            <Link
              key={i}
              to={to}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm transition-all duration-200
                ${active
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/20'
                  : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 px-2 relative">
        {showProfileMenu && (
          <div className="absolute bottom-full left-0 mb-2 w-full bg-[#1a1a1e] rounded-2xl shadow-xl border border-white/10 p-2 z-30">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        )}

        <button 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className={`flex items-center gap-3 w-full p-2 rounded-2xl transition-all duration-200 hover:bg-white/5
            ${showProfileMenu ? 'bg-white/5' : ''}`}
        >
          <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-sm uppercase flex-shrink-0">
            {user.username[0]}
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-sm font-semibold text-white truncate">{user.username}</p>
            <p className="text-[10px] text-white/30 truncate">Administrateur</p>
          </div>
        </button>
      </div>
    </aside>
  )
}
