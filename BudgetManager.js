function BudgetManager({ user }) {
  const [budgets, setBudgets] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    category: '',
    amount: '',
    spent: '0',
    month: new Date().toISOString().slice(0, 7)
  });

  React.useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = async () => {
    try {
      const result = await trickleListObjects(`budget:${user.id}`, 100, true);
      setBudgets(result.items);
    } catch (error) {
      console.error('Error loading budgets:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, amount: parseFloat(formData.amount), spent: parseFloat(formData.spent) };
      if (editId) {
        await trickleUpdateObject(`budget:${user.id}`, editId, data);
      } else {
        await trickleCreateObject(`budget:${user.id}`, data);
      }
      setShowForm(false);
      setEditId(null);
      setFormData({ category: '', amount: '', spent: '0', month: new Date().toISOString().slice(0, 7) });
      loadBudgets();
    } catch (error) {
      console.error('Error saving budget:', error);
    }
  };

  const handleEdit = (budget) => {
    setFormData(budget.objectData);
    setEditId(budget.objectId);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus anggaran ini?')) {
      try {
        await trickleDeleteObject(`budget:${user.id}`, id);
        loadBudgets();
      } catch (error) {
        console.error('Error deleting budget:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Penganggaran</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)]">
          <div className="flex items-center space-x-2">
            <div className="icon-plus text-lg"></div>
            <span>Tambah Anggaran</span>
          </div>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Tambah'} Anggaran</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required>
                  <option value="">Pilih Kategori</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Transportasi">Transportasi</option>
                  <option value="Belanja">Belanja</option>
                  <option value="Tagihan">Tagihan</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Hiburan">Hiburan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bulan</label>
                <input type="month" value={formData.month} onChange={(e) => setFormData({...formData, month: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Anggaran</label>
                <input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Terpakai</label>
                <input type="number" value={formData.spent} onChange={(e) => setFormData({...formData, spent: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg">Simpan</button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg">Batal</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {budgets.map(b => {
          const progress = (b.objectData.spent / b.objectData.amount) * 100;
          const progressColor = progress > 90 ? 'bg-red-500' : progress > 70 ? 'bg-yellow-500' : 'bg-green-500';
          return (
            <div key={b.objectId} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{b.objectData.category}</h3>
                  <p className="text-sm text-gray-500">{b.objectData.month}</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(b)} className="text-blue-600"><div className="icon-edit text-lg"></div></button>
                  <button onClick={() => handleDelete(b.objectId)} className="text-red-600"><div className="icon-trash-2 text-lg"></div></button>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Rp {b.objectData.spent.toLocaleString('id-ID')} / Rp {b.objectData.amount.toLocaleString('id-ID')}</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${progressColor} h-2 rounded-full`} style={{ width: `${Math.min(progress, 100)}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}