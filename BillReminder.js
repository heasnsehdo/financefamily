function BillReminder({ user }) {
  const [bills, setBills] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '',
    amount: '',
    dueDate: '',
    recurring: false
  });

  React.useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      const result = await trickleListObjects(`bill:${user.id}`, 100, true);
      setBills(result.items);
    } catch (error) {
      console.error('Error loading bills:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, amount: parseFloat(formData.amount) };
      if (editId) {
        await trickleUpdateObject(`bill:${user.id}`, editId, data);
      } else {
        await trickleCreateObject(`bill:${user.id}`, data);
      }
      setShowForm(false);
      setEditId(null);
      setFormData({ name: '', amount: '', dueDate: '', recurring: false });
      loadBills();
    } catch (error) {
      console.error('Error saving bill:', error);
    }
  };

  const handleEdit = (bill) => {
    setFormData(bill.objectData);
    setEditId(bill.objectId);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus tagihan ini?')) {
      try {
        await trickleDeleteObject(`bill:${user.id}`, id);
        loadBills();
      } catch (error) {
        console.error('Error deleting bill:', error);
      }
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const days = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getStatusColor = (days) => {
    if (days < 0) return 'bg-gray-500';
    if (days <= 3) return 'bg-red-500';
    if (days <= 7) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Pengingat Tagihan</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)]">
          <div className="flex items-center space-x-2">
            <div className="icon-plus text-lg"></div>
            <span>Tambah Tagihan</span>
          </div>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Tambah'} Tagihan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Tagihan</label>
                <select value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required>
                  <option value="">Pilih Tagihan</option>
                  <option value="Listrik">Listrik</option>
                  <option value="Air">Air</option>
                  <option value="Internet">Internet</option>
                  <option value="Telepon">Telepon</option>
                  <option value="Cicilan KPR">Cicilan KPR</option>
                  <option value="Cicilan Mobil">Cicilan Mobil</option>
                  <option value="Asuransi">Asuransi</option>
                  <option value="SPP Sekolah">SPP Sekolah</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah</label>
                <input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jatuh Tempo</label>
                <input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div className="flex items-center">
                <input type="checkbox" checked={formData.recurring} onChange={(e) => setFormData({...formData, recurring: e.target.checked})} className="mr-2" />
                <label className="text-sm font-medium text-gray-700">Tagihan Berulang</label>
              </div>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg">Simpan</button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg">Batal</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {bills.map(b => {
          const daysUntil = getDaysUntilDue(b.objectData.dueDate);
          const statusColor = getStatusColor(daysUntil);
          return (
            <div key={b.objectId} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
                  <div>
                    <h3 className="font-semibold">{b.objectData.name}</h3>
                    <p className="text-sm text-gray-500">Jatuh tempo: {b.objectData.dueDate}</p>
                    <p className="text-sm text-gray-500">
                      {daysUntil < 0 ? 'Sudah lewat' : daysUntil === 0 ? 'Hari ini' : `${daysUntil} hari lagi`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-bold">Rp {b.objectData.amount.toLocaleString('id-ID')}</p>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(b)} className="text-blue-600"><div className="icon-edit text-lg"></div></button>
                    <button onClick={() => handleDelete(b.objectId)} className="text-red-600"><div className="icon-trash-2 text-lg"></div></button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}