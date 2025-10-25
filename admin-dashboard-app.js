function AdminDashboardApp() {
  const [user, setUser] = React.useState(null);
  const [activeMenu, setActiveMenu] = React.useState('dashboard');

  React.useEffect(() => {
    const userData = checkAuth();
    if (!userData || userData.role !== 'admin') {
      window.location.href = 'login.html';
      return;
    }
    setUser(userData);
  }, []);

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard': return <AdminDashboardOverview />;
      case 'transactions': return <AdminTransactions />;
      case 'payments': return <PaymentConfirmation />;
      case 'customers': return <CustomerData />;
      case 'reports': return <AdminReports />;
      case 'settings': return <AdminSettings />;
      default: return <AdminDashboardOverview />;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav user={user} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AdminDashboardApp />);