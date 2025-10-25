function DebtManager({ user }) {
  const [debts, setDebts] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    type: 'debt',
    person: '',
    amount: '',
    description: '',
    dueDate: ''
  });

  React.useEffect(() => {
    loadDebts();
  }, []);

  const loadDebts = async () => {
    try {
      const result = await trickleListObjects(`debt:${user.id}`, 100, true);
      setDebts(result.items);
    } catch (error) {
      console.error('Error loading debts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, amount: parseFloat(formData.amount) };
      if (editId) {
        await trickleUpdateObject(`debt:${user.id}`, editId, data);
      } else {
        await trickleCreateObject(`debt:${user.id}`, data);
      }
      setShowForm(false);
      setEditId(null);
      setFormData({ type: 'debt', person: '', amount: '', description: '', dueDate: '' });
      loadDebts();
    } catch (error) {
      console.error('Error saving debt:', error);
    }
  };

  const handleEdit = (debt) => {
    setFormData(debt.objectData);
    setEditId(debt.objectId);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus data ini?')) {
      try {
        await trickleDeleteObject(`debt:${user.id}`, id);
        loadDebts();
      } catch (error) {
        console.error('Error deleting debt:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Utang & Piutang</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)]">
          <div className="flex items-center space-x-2">
            <div className="icon-plus text-lg"></div>
            <span>Tambah Data</span>
          </div>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Tambah'} Data</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipe</label>
                <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required>
                  <option value="debt">Utang</option>
                  <option value="receivable">Piutang</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Orang</label>
                <input type="text" value={formData.person} onChange={(e) => setFormData({...formData, person: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah</label>
                <input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jatuh Tempo</label>
                <input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keterangan</label>
              <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows="3"></textarea>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg">Simpan</button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg">Batal</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4 text-red-600">Utang</h2>
          <div className="space-y-3">
            {debts.filter(d => d.objectData.type === 'debt').map(d => (
              <div key={d.objectId} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{d.objectData.person}</h3>
                    <p className="text-sm text-gray-500">{d.objectData.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(d)} className="text-blue-600"><div className="icon-edit text-lg"></div></button>
                    <button onClick={() => handleDelete(d.objectId)} className="text-red-600"><div className="icon-trash-2 text-lg"></div></button>
                  </div>
                </div>
                <p className="text-lg font-bold text-red-600">Rp {d.objectData.amount.toLocaleString('id-ID')}</p>
                {d.objectData.dueDate && <p className="text-sm text-gray-500">Jatuh tempo: {d.objectData.dueDate}</p>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4 text-green-600">Piutang</h2>
          <div className="space-y-3">
            {debts.filter(d => d.objectData.type === 'receivable').map(d => (
              <div key={d.objectId} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{d.objectData.person}</h3>
                    <p className="text-sm text-gray-500">{d.objectData.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(d)} className="text-blue-600"><div className="icon-edit text-lg"></div></button>
                    <button onClick={() => handleDelete(d.objectId)} className="text-red-600"><div className="icon-trash-2 text-lg"></div></button>
                  </div>
                </div>
                <p className="text-lg font-bold text-green-600">Rp {d.objectData.amount.toLocaleString('id-ID')}</p>
                {d.objectData.dueDate && <p className="text-sm text-gray-500">Jatuh tempo: {d.objectData.dueDate}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}