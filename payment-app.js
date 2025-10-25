function PaymentApp() {
  const [user, setUser] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    const userData = checkAuth();
    if (!userData) {
      window.location.href = 'login.html';
      return;
    }
    setUser(userData);
  }, []);

  const handleSubmit = async () => {
    try {
      await trickleCreateObject('payment', {
        userId: user.id,
        amount: 50000,
        paymentMethod: 'ShopeePay/GoPay',
        status: 'pending',
        paymentDate: new Date().toISOString(),
        confirmedAt: null
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  if (!user) return null;

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="icon-check text-3xl text-green-600"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Pembayaran Terkirim!</h1>
          <p className="text-gray-600 mb-6">
            Pembayaran Anda sedang menunggu konfirmasi admin. Anda akan menerima notifikasi setelah dikonfirmasi.
          </p>
          <a href="dashboard.html" className="inline-block px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold">
            Kembali ke Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Pembayaran Langganan</h1>
          
          <div className="mb-6 p-6 bg-blue-50 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Biaya Langganan Bulanan</h2>
            <p className="text-3xl font-bold text-[var(--primary-color)]">Rp 50.000</p>
          </div>

          <div className="mb-6 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Informasi Pembayaran:</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Metode:</strong> ShopeePay / GoPay</p>
              <p><strong>Nomor:</strong> 085748575651</p>
              <p><strong>Nama:</strong> Hengky Setiawan</p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <p className="text-sm text-yellow-800">
              <strong>Petunjuk:</strong> Setelah melakukan pembayaran, klik tombol "Konfirmasi Pembayaran" di bawah. 
              Admin akan memverifikasi pembayaran Anda dan mengaktifkan akun.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)]"
          >
            Konfirmasi Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PaymentApp />);