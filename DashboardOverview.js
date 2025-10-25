function DashboardOverview({ user }) {
  const [stats, setStats] = React.useState({
    income: 0,
    expense: 0,
    balance: 0,
    accounts: 0
  });

  React.useEffect(() => {
    loadStats();
  }, [user]);

  const loadStats = async () => {
    try {
      const transactions = await trickleListObjects(`transaction:${user.id}`, 100, true);
      const accounts = await trickleListObjects(`account:${user.id}`, 100, true);

      let totalIncome = 0;
      let totalExpense = 0;

      transactions.items.forEach(t => {
        if (t.objectData.type === 'income') {
          totalIncome += t.objectData.amount;
        } else {
          totalExpense += t.objectData.amount;
        }
      });

      setStats({
        income: totalIncome,
        expense: totalExpense,
        balance: totalIncome - totalExpense,
        accounts: accounts.items.length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Pemasukan</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="icon-trending-up text-xl text-green-600"></div>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            Rp {stats.income.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Pengeluaran</h3>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <div className="icon-trending-down text-xl text-red-600"></div>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            Rp {stats.expense.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Saldo</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="icon-wallet text-xl text-blue-600"></div>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            Rp {stats.balance.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Total Rekening</h3>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="icon-credit-card text-xl text-purple-600"></div>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.accounts}</p>
        </div>
      </div>
    </div>
  );
}