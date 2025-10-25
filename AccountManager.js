function AccountManager({ user }) {
  const [accounts, setAccounts] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '',
    type: 'bank',
    balance: ''
  });

  React.useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const result = await trickleListObjects(`account:${user.id}`, 100, true);
      setAccounts(result.items);
    } catch (error) {
      console.error('Error loading accounts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, balance: parseFloat(formData.balance) };
      if (editId) {
        await trickleUpdateObject(`account:${user.id}`, editId, data);
      } else {
        await trickleCreateObject(`account:${user.id}`, data);
      }
      setShowForm(false);
      setEditId(null);
      setFormData({ name: '', type: 'bank', balance: '' });
      loadAccounts();
    } catch (error) {
      console.error('Error saving account:', error);
    }
  };

  const handleEdit = (account) => {
    setFormData(account.objectData);
    setEditId(account.objectId);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus rekening ini?')) {
      try {
        await trickleDeleteObject(`account:${user.id}`, id);
        loadAccounts();
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Multi-Rekening</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)]">
          <div className="flex items-center space-x-2">
            <div className="icon-plus text-lg"></div>
            <span>Tambah Rekening</span>
          </div>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Tambah'} Rekening</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Rekening</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipe</label>
                <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required>
                  <option value="bank">Bank</option>
                  <option value="cash">Kas</option>
                  <option value="ewallet">E-Wallet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Saldo</label>
                <input type="number" value={formData.balance} onChange={(e) => setFormData({...formData, balance: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg">Simpan</button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg">Batal</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {accounts.map(acc => (
          <div key={acc.objectId} className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{acc.objectData.name}</h3>
                <p className="text-sm text-gray-500">{acc.objectData.type}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(acc)} className="text-blue-600"><div className="icon-edit text-lg"></div></button>
                <button onClick={() => handleDelete(acc.objectId)} className="text-red-600"><div className="icon-trash-2 text-lg"></div></button>
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--primary-color)]">Rp {acc.objectData.balance.toLocaleString('id-ID')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}