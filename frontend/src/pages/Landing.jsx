import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Zap, Users, BarChart3, Shield, Star } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'

const FEATURES = [
  { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10', title: 'Gestion de tâches',      desc: 'Organisez, priorisez et suivez toutes vos tâches en un seul endroit.' },
  { icon: Zap,         color: 'text-amber-400',   bg: 'bg-amber-500/10',   title: 'Productivité boostée',  desc: 'Visualisez votre temps et optimisez votre flux de travail quotidien.' },
  { icon: Users,       color: 'text-sky-400',     bg: 'bg-sky-500/10',     title: 'Collaboration équipe',  desc: 'Travaillez ensemble en temps réel avec vos collègues et clients.' },
  { icon: BarChart3,   color: 'text-violet-400',  bg: 'bg-violet-500/10',  title: 'Analytics avancés',    desc: 'Des rapports détaillés pour piloter vos projets avec précision.' },
  { icon: Shield,      color: 'text-rose-400',    bg: 'bg-rose-500/10',    title: 'Sécurité maximale',    desc: 'Vos données sont protégées avec un chiffrement de bout en bout.' },
  { icon: Star,        color: 'text-pink-400',    bg: 'bg-pink-500/10',    title: 'Interface premium',    desc: 'Une expérience utilisateur élégante et intuitive pour chaque équipe.' },
]

export default function Landing() {
  const [scrolled, setScrolled] = useState(false)
  useScrollReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-dark font-sans text-white overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-[#0B0B0D]/90 backdrop-blur-xl border-dark shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size="md" variant="light" />
          <div className="hidden md:flex items-center gap-8">
            {['Fonctionnalités', 'Tarifs', 'À propos'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                className="text-sm font-medium text-white/50 hover:text-violet-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-semibold text-white/70 hover:text-white transition-colors px-4 py-2"
            >
              Se connecter
            </Link>
            <Link to="/register" className="btn-primary">
              Inscription
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-pink-500/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-dark bg-surface-dark/80 text-xs font-semibold text-violet-300 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Nouvelle génération de productivité
          </div>

          <h1 className="reveal text-5xl md:text-7xl font-extrabold leading-tight mb-6" style={{ transitionDelay: '100ms' }}>
            Gérez vos projets
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              avec élégance
            </span>
          </h1>

          <p
            className="reveal text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ transitionDelay: '200ms' }}
          >
            TaskFlow est la plateforme tout-en-un pour gérer vos tâches, collaborer avec votre équipe et analyser votre productivité.
          </p>

          <div className="reveal flex flex-wrap justify-center gap-4 mb-14" style={{ transitionDelay: '300ms' }}>
            <Link to="/register" className="btn-primary px-8 py-3 text-base">
              Commencer gratuitement
            </Link>
            <a
              href="#fonctionnalites"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-dark bg-surface-dark text-white/80 font-semibold text-base hover:border-violet-500/40 hover:text-white transition-all duration-200"
            >
              Découvrir
            </a>
          </div>

          <div className="reveal flex flex-wrap justify-center gap-10" style={{ transitionDelay: '400ms' }}>
            {[['10k+', 'Utilisateurs actifs'], ['98%', 'Satisfaction client'], ['50+', 'Intégrations']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-extrabold text-white">{num}</div>
                <div className="text-sm text-white/40 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard preview mockup */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto reveal">
          <div className="rounded-3xl overflow-hidden border border-dark glow-violet shadow-[0_30px_80px_rgba(124,58,237,0.12)]">
            <div className="bg-[#1a1a1e] px-4 py-3 flex items-center gap-2 border-b border-dark">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 mx-4 bg-[#0B0B0D] rounded-full px-4 py-1 text-xs text-white/30 text-center border border-dark">
                taskflow.app/dashboard
              </div>
            </div>
            <div className="bg-surface p-4 aspect-[16/9] flex items-center justify-center">
              <div className="flex gap-3 w-full h-full">
                <div className="w-28 bg-white rounded-2xl p-3 flex flex-col gap-2 shadow-card">
                  <div className="text-xs font-extrabold text-gray-900">Task🩷Flow</div>
                  <div className="flex flex-col gap-1 mt-2">
                    {['Dashboard', 'Tâches', 'Calendrier', 'Messages'].map((item, i) => (
                      <div key={item} className={`text-[9px] font-semibold px-2 py-1.5 rounded-lg ${i === 0 ? 'bg-violet-600 text-white' : 'text-gray-400'}`}>{item}</div>
                    ))}
                  </div>
                </div>
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
      <section id="fonctionnalites" className="py-20 px-6 bg-surface-dark/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="reveal text-4xl font-extrabold text-white mb-4">Tout ce dont vous avez besoin</h2>
            <p className="reveal text-white/50 text-lg max-w-xl mx-auto" style={{ transitionDelay: '100ms' }}>
              Une suite complète d'outils pour booster la productivité de votre équipe.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, color, bg, title, desc }, i) => (
              <div
                key={title}
                className="reveal bg-[#121214] rounded-2xl p-6 border border-dark hover:border-violet-500/30 hover:glow-violet transition-all duration-300 group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center reveal">
          <div className="relative rounded-3xl overflow-hidden px-8 py-16 bg-gradient-to-br from-violet-600/90 to-pink-500/90 glow-pink">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAwdjYwTTAgMzBoNjAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-40" />
            <h2 className="relative text-4xl font-extrabold text-white mb-4">
              Prêt à transformer votre productivité ?
            </h2>
            <p className="relative text-violet-100 text-lg mb-8">
              Rejoignez des milliers d'équipes qui font confiance à TaskFlow.
            </p>
            <Link to="/register" className="relative inline-flex btn-primary px-8 py-3 text-base bg-white text-violet-700 hover:from-white hover:to-white shadow-lg">
              Créer mon compte
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-dark">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 reveal">
          <Logo size="sm" variant="light" />
          <p className="text-sm text-white/40">© 2026 TaskFlow. Tous droits réservés.</p>
          <div className="flex gap-6 text-sm text-white/40">
            {['Confidentialité', 'CGU', 'Contact'].map(l => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
