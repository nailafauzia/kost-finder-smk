import { Link } from 'react-router-dom'
import { hargaMulai, tersedia, rupiah } from '../data/dummy.js'

export default function KosCard({ kos }) {
  return (
    <Link to={`/kos/${kos.id}`} className="card">
      <img src={kos.foto} alt={kos.nama} />
      <div className="card-isi">
        <span className={`badge ${tersedia(kos) ? 'hijau' : 'abu'}`}>{tersedia(kos) ? 'Tersedia' : 'Penuh'}</span>
        <span className="badge tipe">{kos.tipe}</span>
        <h3>{kos.nama}</h3>
        <p className="redup">📍 {kos.wilayah} • ⭐ {kos.rating}</p>
        <p className="harga">{rupiah(hargaMulai(kos))}<small> /bulan</small></p>
      </div>
    </Link>
  )
}
