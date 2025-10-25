function AdminSettings() {
  const [settings, setSettings] = React.useState({
    subscriptionPrice: 50000,
    trialDays: 3,
    paymentMethods: 'ShopeePay / GoPay',
    paymentNumber: '085748575651',
    paymentName: 'Hengky Setiawan'
  });
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Pengaturan Sistem</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">Pengaturan Langganan</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Harga Langganan Bulanan (Rp)
            </label>
            <input
              type="number"
              value={settings.subscriptionPrice}
              onChange={(e) => setSettings({...settings, subscriptionPrice: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durasi Trial (Hari)
            </label>
            <input
              type="number"
              value={settings.trialDays}
              onChange={(e) => setSettings({...settings, trialDays: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">Informasi Pembayaran</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Metode Pembayaran
            </label>
            <input
              type="text"
              value={settings.paymentMethods}
              onChange={(e) => setSettings({...settings, paymentMethods: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nomor Pembayaran
            </label>
            <input
              type="text"
              value={settings.paymentNumber}
              onChange={(e) => setSettings({...settings, paymentNumber: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Penerima
            </label>
            <input
              type="text"
              value={settings.paymentName}
              onChange={(e) => setSettings({...settings, paymentName: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)]"
        >
          Simpan Pengaturan
        </button>
        {saved && (
          <span className="text-green-600 font-medium">✓ Pengaturan berhasil disimpan</span>
        )}
      </div>
    </div>
  );
}