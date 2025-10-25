function Footer() {
  try {
    return (
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                  <div className="icon-wallet text-xl text-white"></div>
                </div>
                <span className="text-2xl font-bold">FinanceFamily</span>
              </div>
              <p className="text-gray-400">
                Aplikasi manajemen keuangan keluarga yang membantu Anda mencapai tujuan finansial dengan mudah dan terorganisir.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Fitur</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Harga</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Akun</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="register.html" className="hover:text-white transition-colors">Daftar</a></li>
                <li><a href="login.html" className="hover:text-white transition-colors">Masuk</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FinanceFamily. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}