function Hero() {
  try {
    return (
      <section className="gradient-bg py-20 relative overflow-hidden" data-name="hero" data-file="components/Hero.js">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4 md:mb-6">
                Kelola Keuangan Keluarga dengan Mudah dan Terorganisir
              </h1>
              <p className="text-lg text-[var(--text-secondary)] mb-8">
                Pantau pemasukan, pengeluaran, anggaran, dan tujuan keuangan keluarga Anda dalam satu aplikasi yang praktis dan aman.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="register.html" className="btn-primary text-center">
                  Coba Gratis 3 Hari
                </a>
                <button onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })} className="btn-secondary">
                  Lihat Fitur
                </button>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-4 text-center md:text-left">
                ✓ Tanpa kartu kredit • ✓ Akses penuh selama trial • ✓ Data aman terenkripsi
              </p>
            </div>
            
            <div className="relative hidden md:block">
              <div className="bg-white rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Dashboard Keuangan</h3>
                  <div className="icon-trending-up text-xl text-[var(--primary-color)]"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="text-sm">Pemasukan Bulan Ini</span>
                    <span className="font-bold text-green-600">Rp 15.000.000</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                    <span className="text-sm">Pengeluaran Bulan Ini</span>
                    <span className="font-bold text-red-600">Rp 8.500.000</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="text-sm">Saldo Tersisa</span>
                    <span className="font-bold text-blue-600">Rp 6.500.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}