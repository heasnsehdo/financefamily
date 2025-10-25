function SubscriptionAlert({ user }) {
  const [alert, setAlert] = React.useState(null);

  React.useEffect(() => {
    const now = new Date();
    
    if (user.subscriptionStatus === 'trial') {
      const trialEnd = new Date(user.trialEndDate);
      const daysLeft = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
      
      if (daysLeft <= 3 && daysLeft > 0) {
        setAlert({
          type: 'warning',
          message: `Masa trial Anda akan berakhir dalam ${daysLeft} hari. Segera berlangganan!`
        });
      }
    } else if (user.subscriptionStatus === 'active' && user.subscriptionEndDate) {
      const subEnd = new Date(user.subscriptionEndDate);
      const daysLeft = Math.ceil((subEnd - now) / (1000 * 60 * 60 * 24));
      
      if (daysLeft <= 7 && daysLeft > 0) {
        setAlert({
          type: 'info',
          message: `Langganan Anda akan berakhir dalam ${daysLeft} hari. Perpanjang sekarang!`
        });
      }
    }
  }, [user]);

  if (!alert) return null;

  return (
    <div className={`${alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'} border-l-4 p-4`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className={`${alert.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'}`}>
            {alert.message}
          </p>
          <a href="payment.html" className="text-sm font-semibold text-[var(--primary-color)] hover:underline">
            Bayar Sekarang →
          </a>
        </div>
      </div>
    </div>
  );
}