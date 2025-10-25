function TransactionManager({ user }) {
  const [transactions, setTransactions] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  React.useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const result = await trickleListObjects(`transaction:${user.id}`, 100, true);
      setTransactions(result.items);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await trickleUpdateObject(`transaction:${user.id}`, editId, {
          ...formData,
          amount: parseFloat(formData.amount)
        });
      } else {
        await trickleCreateObject(`transaction:${user.id}`, {
          ...formData,
          amount: parseFloat(formData.amount)
        });
      }
      setShowForm(false);
      setEditId(null);
      setFormData({
        type: 'expense',
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      loadTransactions();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleEdit = (transaction) => {
    setFormData(transaction.objectData);
    setEditId(transaction.objectId);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus transaksi ini?')) {
      try {
        await trickleDeleteObject(`transaction:${user.id}`, id);
        loadTransactions();
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Transaksi</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)]"
        >
          <div className="flex items-center space-x-2">
            <div className="icon-plus text-lg"></div>
            <span>Tambah Transaksi</span>
          </div>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Tambah'} Transaksi</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipe</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="income">Pemasukan</option>
                  <option value="expense">Pengeluaran</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {formData.type === 'income' ? (
                    <>
                      <option value="Gaji">Gaji</option>
                      <option value="Bonus">Bonus</option>
                      <option value="Investasi">Investasi</option>
                      <option value="Bisnis">Bisnis</option>
                      <option value="Lainnya">Lainnya</option>
                    </>
                  ) : (
                    <>
                      <option value="Makanan">Makanan</option>
                      <option value="Transportasi">Transportasi</option>
                      <option value="Belanja">Belanja</option>
                      <option value="Tagihan">Tagihan</option>
                      <option value="Kesehatan">Kesehatan</option>
                      <option value="Pendidikan">Pendidikan</option>
                      <option value="Hiburan">Hiburan</option>
                      <option value="Lainnya">Lainnya</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keterangan</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                rows="3"
              ></textarea>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg">
                Simpan
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keterangan</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Jumlah</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map(t => (
              <tr key={t.objectId}>
                <td className="px-6 py-4 text-sm">{t.objectData.date}</td>
                <td className="px-6 py-4 text-sm">{t.objectData.category}</td>
                <td className="px-6 py-4 text-sm">{t.objectData.description}</td>
                <td className={`px-6 py-4 text-sm text-right font-semibold ${t.objectData.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.objectData.type === 'income' ? '+' : '-'} Rp {t.objectData.amount.toLocaleString('id-ID')}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <button onClick={() => handleEdit(t)} className="text-blue-600 hover:text-blue-800 mr-3">
                    <div className="icon-edit text-lg"></div>
                  </button>
                  <button onClick={() => handleDelete(t.objectId)} className="text-red-600 hover:text-red-800">
                    <div className="icon-trash-2 text-lg"></div>
                  </button>
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
