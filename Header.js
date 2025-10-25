function Header() {
  try {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    };

    return (
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <div className="icon-wallet text-xl text-white"></div>
              </div>
              <span className="text-2xl font-bold text-[var(--primary-color)]">FinanceFamily</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] font-medium transition-all duration-200 hover:scale-105">
                Fitur
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] font-medium transition-all duration-200 hover:scale-105">
                Harga
              </button>
              <a href="login.html" className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] font-medium transition-all duration-200 hover:scale-105">
                Masuk
              </a>
              <a href="register.html" className="btn-primary">
                Daftar Sekarang
              </a>
            </nav>

            <div className="md:hidden flex items-center space-x-2">
              <a href="login.html" className="text-sm text-[var(--text-secondary)]">Masuk</a>
              <a href="register.html" className="btn-primary text-sm px-4 py-2">Daftar</a>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <a href="login.html" className="text-sm text-[var(--text-secondary)]">Masuk</a>
              <a href="register.html" className="btn-primary text-sm px-4 py-2">Daftar</a>
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}