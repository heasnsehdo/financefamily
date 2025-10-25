function GoalManager({ user }) {
  const [goals, setGoals] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '',
    targetAmount: '',
    currentAmount: '0',
    deadline: ''
  });

  React.useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const result = await trickleListObjects(`goal:${user.id}`, 100, true);
      setGoals(result.items);
    } catch (error) {
      console.error('Error loading goals:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { 
        ...formData, 
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount)
      };
      if (editId) {
        await trickleUpdateObject(`goal:${user.id}`, editId, data);
      } else {
        await trickleCreateObject(`goal:${user.id}`, data);
      }
      setShowForm(false);
      setEditId(null);
      setFormData({ name: '', targetAmount: '', currentAmount: '0', deadline: '' });
      loadGoals();
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  const handleEdit = (goal) => {
    setFormData(goal.objectData);
    setEditId(goal.objectId);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus tujuan ini?')) {
      try {
        await trickleDeleteObject(`goal:${user.id}`, id);
        loadGoals();
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Tujuan Keuangan</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)]">
          <div className="flex items-center space-x-2">
            <div className="icon-plus text-lg"></div>
            <span>Tambah Tujuan</span>
          </div>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Tambah'} Tujuan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Tujuan</label>
                <select value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required>
                  <option value="">Pilih Tujuan</option>
                  <option value="Dana Pendidikan">Dana Pendidikan</option>
                  <option value="Dana Liburan">Dana Liburan</option>
                  <option value="Dana Pensiun">Dana Pensiun</option>
                  <option value="Beli Rumah">Beli Rumah</option>
                  <option value="Beli Mobil">Beli Mobil</option>
                  <option value="Dana Darurat">Dana Darurat</option>
                  <option value="Investasi">Investasi</option>
                  <option value="Renovasi Rumah">Renovasi Rumah</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Jumlah</label>
                <input type="number" value={formData.targetAmount} onChange={(e) => setFormData({...formData, targetAmount: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Saat Ini</label>
                <input type="number" value={formData.currentAmount} onChange={(e) => setFormData({...formData, currentAmount: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <input type="date" value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg">Simpan</button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg">Batal</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map(g => {
          const progress = (g.objectData.currentAmount / g.objectData.targetAmount) * 100;
          return (
            <div key={g.objectId} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{g.objectData.name}</h3>
                  {g.objectData.deadline && <p className="text-sm text-gray-500">Deadline: {g.objectData.deadline}</p>}
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(g)} className="text-blue-600"><div className="icon-edit text-lg"></div></button>
                  <button onClick={() => handleDelete(g.objectId)} className="text-red-600"><div className="icon-trash-2 text-lg"></div></button>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Rp {g.objectData.currentAmount.toLocaleString('id-ID')} / Rp {g.objectData.targetAmount.toLocaleString('id-ID')}</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[var(--primary-color)] h-2 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
