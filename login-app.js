function LoginApp() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const users = await trickleListObjects('user', 100, true);
      const user = users.items.find(
        u => u.objectData.email === formData.email && u.objectData.password === formData.password
      );

      if (!user) {
        setError('Email atau password salah');
        setLoading(false);
        return;
      }

      if (user.objectData.role === 'customer') {
        const now = new Date();
        const trialEnd = new Date(user.objectData.trialEndDate);
        const subEnd = user.objectData.subscriptionEndDate ? new Date(user.objectData.subscriptionEndDate) : null;

        if (user.objectData.subscriptionStatus === 'trial' && now > trialEnd) {
          await trickleUpdateObject('user', user.objectId, {
            ...user.objectData,
            subscriptionStatus: 'expired'
          });
          setError('Masa trial Anda telah berakhir. Silakan berlangganan untuk melanjutkan.');
          setLoading(false);
          return;
        }

        if (user.objectData.subscriptionStatus === 'active' && subEnd && now > subEnd) {
          await trickleUpdateObject('user', user.objectId, {
            ...user.objectData,
            subscriptionStatus: 'expired'
          });
          setError('Masa langganan Anda telah berakhir. Silakan perpanjang langganan.');
          setLoading(false);
          return;
        }

        if (user.objectData.subscriptionStatus === 'expired') {
          setError('Akun Anda tidak aktif. Silakan hubungi admin atau lakukan pembayaran.');
          setLoading(false);
          return;
        }
      }

      localStorage.setItem('currentUser', JSON.stringify({
        id: user.objectId,
        ...user.objectData
      }));

      if (user.objectData.role === 'admin') {
        window.location.href = 'admin-dashboard.html';
      } else {
        window.location.href = 'dashboard.html';
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Terjadi kesalahan saat login. Silakan coba lagi.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <a href="index.html" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
              <div className="icon-wallet text-2xl text-white"></div>
            </div>
            <span className="text-2xl font-bold text-[var(--primary-color)]">FinanceFamily</span>
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang Kembali</h1>
          <p className="text-gray-600">Masuk ke akun Anda</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Belum punya akun?{' '}
              <a href="register.html" className="text-[var(--primary-color)] font-semibold hover:underline">
                Daftar sekarang
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoginApp />);