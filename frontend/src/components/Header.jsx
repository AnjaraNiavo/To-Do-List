import { useState, useEffect } from 'react'
import { Search, Bell, Plus, X, Clock, Tag, Folder } from 'lucide-react'
import api from '../api/axios'
import { CATEGORIES } from '../data/data'

export default function Header({ title = 'Dashboard', onSearch = () => {} }) {
  const [showModal, setShowModal] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [category, setCategory] = useState('work')
  const [projectId, setProjectId] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [loading, setLoading] = useState(false)
  
  const [projects, setProjects] = useState([])
  const [tags, setTags] = useState([])
  const [user, setUser] = useState({ username: 'A' })

  useEffect(() => {
    fetchUser()
    if (showModal) {
      fetchMetadata()
    }
  }, [showModal])

  const fetchUser = async () => {
    try {
      const res = await api.get('/auth/me/')
      setUser(res.data)
    } catch (err) {
      console.error('Erreur header:', err)
    }
  }

  const fetchMetadata = async () => {
    try {
      const [projRes, tagRes] = await Promise.all([
        api.get('/projects/'),
        api.get('/tags/')
      ])
      setProjects(projRes.data)
      setTags(tagRes.data)
    } catch (err) {
      console.error('Metadata fetch error:', err)
    }
  }

  const handleAddTask = async (e) => {
    e.preventDefault()
    if (!taskName) return
    setLoading(true)
    try {
      await api.post('/tasks/', { 
        title: taskName,
        estimated_time: estimatedTime,
        category: category,
        project_id: projectId || null,
        tag_ids: selectedTags
      })
      setTaskName('')
      setEstimatedTime('')
      setCategory('work')
      setProjectId('')
      setSelectedTags([])
      setShowModal(false)
      window.location.reload() 
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la création de la tâche')
    } finally {
      setLoading(false)
    }
  }

  const toggleTag = (id) => {
    setSelectedTags(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-20">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>

        <div className="relative flex-1 max-w-sm mx-8">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une tâche..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <Plus size={16} />
            Nouvelle tâche
          </button>

          <button className="relative w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-violet-50 transition-colors">
            <Bell size={18} className="text-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md uppercase">
            {user.username[0]}
          </button>
        </div>
      </header>

      {/* Modal Add Task */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-200 my-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">✨ Nouvelle Tâche</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleAddTask} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Titre de la tâche</label>
                <input
                  autoFocus
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Qu'y a-t-il à faire ?"
                  className="auth-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Temps estimé</label>
                  <div className="relative text-gray-400">
                    <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={estimatedTime}
                      onChange={(e) => setEstimatedTime(e.target.value)}
                      placeholder="Ex: 1h 30m"
                      className="auth-input pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Catégorie</label>
                  <div className="relative text-gray-400">
                    <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="auth-input pl-10 appearance-none bg-white font-medium"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Projet associé (Optionnel)</label>
                <div className="relative text-gray-400">
                  <Folder size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="auth-input pl-10 appearance-none bg-white font-medium"
                  >
                    <option value="">Aucun projet</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Etiquettes (Tags)</label>
                  <button 
                    type="button"
                    onClick={async () => {
                      const name = window.prompt('Nom du tag :');
                      if (name) {
                        await api.post('/tags/', { name, color: '#8b6cf5' });
                        fetchMetadata();
                      }
                    }}
                    className="text-[10px] font-bold text-violet-600 hover:underline"
                  >
                    + Nouveau
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.length === 0 && <p className="text-xs text-gray-400 italic">Aucun tag créé.</p>}
                  {tags.map(t => {
                    const selected = selectedTags.includes(t.id)
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleTag(t.id)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all
                          ${selected 
                            ? 'bg-violet-600 border-violet-600 text-white shadow-sm' 
                            : 'border-gray-200 text-gray-500 hover:border-violet-300'
                          }`}
                      >
                        {t.name.toUpperCase()}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1 justify-center py-3"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 justify-center py-3"
                >
                  {loading ? 'Création en cours...' : 'Créer la tâche'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
