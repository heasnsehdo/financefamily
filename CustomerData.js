function CustomerData() {
  const [customers, setCustomers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');

  React.useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const result = await trickleListObjects('user', 100, true);
      setCustomers(result.items.filter(u => u.objectData.role === 'customer'));
    } catch (error) {
      console.error('Error loading customers:', error);
    }
  };

  const handleStatusChange = async (customer, newStatus) => {
    try {
      await trickleUpdateObject('user', customer.objectId, {
        ...customer.objectData,
        subscriptionStatus: newStatus
      });
      loadCustomers();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      trial: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.objectData.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.objectData.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.objectData.subscriptionStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Data Customer</h1>
      
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Cari nama atau email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">Semua Status</option>
          <option value="trial">Trial</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tgl Registrasi</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCustomers.map(c => (
              <tr key={c.objectId}>
                <td className="px-6 py-4 text-sm font-medium">{c.objectData.fullName}</td>
                <td className="px-6 py-4 text-sm">{c.objectData.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(c.objectData.subscriptionStatus)}`}>
                    {c.objectData.subscriptionStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{new Date(c.objectData.registeredAt).toLocaleDateString('id-ID')}</td>
                <td className="px-6 py-4 text-center">
                  <select
                    value={c.objectData.subscriptionStatus}
                    onChange={(e) => handleStatusChange(c, e.target.value)}
                    className="px-3 py-1 border rounded"
                  >
                    <option value="trial">Trial</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                  </select>
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