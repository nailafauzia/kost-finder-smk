import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import MapSearch from './pages/MapSearch.jsx'
import Detail from './pages/Detail.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cari" element={<MapSearch />} />
        <Route path="/kos/:id" element={<Detail />} />
        <Route path="/masuk" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <footer className="footer">© 2026 Kost-Finder • Proyek UKK PPLG</footer>
    </>
  )
}
