function DashboardApp() {
  const [user, setUser] = React.useState(null);
  const [activeMenu, setActiveMenu] = React.useState('overview');

  React.useEffect(() => {
    const userData = checkAuth();
    if (!userData || userData.role !== 'customer') {
      window.location.href = 'login.html';
      return;
    }
    setUser(userData);
  }, []);

  const renderContent = () => {
    switch(activeMenu) {
      case 'overview': return <DashboardOverview user={user} />;
      case 'transactions': return <TransactionManager user={user} />;
      case 'accounts': return <AccountManager user={user} />;
      case 'budget': return <BudgetManager user={user} />;
      case 'debt': return <DebtManager user={user} />;
      case 'bills': return <BillReminder user={user} />;
      case 'goals': return <GoalManager user={user} />;
      case 'reports': return <ReportVisual user={user} />;
      default: return <DashboardOverview user={user} />;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav user={user} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <SubscriptionAlert user={user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DashboardApp />);