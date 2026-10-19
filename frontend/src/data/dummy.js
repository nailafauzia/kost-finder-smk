// DATA DUMMY — nanti diganti data dari Supabase lewat content-service
export const fasilitasList = ['WiFi', 'AC', 'Kamar Mandi Dalam', 'Parkir', 'Dapur', 'Laundry']

const foto = (n) => `https://picsum.photos/seed/kos${n}/600/400`

export const kosList = [
  { id: 1, nama: 'Kos Melati Asri', tipe: 'Putri', wilayah: 'Sleman', alamat: 'Jl. Kaliurang Km 5', lat: -7.7656, lng: 110.3808, foto: foto(1), rating: 4.7,
    fasilitas: ['WiFi', 'AC', 'Kamar Mandi Dalam'], deskripsi: 'Kos nyaman dan bersih, dekat kampus dan pusat makan.',
    kamar: [{ no: '12', tipe: 'Standar', harga: 1200000, status: 'Kosong' }, { no: '13', tipe: 'Deluxe', harga: 1600000, status: 'Terisi' }] },
  { id: 2, nama: 'Kos Mawar Putra', tipe: 'Putra', wilayah: 'Sleman', alamat: 'Jl. Colombo No. 20', lat: -7.7831, lng: 110.3902, foto: foto(2), rating: 4.3,
    fasilitas: ['WiFi', 'Parkir', 'Dapur'], deskripsi: 'Parkir luas, cocok untuk mahasiswa yang bawa motor.',
    kamar: [{ no: '01', tipe: 'Standar', harga: 900000, status: 'Kosong' }, { no: '02', tipe: 'Standar', harga: 900000, status: 'Dalam Booking' }] },
  { id: 3, nama: 'Kos Anggrek Residence', tipe: 'Campur', wilayah: 'Yogyakarta', alamat: 'Jl. Gejayan No. 8', lat: -7.7595, lng: 110.3905, foto: foto(3), rating: 4.5,
    fasilitas: ['WiFi', 'AC', 'Laundry', 'Parkir'], deskripsi: 'Kos modern ala apartemen dengan fasilitas lengkap.',
    kamar: [{ no: 'A1', tipe: 'Studio', harga: 2000000, status: 'Kosong' }, { no: 'A2', tipe: 'Studio', harga: 2000000, status: 'Kosong' }] },
  { id: 4, nama: 'Kos Kenanga', tipe: 'Putri', wilayah: 'Bantul', alamat: 'Jl. Parangtritis Km 3', lat: -7.8402, lng: 110.3615, foto: foto(4), rating: 4.0,
    fasilitas: ['WiFi', 'Dapur'], deskripsi: 'Harga ramah kantong, lingkungan tenang.',
    kamar: [{ no: '05', tipe: 'Standar', harga: 650000, status: 'Terisi' }, { no: '06', tipe: 'Standar', harga: 650000, status: 'Terisi' }] },
  { id: 5, nama: 'Kos Dahlia Putra', tipe: 'Putra', wilayah: 'Yogyakarta', alamat: 'Jl. Affandi No. 15', lat: -7.7712, lng: 110.3933, foto: foto(5), rating: 4.6,
    fasilitas: ['AC', 'Kamar Mandi Dalam', 'Laundry'], deskripsi: 'Dekat kampus, kamar luas dengan kamar mandi dalam.',
    kamar: [{ no: '21', tipe: 'Deluxe', harga: 1500000, status: 'Kosong' }] },
]

export const hargaMulai = (k) => Math.min(...k.kamar.map((m) => m.harga))
export const tersedia = (k) => k.kamar.some((m) => m.status === 'Kosong')
export const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')

// Rumus Haversine: menghitung jarak 2 titik koordinat (km)
export function jarakKm(a, b) {
  const R = 6371, rad = (d) => (d * Math.PI) / 180
  const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng)
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(x))
}

export const bookingAwal = [
  { id: 1, kos: 'Kos Melati Asri', kamar: '12', pencari: 'Rangga Pratama', tanggal: '2027-03-02', status: 'Menunggu' },
  { id: 2, kos: 'Kos Mawar Putra', kamar: '02', pencari: 'Dimas Aji', tanggal: '2027-03-04', status: 'Menunggu' },
  { id: 3, kos: 'Kos Anggrek Residence', kamar: 'A1', pencari: 'Sari Lestari', tanggal: '2027-02-25', status: 'Disetujui' },
]
