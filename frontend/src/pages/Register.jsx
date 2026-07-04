import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, Check } from 'lucide-react'
import Logo from '../components/Logo.jsx'

const PERKS = [
  'Gestion illimitée de projets',
  'Timeline visuelle interactive',
  'Collaboration équipe en temps réel',
  'Analytics et rapports détaillés',
]

function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ]
  const score = checks.filter(Boolean).length
  const colors = ['bg-gray-200', 'bg-rose-400', 'bg-amber-400', 'bg-sky-400', 'bg-emerald-500']
  const labels = ['', 'Trop faible', 'Faible', 'Moyen', 'Fort']

  if (!password) return null
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i < score ? colors[score] : 'bg-gray-100'}`} />
        ))}
      </div>
      <p className={`text-[10px] font-semibold ${['', 'text-rose-500', 'text-amber-500', 'text-sky-500', 'text-emerald-500'][score]}`}>
        {labels[score]}
      </p>
    </div>
  )
}

export default function Register() {
  const navigate  = useNavigate()
  const [show, setShow]     = useState(false)
  const [form, setForm]     = useState({ fullname: '', email: '', password: '' })
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!agreed) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl flex gap-8 items-start">

        {/* Panel gauche — avantages */}
        <div className="hidden lg:flex flex-col flex-1 pt-8">
          <div className="mb-8">
            <Logo size="lg" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
            Rejoignez <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">10 000+</span> équipes productives
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Démarrez gratuitement, aucune carte bancaire requise. Passez à Pro à tout moment.
          </p>

          <div className="flex flex-col gap-3">
            {PERKS.map(perk => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-gray-700">{perk}</span>
              </div>
            ))}
          </div>

          {/* Avatars social proof */}
          <div className="flex items-center gap-3 mt-10 bg-white rounded-2xl p-4 shadow-card">
            <div className="flex -space-x-2">
              {['bg-violet-500','bg-pink-500','bg-sky-500','bg-amber-400'].map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-xs font-bold text-white`}>
                  {['A','B','C','D'][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-xs">★</span>)}
              </div>
              <p className="text-xs text-gray-600 font-medium">Noté 4.9/5 par nos utilisateurs</p>
            </div>
          </div>
        </div>

        {/* Panel droit — formulaire */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_rgba(139,108,245,0.12)] p-8 fade-in flex-shrink-0">

          {/* Logo mobile */}
          <div className="flex justify-center mb-6 lg:hidden">
            <Logo size="md" />
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Créer un compte</h1>
          <p className="text-sm text-gray-500 mb-6">C'est gratuit et prend moins d'1 minute !</p>

          {/* OAuth */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">ou avec email</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4">
            {/* Nom */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nom complet</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="register-fullname"
                  type="text"
                  name="fullname"
                  value={form.fullname}
                  onChange={handle}
                  required
                  placeholder="Jean Dupont"
                  className="auth-input pl-10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handle}
                  required
                  placeholder="vous@exemple.com"
                  className="auth-input pl-10"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="register-password"
                  type={show ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handle}
                  required
                  placeholder="Min. 8 caractères"
                  className="auth-input pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            {/* CGU */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                id="register-agree"
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-violet-600 mt-0.5 flex-shrink-0"
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                J'accepte les <Link to="#" className="text-violet-600 font-semibold hover:underline">Conditions d'utilisation</Link> et la{' '}
                <Link to="#" className="text-violet-600 font-semibold hover:underline">Politique de confidentialité</Link>
              </span>
            </label>

            <button
              id="register-submit"
              type="submit"
              disabled={loading || !agreed}
              className="btn-primary justify-center py-3.5 rounded-xl mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <>Créer mon compte <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-violet-600 font-semibold hover:text-violet-700">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
