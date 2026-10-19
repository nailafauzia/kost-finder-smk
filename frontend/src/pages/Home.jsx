import { Link } from 'react-router-dom'
import KosCard from '../components/KosCard.jsx'
import { kosList } from '../data/dummy.js'

export default function Home() {
  return (
    <>
      <header className="hero">
        <h1>Cari kos impian,<br />langsung dari peta 🗺️</h1>
        <p>Lihat kos terdekat dari kampus, bandingkan harga & fasilitas, lalu booking survey dalam satu klik.</p>
        <Link to="/cari" className="btn besar">Mulai Cari Kos</Link>
        <div className="statistik">
          <div><b>{kosList.length}</b>Kos Aktif</div>
          <div><b>{kosList.reduce((t, k) => t + k.kamar.length, 0)}</b>Kamar</div>
          <div><b>24/7</b>Booking Online</div>
        </div>
      </header>
      <section className="wadah">
        <h2>Kos Populer</h2>
        <div className="grid">{kosList.slice(0, 4).map((k) => <KosCard key={k.id} kos={k} />)}</div>
      </section>
    </>
  )
}
