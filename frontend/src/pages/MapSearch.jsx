import { useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import KosCard from '../components/KosCard.jsx'
import { kosList, fasilitasList, jarakKm, hargaMulai, tersedia, rupiah } from '../data/dummy.js'

export default function MapSearch() {
  const elPeta = useRef(null), peta = useRef(null), lapis = useRef(null)
  const [acuan, setAcuan] = useState({ lat: -7.7713, lng: 110.3775 }) // contoh: kampus
  const [f, setF] = useState({ radius: 5, max: 2500000, tipe: 'Semua', fas: [] })

  // 1) Filter data (otomatis jalan setiap filter berubah, tanpa reload halaman)
  const hasil = useMemo(() => kosList
    .map((k) => ({ ...k, jarak: jarakKm(acuan, k) }))
    .filter((k) => k.jarak <= f.radius && hargaMulai(k) <= f.max &&
      (f.tipe === 'Semua' || k.tipe === f.tipe) && f.fas.every((x) => k.fasilitas.includes(x)))
    .sort((a, b) => a.jarak - b.jarak), [acuan, f])

  // 2) Buat peta sekali saja
  useEffect(() => {
    peta.current = L.map(elPeta.current).setView([acuan.lat, acuan.lng], 14)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(peta.current)
    lapis.current = L.layerGroup().addTo(peta.current)
    peta.current.on('click', (e) => setAcuan({ lat: e.latlng.lat, lng: e.latlng.lng })) // klik peta = pindah titik acuan
    return () => peta.current.remove()
  }, [])

  // 3) Gambar ulang marker setiap hasil berubah
  useEffect(() => {
    lapis.current.clearLayers()
    L.circle([acuan.lat, acuan.lng], { radius: f.radius * 1000, color: '#0d9488', fillOpacity: 0.06, interactive: false }).addTo(lapis.current)
    L.marker([acuan.lat, acuan.lng], { icon: L.divIcon({ className: '', html: '<div class="acuan">📍</div>', iconSize: [30, 30] }) })
      .bindTooltip('Titik acuan').addTo(lapis.current)
    hasil.forEach((k) => {
      const warna = tersedia(k) ? 'hijau' : 'abu'
      L.marker([k.lat, k.lng], { icon: L.divIcon({ className: '', html: `<div class="pin ${warna}"></div>`, iconSize: [22, 22] }) })
        .bindPopup(`<img src="${k.foto}" width="180"><br><b>${k.nama}</b><br>Mulai ${rupiah(hargaMulai(k))}<br>${k.jarak.toFixed(1)} km dari titik acuan<br><a href="#/kos/${k.id}">Lihat detail →</a>`)
        .addTo(lapis.current)
    })
  }, [hasil, acuan, f.radius])

  const ubahFas = (x) => setF({ ...f, fas: f.fas.includes(x) ? f.fas.filter((i) => i !== x) : [...f.fas, x] })

  return (
    <div className="cari">
      <aside className="filter">
        <h3>Filter</h3>
        <label>Radius: {f.radius} km
          <input type="range" min="1" max="15" value={f.radius} onChange={(e) => setF({ ...f, radius: +e.target.value })} /></label>
        <label>Harga maks: {rupiah(f.max)}
          <input type="range" min="500000" max="3000000" step="100000" value={f.max} onChange={(e) => setF({ ...f, max: +e.target.value })} /></label>
        <label>Tipe kos
          <select value={f.tipe} onChange={(e) => setF({ ...f, tipe: e.target.value })}>
            {['Semua', 'Putra', 'Putri', 'Campur'].map((t) => <option key={t}>{t}</option>)}</select></label>
        <div className="centang">{fasilitasList.map((x) => (
          <label key={x}><input type="checkbox" checked={f.fas.includes(x)} onChange={() => ubahFas(x)} /> {x}</label>))}</div>
        <p className="redup">💡 Klik peta untuk memindahkan titik acuan.</p>
        <p><span className="pin hijau mini" /> Tersedia &nbsp; <span className="pin abu mini" /> Penuh</p>
      </aside>
      <div className="peta-wrap">
        <div ref={elPeta} className="peta" />
        <div className="daftar">
          <h3>{hasil.length} kos ditemukan</h3>
          <div className="grid kecil">{hasil.map((k) => <KosCard key={k.id} kos={k} />)}</div>
        </div>
      </div>
    </div>
  )
}
