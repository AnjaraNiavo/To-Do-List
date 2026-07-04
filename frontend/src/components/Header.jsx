import { Search, Bell, Plus } from 'lucide-react'

export default function Header({ title = 'Dashboard' }) {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-20">
      {/* Titre */}
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>

      {/* Barre de recherche */}
      <div className="relative flex-1 max-w-sm mx-8">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all"
        />
      </div>

      <div className="flex items-center gap-3">
        {/* Bouton Add project */}
        <button className="btn-primary">
          <Plus size={16} />
          Add project
        </button>

        {/* Icône cloche */}
        <button className="relative w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-violet-50 transition-colors">
          <Bell size={18} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        {/* Avatar profil */}
        <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md hover:shadow-lg transition-shadow">
          A
        </button>
      </div>
    </header>
  )
}
