function DashboardNav({ user, activeMenu, setActiveMenu }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { id: 'overview', icon: 'layout-dashboard', label: 'Dashboard' },
    { id: 'transactions', icon: 'receipt', label: 'Transaksi' },
    { id: 'accounts', icon: 'credit-card', label: 'Rekening' },
    { id: 'budget', icon: 'target', label: 'Anggaran' },
    { id: 'debt', icon: 'file-text', label: 'Utang/Piutang' },
    { id: 'bills', icon: 'bell', label: 'Tagihan' },
    { id: 'goals', icon: 'flag', label: 'Tujuan' },
    { id: 'reports', icon: 'chart-bar', label: 'Laporan' }
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
              <div className="icon-wallet text-xl text-white"></div>
            </div>
            <span className="text-xl font-bold text-[var(--primary-color)]">FinanceFamily</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <span className="text-gray-700">Halo, {user.fullName}</span>
            <button onClick={logout} className="text-red-600 hover:text-red-700 font-medium">
              Logout
            </button>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <div className={`icon-${isMobileMenuOpen ? 'x' : 'menu'} text-2xl`}></div>
          </button>
        </div>

        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block pb-4`}>
          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeMenu === item.id 
                    ? 'bg-[var(--primary-color)] text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className={`icon-${item.icon} text-lg`}></div>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 text-sm">Halo, {user.fullName}</span>
              <button onClick={logout} className="text-red-600 hover:text-red-700 font-medium text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}