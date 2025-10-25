function Pricing() {
  try {
    return (
      <section id="pricing" className="py-12 md:py-20 gradient-bg" data-name="pricing" data-file="components/Pricing.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Harga Terjangkau untuk Semua Keluarga
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Mulai dengan trial gratis, lanjutkan dengan langganan bulanan
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-[var(--primary-color)] hover:shadow-3xl hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white text-center py-4">
                <span className="text-sm font-semibold uppercase tracking-wide">Paling Populer</span>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Langganan Bulanan</h3>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-[var(--primary-color)]">Rp 50.000</span>
                    <span className="text-[var(--text-secondary)] ml-2">/bulan</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    Akses penuh ke semua fitur premium
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="icon-check text-lg text-[var(--primary-color)] mt-1 mr-3"></div>
                    <span className="text-[var(--text-secondary)]">Trial gratis 3 hari</span>
                  </div>
                  <div className="flex items-start">
                    <div className="icon-check text-lg text-[var(--primary-color)] mt-1 mr-3"></div>
                    <span className="text-[var(--text-secondary)]">Akses semua fitur manajemen keuangan</span>
                  </div>
                  <div className="flex items-start">
                    <div className="icon-check text-lg text-[var(--primary-color)] mt-1 mr-3"></div>
                    <span className="text-[var(--text-secondary)]">Laporan dan grafik tanpa batas</span>
                  </div>
                  <div className="flex items-start">
                    <div className="icon-check text-lg text-[var(--primary-color)] mt-1 mr-3"></div>
                    <span className="text-[var(--text-secondary)]">Pengingat tagihan otomatis</span>
                  </div>
                  <div className="flex items-start">
                    <div className="icon-check text-lg text-[var(--primary-color)] mt-1 mr-3"></div>
                    <span className="text-[var(--text-secondary)]">Data terenkripsi dan aman</span>
                  </div>
                </div>

                <a href="register.html" className="btn-primary w-full block text-center">
                  Mulai Trial Gratis
                </a>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-[var(--text-secondary)] text-center">
                    <strong>Pembayaran via:</strong><br/>
                    ShopeePay / GoPay<br/>
                    <strong>085748575651</strong><br/>
                    a.n. Hengky Setiawan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Pricing component error:', error);
    return null;
  }
}