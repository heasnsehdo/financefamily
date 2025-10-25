function RegisterApp() {
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    setLoading(true);

    try {
      const existingUsers = await trickleListObjects('user', 100, true);
      const emailExists = existingUsers.items.find(
        user => user.objectData.email === formData.email
      );

      if (emailExists) {
        setError('Email sudah terdaftar');
        setLoading(false);
        return;
      }

      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 3);

      const newUser = await trickleCreateObject('user', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: 'customer',
        subscriptionStatus: 'trial',
        trialEndDate: trialEndDate.toISOString(),
        subscriptionEndDate: null,
        registeredAt: new Date().toISOString()
      });

      alert('Pendaftaran berhasil! Anda mendapatkan trial gratis 3 hari. Silakan login.');
      window.location.href = 'login.html';
    } catch (error) {
      console.error('Registration error:', error);
      setError('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Daftar Sekarang</h1>
          <p className="text-gray-600">Dapatkan trial gratis 3 hari</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Sudah punya akun?{' '}
              <a href="login.html" className="text-[var(--primary-color)] font-semibold hover:underline">
                Masuk di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RegisterApp />);