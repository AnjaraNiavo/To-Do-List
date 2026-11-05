import AdminSidebar from './AdminSidebar.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'
import { Bell, Search } from 'lucide-react'

export default function AdminLayout({ children }) {
  useScrollReveal()

  return (
    <div className="flex min-h-screen bg-[#050505] text-white selection:bg-violet-500/30">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-8 py-4 bg-transparent border-b border-white/5 sticky top-0 z-20 backdrop-blur-md">
          <h1 className="text-sm font-bold text-white/50 uppercase tracking-[0.2em]">Espace Administrateur</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="w-full bg-white/[0.03] border border-white/5 rounded-full py-1.5 pl-9 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all"
              />
            </div>
            <button className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">
              <Bell size={14} />
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
