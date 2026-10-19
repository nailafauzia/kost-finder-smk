import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { kosList, rupiah, tersedia } from '../data/dummy.js'
import { ambilUser } from '../components/Navbar.jsx'

export default function Detail() {
  const { id } = useParams()
  const kos = kosList.find((k) => k.id === +id)
  const [form, setForm] = useState({ kamar: '', tanggal: '' })
  const [ok, setOk] = useState(false)
  const user = ambilUser()

  if (!kos) return <div className="wadah">Kos tidak ditemukan.</div>

  const kirim = (e) => { e.preventDefault(); setOk(true) } // nanti: kirim ke content-service

  return (
    <div className="wadah detail">
      <Link to="/cari">← Kembali ke peta</Link>
      <img className="foto-besar" src={kos.foto} alt={kos.nama} />
      <div className="detail-isi">
        <section>
          <h1>{kos.nama} <span className={`badge ${tersedia(kos) ? 'hijau' : 'abu'}`}>{kos.tipe}</span></h1>
          <p className="redup">📍 {kos.alamat}, {kos.wilayah} • ⭐ {kos.rating} / 5</p>
          <p>{kos.deskripsi}</p>
          <h3>Fasilitas</h3>
          <div>{kos.fasilitas.map((x) => <span key={x} className="badge tipe">{x}</span>)}</div>
          <h3>Daftar Kamar</h3>
          <table>
            <thead><tr><th>No</th><th>Tipe</th><th>Harga/bulan</th><th>Status</th></tr></thead>
            <tbody>{kos.kamar.map((m) => (
              <tr key={m.no}><td>{m.no}</td><td>{m.tipe}</td><td>{rupiah(m.harga)}</td>
                <td><span className={`badge ${m.status === 'Kosong' ? 'hijau' : 'abu'}`}>{m.status}</span></td></tr>))}</tbody>
          </table>
        </section>
        <form className="kotak" onSubmit={kirim}>
          <h3>Booking Survey / Kamar</h3>
          {!user ? <p>Silakan <Link to="/masuk">masuk</Link> dulu untuk booking.</p> : ok ? (
            <p className="sukses">✅ Pengajuan terkirim! Menunggu persetujuan pemilik kos.</p>
          ) : (<>
            <label>Pilih kamar
              <select required value={form.kamar} onChange={(e) => setForm({ ...form, kamar: e.target.value })}>
                <option value="">-- pilih --</option>
                {kos.kamar.filter((m) => m.status === 'Kosong').map((m) => <option key={m.no} value={m.no}>No. {m.no} - {m.tipe}</option>)}
              </select></label>
            <label>Tanggal
              <input type="date" required value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} /></label>
            <button className="btn">Ajukan Booking</button>
          </>)}
        </form>
      </div>
    </div>
  )
}
