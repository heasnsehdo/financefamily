function AdminReports() {
  const [reportData, setReportData] = React.useState({
    dailyRevenue: [],
    monthlyRevenue: 0,
    yearlyRevenue: 0,
    newCustomersThisMonth: 0,
    churnRate: 0
  });
  const [dateRange, setDateRange] = React.useState('month');

  React.useEffect(() => {
    loadReportData();
  }, [dateRange]);

  const loadReportData = async () => {
    try {
      const payments = await trickleListObjects('payment', 100, true);
      const customers = await trickleListObjects('user', 100, true);

      const confirmedPayments = payments.items.filter(p => p.objectData.status === 'confirmed');
      const currentDate = new Date();
      const currentMonth = currentDate.toISOString().slice(0, 7);
      const currentYear = currentDate.getFullYear();

      const monthlyRevenue = confirmedPayments
        .filter(p => p.objectData.confirmedAt && p.objectData.confirmedAt.startsWith(currentMonth))
        .reduce((sum, p) => sum + p.objectData.amount, 0);

      const yearlyRevenue = confirmedPayments
        .filter(p => p.objectData.confirmedAt && p.objectData.confirmedAt.startsWith(currentYear.toString()))
        .reduce((sum, p) => sum + p.objectData.amount, 0);

      const customerList = customers.items.filter(u => u.objectData.role === 'customer');
      const newCustomersThisMonth = customerList.filter(c => 
        c.objectData.registeredAt && c.objectData.registeredAt.startsWith(currentMonth)
      ).length;

      const expiredCustomers = customerList.filter(c => c.objectData.subscriptionStatus === 'expired').length;
      const churnRate = customerList.length > 0 ? ((expiredCustomers / customerList.length) * 100).toFixed(1) : 0;

      setReportData({
        dailyRevenue: [],
        monthlyRevenue,
        yearlyRevenue,
        newCustomersThisMonth,
        churnRate
      });
    } catch (error) {
      console.error('Error loading report data:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Laporan & Analitik</h1>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="week">Minggu Ini</option>
          <option value="month">Bulan Ini</option>
          <option value="year">Tahun Ini</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Pemasukan Bulanan</h3>
          <p className="text-3xl font-bold text-[var(--primary-color)]">
            Rp {reportData.monthlyRevenue.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Pemasukan Tahunan</h3>
          <p className="text-3xl font-bold text-blue-600">
            Rp {reportData.yearlyRevenue.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Customer Baru Bulan Ini</h3>
          <p className="text-3xl font-bold text-green-600">{reportData.newCustomersThisMonth}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Churn Rate</h3>
          <p className="text-3xl font-bold text-red-600">{reportData.churnRate}%</p>
        </div>
      </div>
    </div>
  );
}