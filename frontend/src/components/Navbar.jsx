import { Link, useNavigate } from 'react-router-dom'

export const ambilUser = () => JSON.parse(localStorage.getItem('user') || 'null')

export default function Navbar() {
  const user = ambilUser()
  const pindah = useNavigate()
  const keluar = () => { localStorage.removeItem('user'); pindah('/masuk'); location.reload() }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">🏠 Kost<span>Finder</span></Link>
      <div className="menu">
        <Link to="/cari">Cari di Peta</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user ? <button className="btn kecil" onClick={keluar}>Keluar ({user.nama})</button>
              : <Link to="/masuk" className="btn kecil">Masuk</Link>}
      </div>
    </nav>
  )
}
