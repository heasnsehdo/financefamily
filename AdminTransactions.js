function AdminTransactions() {
  const [transactions, setTransactions] = React.useState([]);
  const [filter, setFilter] = React.useState('all');

  React.useEffect(() => {
    loadTransactions();
  }, [filter]);

  const loadTransactions = async () => {
    try {
      const result = await trickleListObjects('payment', 100, true);
      let filtered = result.items;
      
      if (filter === 'confirmed') {
        filtered = result.items.filter(p => p.objectData.status === 'confirmed');
      } else if (filter === 'pending') {
        filtered = result.items.filter(p => p.objectData.status === 'pending');
      }
      
      setTransactions(filtered);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const getTotalRevenue = () => {
    return transactions
      .filter(t => t.objectData.status === 'confirmed')
      .reduce((sum, t) => sum + t.objectData.amount, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Riwayat Transaksi</h1>
        <div className="flex items-center space-x-4">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">Semua</option>
            <option value="confirmed">Terkonfirmasi</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Total Pemasukan Terkonfirmasi</h3>
        <p className="text-3xl font-bold text-[var(--primary-color)]">
          Rp {getTotalRevenue().toLocaleString('id-ID')}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jumlah</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metode</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tgl Konfirmasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map(t => (
              <tr key={t.objectId}>
                <td className="px-6 py-4 text-sm">
                  {new Date(t.objectData.paymentDate).toLocaleDateString('id-ID')}
                </td>
                <td className="px-6 py-4 text-sm">{t.objectData.userId}</td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600">
                  Rp {t.objectData.amount.toLocaleString('id-ID')}
                </td>
                <td className="px-6 py-4 text-sm">{t.objectData.paymentMethod}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    t.objectData.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {t.objectData.status === 'confirmed' ? 'Terkonfirmasi' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {t.objectData.confirmedAt 
                    ? new Date(t.objectData.confirmedAt).toLocaleDateString('id-ID')
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}