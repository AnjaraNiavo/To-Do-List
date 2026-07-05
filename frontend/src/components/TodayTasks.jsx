import { useState, useEffect } from 'react'
import { MessageCircle, Check, Clock, Trash2 } from 'lucide-react'
import api from '../api/axios'
import { CATEGORIES } from '../data/data'

export default function TodayTasks({ search = '' }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks/')
      setTasks(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggle = async (task) => {
    const newStatus = task.status === 'done' ? 'pending' : 'done'
    try {
      await api.patch(`/tasks/${task.id}/`, { status: newStatus })
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: newStatus } : t))
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la mise à jour')
    }
  }

  const deleteTask = async (id) => {
    if (!window.confirm('Supprimer cette tâche ?')) return
    try {
      await api.delete(`/tasks/${id}/`)
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la suppression')
    }
  }

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="card animate-pulse h-64 bg-gray-50"></div>

  return (
    <div className="card fade-in">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-gray-900">Tâches du jour</h2>
        <span className="text-xs text-gray-400 font-medium">
          {filteredTasks.filter(t => t.status !== 'done').length} missions en cours
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {filteredTasks.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-8">
            {search ? 'Aucun résultat pour cette recherche.' : 'Aucune tâche enregistrée.'}
          </p>
        )}
        {filteredTasks.map(task => {
          const isDone = task.status === 'done'
          const categoryData = CATEGORIES.find(c => c.value === task.category) || CATEGORIES[3]
          
          return (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
                ${isDone ? 'opacity-60 bg-gray-50' : 'hover:bg-violet-50/40'}`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggle(task)}
                className={`w-5.5 h-5.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
                  ${isDone
                    ? 'bg-violet-600 border-violet-600'
                    : 'border-gray-300 hover:border-violet-400'
                  }`}
              >
                {isDone && <Check size={12} className="text-white" strokeWidth={3} />}
              </button>

              {/* Titre et temps */}
              <div className="flex-1 flex flex-col min-w-0">
                <span className={`text-sm font-medium transition-all ${isDone ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {task.title}
                </span>
                {task.estimated_time && (
                  <div className="flex items-center gap-1 mt-0.5 text-[10px] text-gray-400 font-medium">
                    <Clock size={10} />
                    <span>{task.estimated_time}</span>
                  </div>
                )}
              </div>

              {/* Commentaires */}
              <div className="flex items-center gap-1 text-gray-400 text-xs px-2">
                <MessageCircle size={13} />
                <span>{task.comment_count || 0}</span>
              </div>

              {/* Tags */}
              <div className="hidden md:flex gap-1.5 ml-2">
                {task.tags?.map(t => (
                  <span key={t.id} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                    {t.name.toUpperCase()}
                  </span>
                ))}
              </div>

              {/* Tag Catégorie */}
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${categoryData.color}`}>
                {categoryData.label.toUpperCase()}
              </span>

              {/* Bouton Delete */}
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
