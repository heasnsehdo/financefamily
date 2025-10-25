function AdminDashboardOverview() {
  const [stats, setStats] = React.useState({
    totalCustomers: 0,
    activeCustomers: 0,
    trialCustomers: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    monthlyRevenue: 0
  });

  React.useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const customers = await trickleListObjects('user', 100, true);
      const payments = await trickleListObjects('payment', 100, true);

      const customerList = customers.items.filter(u => u.objectData.role === 'customer');
      const activeCount = customerList.filter(u => u.objectData.subscriptionStatus === 'active').length;
      const trialCount = customerList.filter(u => u.objectData.subscriptionStatus === 'trial').length;

      const confirmedPayments = payments.items.filter(p => p.objectData.status === 'confirmed');
      const pendingCount = payments.items.filter(p => p.objectData.status === 'pending').length;
      const totalRevenue = confirmedPayments.reduce((sum, p) => sum + p.objectData.amount, 0);

      const currentMonth = new Date().toISOString().slice(0, 7);
      const monthlyRevenue = confirmedPayments
        .filter(p => p.objectData.confirmedAt && p.objectData.confirmedAt.startsWith(currentMonth))
        .reduce((sum, p) => sum + p.objectData.amount, 0);

      setStats({
        totalCustomers: customerList.length,
        activeCustomers: activeCount,
        trialCustomers: trialCount,
        totalRevenue,
        pendingPayments: pendingCount,
        monthlyRevenue
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Total Customer</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="icon-users text-xl text-blue-600"></div>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Customer Aktif</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="icon-user-check text-xl text-green-600"></div>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.activeCustomers}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Customer Trial</h3>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <div className="icon-clock text-xl text-yellow-600"></div>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.trialCustomers}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Total Pemasukan</h3>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="icon-wallet text-xl text-purple-600"></div>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            Rp {stats.totalRevenue.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Pemasukan Bulan Ini</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="icon-trending-up text-xl text-green-600"></div>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            Rp {stats.monthlyRevenue.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Pembayaran Pending</h3>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <div className="icon-alert-circle text-xl text-orange-600"></div>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.pendingPayments}</p>
        </div>
      </div>
    </div>
  );
}