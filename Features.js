function Features() {
  try {
    const features = [
      {
        icon: 'receipt',
        title: 'Manajemen Transaksi',
        description: 'Catat semua pemasukan dan pengeluaran dengan kategori yang jelas'
      },
      {
        icon: 'credit-card',
        title: 'Multi-Rekening',
        description: 'Kelola saldo dari berbagai akun bank, kas, dan e-wallet'
      },
      {
        icon: 'target',
        title: 'Penganggaran',
        description: 'Buat dan pantau anggaran bulanan dengan progress real-time'
      },
      {
        icon: 'file-text',
        title: 'Utang & Piutang',
        description: 'Lacak semua utang dan piutang keluarga dengan mudah'
      },
      {
        icon: 'bell',
        title: 'Pengingat Tagihan',
        description: 'Notifikasi otomatis untuk tagihan yang akan jatuh tempo'
      },
      {
        icon: 'flag',
        title: 'Tujuan Keuangan',
        description: 'Rencanakan dana pendidikan, liburan, atau investasi masa depan'
      },
      {
        icon: 'chart-bar',
        title: 'Laporan Visual',
        description: 'Grafik interaktif untuk analisis keuangan yang mendalam'
      },
      {
        icon: 'shield',
        title: 'Keamanan Data',
        description: 'Data keuangan Anda terenkripsi dan tersimpan dengan aman'
      }
    ];

    return (
      <section id="features" className="py-20 bg-white" data-name="features" data-file="components/Features.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Fitur Lengkap untuk Keluarga Anda
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk mengelola keuangan keluarga dengan efektif
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl card-hover bg-white border border-[var(--border-color)]">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <div className={`icon-${feature.icon} text-xl text-[var(--primary-color)]`}></div>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Features component error:', error);
    return null;
  }
}