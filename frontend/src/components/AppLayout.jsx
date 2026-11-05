import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'

export default function AppLayout({ title, children, onSearch, onUpdate }) {
  useScrollReveal()

  return (
    <div className="flex min-h-screen bg-dark text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} onSearch={onSearch} onUpdate={onUpdate} />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
