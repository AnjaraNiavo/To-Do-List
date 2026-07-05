import { useState, useEffect } from 'react'
import { TrendingUp, Plus } from 'lucide-react'
import api from '../api/axios'

function ProjectCard({ project: p }) {
  // Calcul fictif de progression basé sur task_count pour la démo
  const progress = p.task_count > 0 ? Math.min(p.task_count * 15, 100) : 0
  
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-card-hover transition-shadow duration-200 group cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-xl`}>
          📁
        </div>
        <span className={`text-xs font-bold text-violet-600`}>{p.task_count} tâches</span>
      </div>

      <h3 className="text-sm font-bold text-gray-800 mb-1 truncate">{p.name}</h3>

      <div className="flex items-center justify-between mb-2">
        <div className="flex -space-x-1">
           <div className="w-5 h-5 rounded-full bg-gray-200 border border-white"></div>
        </div>
        <span className="text-xs font-bold text-gray-700">{progress}%</span>
      </div>

      {/* Barre de progression */}
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full bg-violet-600 transition-all duration-700`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default function RecentProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const handleAddProject = async () => {
    const name = window.prompt('Nom du nouveau projet :')
    if (!name) return
    try {
      await api.post('/projects/', { name })
      window.location.reload()
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la création du projet')
    }
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects/')
        setProjects(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (loading) return <div className="card animate-pulse h-48 bg-gray-50 mt-4"></div>

  return (
    <div className="card fade-in mt-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-gray-900">Recent Projects</h2>
        <div className="flex gap-2">
          <button 
            onClick={handleAddProject}
            className="w-7 h-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center hover:bg-violet-100 transition-colors"
          >
            <Plus size={14} />
          </button>
          <button className="text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors flex items-center gap-1">
            <TrendingUp size={13} />
            View all
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {projects.length === 0 && <p className="col-span-2 text-center text-sm text-gray-400 py-4">Aucun projet.</p>}
        {projects.slice(0, 4).map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  )
}
