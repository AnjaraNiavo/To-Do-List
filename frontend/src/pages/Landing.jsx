import { Link } from 'react-router-dom'
import { CheckCircle, Zap, Users, BarChart3, Shield, Star } from 'lucide-react'
import Logo from '../components/Logo.jsx'

const FEATURES = [
  { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50', title: 'Gestion de tâches',      desc: 'Organisez, priorisez et suivez toutes vos tâches en un seul endroit.' },
  { icon: Zap,         color: 'text-amber-500',   bg: 'bg-amber-50',   title: 'Productivité boostée',  desc: 'Visualisez votre temps et optimisez votre flux de travail quotidien.' },
  { icon: Users,       color: 'text-sky-500',     bg: 'bg-sky-50',     title: 'Collaboration équipe',  desc: 'Travaillez ensemble en temps réel avec vos collègues et clients.' },
  { icon: BarChart3,   color: 'text-violet-500',  bg: 'bg-violet-50',  title: 'Analytics avancés',    desc: 'Des rapports détaillés pour piloter vos projets avec précision.' },
  { icon: Shield,      color: 'text-rose-500',    bg: 'bg-rose-50',    title: 'Sécurité maximale',    desc: 'Vos données sont protégées avec un chiffrement de bout en bout.' },
  { icon: Star,        color: 'text-pink-500',    bg: 'bg-pink-50',    title: 'Interface premium',    desc: 'Une expérience utilisateur élégante et intuitive pour chaque équipe.' },
]



export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size="md" />
          <div className="hidden md:flex items-center gap-8">
            {['Fonctionnalités', 'Tarifs', 'À propos'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-500 hover:text-violet-600 transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-violet-600 transition-colors px-4 py-2">
              Se connecter
            </Link>
            <Link to="/register" className="btn-primary">
              Inscription
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-violet-50 via-white to-pink-50">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 rounded-full px-4 py-1.5 text-xs font-semibold mb-8 animate-pulse">
            <Zap size={12} /> Nouveau : Timeline visuelle disponible
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            Gérez vos projets
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              avec élégance
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            TaskFlow est la plateforme tout-en-un pour gérer vos tâches, collaborer avec votre équipe et analyser votre productivité.
          </p>



          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 mt-14">
            {[['10k+', 'Utilisateurs actifs'], ['98%', 'Satisfaction client'], ['50+', 'Intégrations']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-extrabold text-gray-900">{num}</div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard preview mockup */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(139,108,245,0.15)] border border-gray-100">
            <div className="bg-gray-900 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 mx-4 bg-gray-800 rounded-full px-4 py-1 text-xs text-gray-500 text-center">
                taskflow.app/dashboard
              </div>
            </div>
            <div className="bg-surface p-4 aspect-[16/9] flex items-center justify-center">
              {/* Mini dashboard preview */}
              <div className="flex gap-3 w-full h-full">
                {/* Sidebar mini */}
                <div className="w-28 bg-white rounded-2xl p-3 flex flex-col gap-2 shadow-card">
                  <div className="text-xs font-extrabold text-gray-900">Task🩷Flow</div>
                  <div className="flex flex-col gap-1 mt-2">
                    {['Dashboard', 'Tâches', 'Calendrier', 'Messages'].map((item, i) => (
                      <div key={item} className={`text-[9px] font-semibold px-2 py-1.5 rounded-lg ${i === 0 ? 'bg-violet-600 text-white' : 'text-gray-400'}`}>{item}</div>
                    ))}
                  </div>
                </div>
                {/* Content mini */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="bg-white rounded-2xl p-3 shadow-card flex-1">
                    <div className="text-[9px] font-bold text-gray-700 mb-2">Tâches du jour</div>
                    {['Spexcircle Mobile App','Rewardino Marketing','Job Search Feedbacks'].map((t, i) => (
                      <div key={t} className="flex items-center gap-1.5 py-1 border-b border-gray-50 last:border-0">
                        <div className={`w-3 h-3 rounded-full border ${i === 1 ? 'bg-violet-600 border-violet-600' : 'border-gray-300'}`} />
                        <span className={`text-[8px] font-medium ${i === 1 ? 'line-through text-gray-400' : 'text-gray-700'}`}>{t}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-1">
                    <div className="flex-1 bg-white rounded-2xl p-3 shadow-card">
                      <div className="text-[9px] font-bold text-gray-700 mb-1">Temps</div>
                      <div className="text-base font-extrabold text-gray-900">7h 28m</div>
                      <div className="text-[8px] text-emerald-500 font-semibold">↑ +27m</div>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-3 shadow-card">
                      <div className="text-[9px] font-bold text-gray-700 mb-2">Projets</div>
                      {[['Rewardino', 'bg-emerald-500', 90], ['Spexcircle', 'bg-rose-500', 67]].map(([n, c, p]) => (
                        <div key={n} className="mb-1">
                          <div className="text-[7px] text-gray-600 font-medium mb-0.5">{n}</div>
                          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${c} rounded-full`} style={{ width: `${p}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="fonctionnalités" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Tout ce dont vous avez besoin</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Une suite complète d'outils pour booster la productivité de votre équipe.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 group">
                <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA final */}
      <section className="py-20 px-6 bg-gradient-to-br from-violet-600 to-pink-500">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">Prêt à transformer votre productivité ?</h2>
          <p className="text-violet-200 text-lg mb-8">Rejoignez des milliers d'équipes qui font confiance à TaskFlow.</p>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm">© 2026 TaskFlow. Tous droits réservés.</p>
          <div className="flex gap-6 text-sm">
            {['Confidentialité', 'CGU', 'Contact'].map(l => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
