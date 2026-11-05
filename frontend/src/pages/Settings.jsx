import { useState, useEffect } from 'react'
import AppLayout from '../components/AppLayout.jsx'
import api from '../api/axios'

export default function Settings() {
  const [user, setUser] = useState({ username: '', email: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const res = await api.get('/auth/me/')
      setUser(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppLayout title="Paramètres">
      <div className="card reveal max-w-2xl mx-auto">
        <h3 className="text-lg font-bold mb-4 text-white">Profil</h3>
        {loading ? (
          <div className="animate-pulse h-32 bg-white/5 rounded-xl"></div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1">Nom d'utilisateur</label>
              <input 
                type="text" 
                className="auth-input" 
                value={user.username} 
                onChange={(e) => setUser({...user, username: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1">Email</label>
              <input 
                type="email" 
                className="auth-input" 
                value={user.email} 
                onChange={(e) => setUser({...user, email: e.target.value})}
              />
            </div>
            <button className="btn-primary">Enregistrer les modifications</button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
