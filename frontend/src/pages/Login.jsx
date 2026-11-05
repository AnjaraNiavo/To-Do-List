import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'
import api from '../api/axios'

export default function Login() {
  const navigate = useNavigate()
  const [show, setShow]   = useState(false)
  const [form, setForm]   = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useScrollReveal()

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/login/', form)
      if (res.data.user?.is_staff) {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError('Identifiants incorrects ou erreur serveur.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const socialLogin = (provider) => {
    window.location.href = `http://localhost:8000/api/auth/social/${provider.toLowerCase()}/login/`
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-pink-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="reveal w-full max-w-md bg-surface-dark border border-dark rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8 relative">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" variant="light" />
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-1">Bon retour ! 👋</h1>
          <p className="text-sm text-white/50">Connectez-vous pour accéder à votre espace</p>
        </div>

        <div className="flex gap-3 mb-6">
          <button onClick={() => socialLogin('Google')} className="flex-1 flex items-center justify-center gap-2 border border-dark rounded-xl py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
          <button onClick={() => socialLogin('GitHub')} className="flex-1 flex items-center justify-center gap-2 border border-dark rounded-xl py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
            GitHub
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-dark" />
          <span className="text-xs text-white/30 font-medium">ou continuez avec identifiants</span>
          <div className="flex-1 h-px bg-dark" />
        </div>

        {error && <div className="mb-4 p-3 bg-rose-500/10 text-rose-400 text-xs font-semibold rounded-xl border border-rose-500/20">{error}</div>}

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-white/60 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                name="username"
                value={form.username}
                onChange={handle}
                required
                placeholder="email@gmail.com"
                className="auth-input pl-10"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-white/60">Mot de passe</label>
              <Link to="#" className="text-xs text-violet-400 font-medium hover:text-violet-300">Mot de passe oublié ?</Link>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type={show ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handle}
                required
                placeholder="••••••••"
                className="auth-input pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary justify-center py-3.5 rounded-xl mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion...' : <><>Se connecter</> <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="text-center text-sm text-white/40 mt-6">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-violet-400 font-semibold hover:text-violet-300">Créer un compte</Link>
        </p>
      </div>
    </div>
  )
}
