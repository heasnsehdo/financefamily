function PaymentConfirmation() {
  const [payments, setPayments] = React.useState([]);

  React.useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const result = await trickleListObjects('payment', 100, true);
      setPayments(result.items.filter(p => p.objectData.status === 'pending'));
    } catch (error) {
      console.error('Error loading payments:', error);
    }
  };

  const handleConfirm = async (payment) => {
    try {
      await trickleUpdateObject('payment', payment.objectId, {
        ...payment.objectData,
        status: 'confirmed',
        confirmedAt: new Date().toISOString()
      });

      const user = await trickleGetObject('user', payment.objectData.userId);
      const subscriptionEnd = new Date();
      subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);

      await trickleUpdateObject('user', payment.objectData.userId, {
        ...user.objectData,
        subscriptionStatus: 'active',
        subscriptionEndDate: subscriptionEnd.toISOString()
      });

      loadPayments();
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Konfirmasi Pembayaran</h1>
      
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jumlah</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metode</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map(p => (
              <tr key={p.objectId}>
                <td className="px-6 py-4 text-sm">{new Date(p.objectData.paymentDate).toLocaleDateString('id-ID')}</td>
                <td className="px-6 py-4 text-sm">{p.objectData.userId}</td>
                <td className="px-6 py-4 text-sm font-semibold">Rp {p.objectData.amount.toLocaleString('id-ID')}</td>
                <td className="px-6 py-4 text-sm">{p.objectData.paymentMethod}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleConfirm(p)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Oke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}