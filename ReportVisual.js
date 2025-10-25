const ChartJS = window.Chart;

function ReportVisual({ user }) {
  const [transactions, setTransactions] = React.useState([]);
  const chartRefs = React.useRef({});

  React.useEffect(() => {
    loadTransactions();
  }, []);

  React.useEffect(() => {
    if (transactions.length > 0) {
      renderCharts();
    }
  }, [transactions]);

  const loadTransactions = async () => {
    try {
      const result = await trickleListObjects(`transaction:${user.id}`, 100, true);
      setTransactions(result.items);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const renderCharts = () => {
    const expenseByCategory = {};
    const incomeByCategory = {};
    
    transactions.forEach(t => {
      const category = t.objectData.category;
      const amount = t.objectData.amount;
      
      if (t.objectData.type === 'expense') {
        expenseByCategory[category] = (expenseByCategory[category] || 0) + amount;
      } else {
        incomeByCategory[category] = (incomeByCategory[category] || 0) + amount;
      }
    });

    if (chartRefs.current.expense) {
      const ctx = chartRefs.current.expense.getContext('2d');
      new ChartJS(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(expenseByCategory),
          datasets: [{
            data: Object.values(expenseByCategory),
            backgroundColor: ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16']
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: true, position: 'bottom' } }
        }
      });
    }

    if (chartRefs.current.income) {
      const ctx = chartRefs.current.income.getContext('2d');
      new ChartJS(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(incomeByCategory),
          datasets: [{
            label: 'Pemasukan',
            data: Object.values(incomeByCategory),
            backgroundColor: '#10b981'
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } }
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Laporan Visual</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Pengeluaran per Kategori</h2>
          <canvas ref={el => chartRefs.current.expense = el}></canvas>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Pemasukan per Kategori</h2>
          <canvas ref={el => chartRefs.current.income = el}></canvas>
        </div>
      </div>
    </div>
  );
}