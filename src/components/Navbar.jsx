import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import { useNavigate } from 'react-router-dom'
import logoRed from '../assets/img/logo_red.png'

const Navbar = () => {
  const { 
    isLoggedIn, 
    playerBalance, 
    toggleLanguage, 
    language, 
    handleLogout, 
    setShowLoginForm,
    sidebarOpen,
    setSidebarOpen,
    user,
    isLoading
  } = useApp()
  
  const navigate = useNavigate()
  const t = translations[language]

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
      <div className="w-full px-2 sm:px-3 md:px-4 lg:px-6">
        <div className="flex justify-between items-center h-12 sm:h-14 md:h-16">
          {/* Left side - Logo and Menu */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
            {isLoggedIn && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1.5 sm:p-2 rounded-md text-white hover:bg-white/20 transition-colors lg:hidden touch-manipulation"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 hover:opacity-80 transition-opacity touch-manipulation"
            >
              <img 
                src={logoRed} 
                alt={t.siteName}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
              />
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white hidden sm:block">{t.siteName}</h1>
            </button>
          </div>

          {/* Center - Balance (when logged in) */}
          {isLoggedIn && (
            <div className="flex-1 flex justify-center mx-2">
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-full px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 shadow-lg max-w-xs sm:max-w-sm">
                <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
                  <span className="text-yellow-300 text-xs sm:text-sm font-medium truncate">{t.playerBalance}:</span>
                  <span className="text-yellow-400 font-bold text-xs sm:text-sm md:text-base lg:text-lg truncate">
                    {playerBalance.toLocaleString()} {t.kyat}
                  </span>
                  {user && (
                    <span className="hidden md:inline text-white/70 text-xs truncate">
                      ({user.name || user.user_name})
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Right side - Language and Auth */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="p-1 sm:p-1.5 md:p-2 rounded-full bg-red-500/20 text-white hover:bg-red-500/30 disabled:bg-gray-500/20 disabled:cursor-not-allowed transition-colors touch-manipulation"
                title={t.logout}
              >
                {isLoading ? (
                  <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                )}
              </button>
            ) : (
              <button
                onClick={() => setShowLoginForm(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-1.5 px-2.5 sm:py-2 sm:px-3 md:py-2 md:px-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-xs sm:text-sm md:text-base touch-manipulation"
              >
                {t.login}
              </button>
            )}
            <button
              onClick={toggleLanguage}
              className="p-1 sm:p-1.5 md:p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors touch-manipulation"
              title={t.language}
            >
              <span className="text-xs sm:text-sm md:text-base">{language === 'mm' ? '🇲🇲' : '🇺🇸'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
