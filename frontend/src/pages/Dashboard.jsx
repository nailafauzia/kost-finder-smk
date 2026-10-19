import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import { Navigate } from 'react-router-dom'
import { ambilUser } from '../components/Navbar.jsx'
import { bookingAwal, kosList } from '../data/dummy.js'

export default function Dashboard() {
  const user = ambilUser()
  const canvas = useRef(null)
  const [booking, setBooking] = useState(bookingAwal)
  const admin = user?.role === 'Admin'

  useEffect(() => {
    if (!user) return
    // Admin: kos per wilayah | Owner/User: okupansi kamar
    const wilayah = [...new Set(kosList.map((k) => k.wilayah))]
    const semua = kosList.flatMap((k) => k.kamar)
    const data = admin
      ? { labels: wilayah, data: wilayah.map((w) => kosList.filter((k) => k.wilayah === w).length), judul: 'Jumlah Kos per Wilayah' }
      : { labels: ['Kosong', 'Dalam Booking', 'Terisi'], data: ['Kosong', 'Dalam Booking', 'Terisi'].map((s) => semua.filter((m) => m.status === s).length), judul: 'Okupansi Kamar' }
    const c = new Chart(canvas.current, { type: 'bar',
      data: { labels: data.labels, datasets: [{ label: data.judul, data: data.data, backgroundColor: '#14b8a6', borderRadius: 8 }] } })
    return () => c.destroy()
  }, [admin])

  if (!user) return <Navigate to="/masuk" />
  const ubah = (id, status) => setBooking(booking.map((b) => (b.id === id ? { ...b, status } : b)))

  return (
    <div className="wadah">
      <h2>Halo, {user.nama} 👋 <span className="badge tipe">{user.role}</span></h2>
      <div className="grid kecil">
        <div className="kotak stat"><b>{kosList.length}</b>Kos terdaftar</div>
        <div className="kotak stat"><b>{booking.length}</b>Total booking</div>
        <div className="kotak stat"><b>{booking.filter((b) => b.status === 'Menunggu').length}</b>Menunggu approval</div>
      </div>
      <div className="kotak"><canvas ref={canvas} height="90" /></div>
      <h3>Pengajuan Booking</h3>
      <table>
        <thead><tr><th>Kos</th><th>Kamar</th><th>Pencari</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>{booking.map((b) => (
          <tr key={b.id}><td>{b.kos}</td><td>{b.kamar}</td><td>{b.pencari}</td><td>{b.tanggal}</td><td>{b.status}</td>
            <td>{b.status === 'Menunggu' && user.role === 'Owner' && (<>
              <button className="btn kecil" onClick={() => ubah(b.id, 'Disetujui')}>Setujui</button>{' '}
              <button className="btn kecil merah" onClick={() => ubah(b.id, 'Ditolak')}>Tolak</button></>)}</td></tr>))}</tbody>
      </table>
    </div>
  )
}
