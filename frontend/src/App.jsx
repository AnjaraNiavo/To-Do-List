import { Routes, Route, Navigate } from 'react-router-dom'
import Landing  from './pages/Landing.jsx'
import Login    from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AllTasks  from './pages/AllTasks.jsx'
import Calendar  from './pages/Calendar.jsx'
import Settings  from './pages/Settings.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/"          element={<Landing  />} />
      <Route path="/login"     element={<Login    />} />
      <Route path="/register"  element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks"     element={<AllTasks  />} />
      <Route path="/calendar"  element={<Calendar  />} />
      <Route path="/settings"  element={<Settings  />} />
      <Route path="*"          element={<Navigate to="/" replace />} />
    </Routes>
  )
}
