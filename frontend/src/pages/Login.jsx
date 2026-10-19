import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [mode, setMode] = useState('masuk') // masuk | daftar | otp
  const [d, setD] = useState({ nama: '', email: '', password: '', role: 'User', otp: '' })
  const [err, setErr] = useState('')
  const pindah = useNavigate()
  const isi = (k) => (e) => setD({ ...d, [k]: e.target.value })

  const simpan = () => {
    localStorage.setItem('user', JSON.stringify({ nama: d.nama || d.email.split('@')[0], email: d.email, role: d.role }))
    pindah('/dashboard'); location.reload()
  }

  const kirim = (e) => {
    e.preventDefault(); setErr('')
    if (mode === 'masuk') return simpan()                 // nanti: panggil auth-service /login
    if (mode === 'daftar') return setMode('otp')          // nanti: auth-service kirim OTP ke email
    d.otp === '123456' ? simpan() : setErr('Kode OTP salah (dummy: 123456)')
  }

  return (
    <div className="auth">
      <form className="kotak" onSubmit={kirim}>
        <h2>{mode === 'masuk' ? 'Masuk' : mode === 'daftar' ? 'Daftar Akun' : 'Verifikasi Email'}</h2>
        {mode === 'otp' ? (<>
          <p className="redup">Kode OTP dikirim ke {d.email}. (Dummy: 123456)</p>
          <input placeholder="Kode OTP" maxLength="6" value={d.otp} onChange={isi('otp')} required />
        </>) : (<>
          {mode === 'daftar' && <input placeholder="Nama lengkap" value={d.nama} onChange={isi('nama')} required />}
          <input type="email" placeholder="Email" value={d.email} onChange={isi('email')} required />
          <input type="password" placeholder="Password" value={d.password} onChange={isi('password')} required />
          <select value={d.role} onChange={isi('role')}>
            <option value="User">Pencari Kos</option><option value="Owner">Pemilik Kos</option><option value="Admin">Admin</option>
          </select>
        </>)}
        {err && <p className="error">{err}</p>}
        <button className="btn">{mode === 'masuk' ? 'Masuk' : mode === 'daftar' ? 'Kirim OTP' : 'Verifikasi'}</button>
        {mode === 'masuk' && <small className="redup">Lupa password? (fitur menyusul di tahap backend)</small>}
        <a className="ganti" onClick={() => setMode(mode === 'masuk' ? 'daftar' : 'masuk')}>
          {mode === 'masuk' ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk'}</a>
      </form>
    </div>
  )
}
