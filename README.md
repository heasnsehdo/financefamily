# FinanceFamily - Aplikasi Manajemen Keuangan Keluarga

## Deskripsi
FinanceFamily adalah aplikasi web untuk mengelola keuangan keluarga dengan fitur lengkap termasuk pencatatan transaksi, manajemen rekening, penganggaran, pengingat tagihan, dan laporan visual.

## Fitur Utama
- **Landing Page**: Halaman utama dengan informasi produk dan harga
- **Sistem Autentikasi**: Registrasi dan login untuk customer dan admin
- **Trial Gratis**: 3 hari trial gratis untuk pengguna baru
- **Dashboard Customer**: Manajemen keuangan lengkap
- **Admin Panel**: Konfirmasi pembayaran dan manajemen customer

## Struktur Halaman
- `index.html` - Landing page
- `register.html` - Halaman registrasi
- `login.html` - Halaman login
- `dashboard.html` - Dashboard customer
- `payment.html` - Halaman pembayaran
- `admin-dashboard.html` - Dashboard admin

## Fitur Dashboard Customer
1. **Overview** - Ringkasan keuangan (pemasukan, pengeluaran, saldo, total rekening)
2. **Transaksi** - Catat dan kelola pemasukan/pengeluaran
3. **Rekening** - Kelola berbagai akun (Bank, Kas, E-Wallet)
4. **Anggaran** - Buat dan pantau anggaran bulanan dengan progress bar
5. **Utang/Piutang** - Lacak utang dan piutang keluarga
6. **Tagihan** - Pengingat tagihan dengan indikator warna (hijau/kuning/merah)
7. **Tujuan** - Rencanakan tujuan keuangan (pendidikan, liburan, dll)
8. **Laporan** - Visualisasi grafik pengeluaran dan pemasukan

## Fitur Admin Panel
1. **Konfirmasi Pembayaran** - Verifikasi pembayaran customer yang masuk
2. **Data Customer** - Kelola data dan status langganan customer

## Alur Sistem
1. Pengguna register → Dapat trial gratis 3 hari
2. Setelah trial habis → Muncul notifikasi untuk berlangganan
3. Customer bayar Rp 50.000/bulan via ShopeePay/GoPay
4. Admin konfirmasi pembayaran → Akun aktif 1 bulan
5. Notifikasi pengingat sebelum langganan berakhir

## Akun Default
**Admin:**
- Email: admin@gmail.com
- Password: admin

## Pembayaran
- Metode: ShopeePay / GoPay
- Nomor: 085748575651
- Nama: Hengky Setiawan
- Biaya: Rp 50.000/bulan

## Teknologi
- React 18
- TailwindCSS
- Chart.js (untuk grafik)
- Trickle Database (penyimpanan data)
- Lucide Icons
