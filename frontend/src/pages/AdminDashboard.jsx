import { useState, useEffect } from 'react'
import { 
  Users, CheckSquare, Clock, CheckCircle2,
  Trash2, Search, Timer
} from 'lucide-react'
import api from '../api/axios'
import AdminLayout from '../components/AdminLayout'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [statsRes, usersRes] = await Promise.all([
        api.get('/admin/stats/'),
        api.get('/admin/users/')
      ])
      setStats(statsRes.data)
      setUsers(usersRes.data)
    } catch (err) {
      console.error('Erreur admin data:', err)
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur définitivement ?')) return
    try {
      await api.delete(`/admin/users/${userId}/`)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.error || 'Erreur lors de la suppression')
    }
  }

  const formatTime = (seconds) => {
    if (!seconds || seconds <= 0) return '0 min'
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    if (h > 0) return `${h}h ${m}m`
    return `${m} min`
  }

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading && !stats) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
        </div>
      </AdminLayout>
    )
  }

  const statCards = [
    { label: 'Utilisateurs Actifs', value: stats?.active_users, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Temps Moyen / Utilisateur', value: formatTime(stats?.avg_time_seconds_per_user), icon: Clock, color: 'text-violet-400', bg: 'bg-violet-400/10' },
    { label: 'Tâches Créées / Util.', value: stats?.avg_tasks_created, icon: CheckSquare, color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { label: 'Tâches Complétées / Util.', value: stats?.avg_tasks_completed, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ]

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <div key={i} className="card group hover:border-violet-500/30 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-white/50">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={22} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* User Stats Table */}
        <div className="card !p-0 overflow-hidden">
          <div className="p-6 border-b border-dark flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-violet-400" />
              <h2 className="text-xl font-bold">Performance par Utilisateur</h2>
            </div>
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-dark/50 border border-dark rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] text-white/40 text-xs font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4">Utilisateur</th>
                  <th className="px-6 py-4">Tâches Créées</th>
                  <th className="px-6 py-4">Tâches Terminées</th>
                  <th className="px-6 py-4">Temps Total Passé</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm uppercase">
                          {u.username[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{u.username}</p>
                          <p className="text-xs text-white/40">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white/70">{u.tasks_created}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-emerald-400 font-medium">{u.tasks_completed}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Timer size={14} className="text-violet-400" />
                        {formatTime(u.total_time_seconds)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => deleteUser(u.id)}
                        className="p-2 rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Supprimer définitivement"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="p-12 text-center text-white/30">
              <p>Aucun utilisateur trouvé</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
