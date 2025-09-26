import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const { 
    isLoggedIn, 
    playerBalance, 
    language, 
    sidebarOpen, 
    setSidebarOpen,
    user
  } = useApp()
  
  const location = useLocation()
  const t = translations[language]

  if (!isLoggedIn) return null
  
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-60 sm:w-64 md:w-72 bg-white/10 backdrop-blur-md border-r border-white/20 transform transition-transform duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-2 sm:p-3 md:p-4 border-b border-white/20">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white">{t.menu}</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 sm:p-2 rounded-md text-white hover:bg-white/20 transition-colors lg:hidden touch-manipulation"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation menu */}
          <nav className="flex-1 p-2 sm:p-3 md:p-4 space-y-1.5 sm:space-y-2">
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg text-left transition-colors touch-manipulation ${
                location.pathname === '/' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base">{t.home}</span>
            </Link>

            <Link
              to="/selected"
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg text-left transition-colors touch-manipulation ${
                location.pathname === '/selected' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base">{t.selectedTickets}</span>
              <SelectedTicketBadge />
            </Link>

            <Link
              to="/available"
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg text-left transition-colors touch-manipulation ${
                location.pathname === '/available' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base">{t.availableTickets}</span>
            </Link>

            <Link
              to="/my-tickets"
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg text-left transition-colors touch-manipulation ${
                location.pathname === '/my-tickets' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base">{t.myTickets}</span>
            </Link>

            <Link
              to="/payment"
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg text-left transition-colors touch-manipulation ${
                location.pathname === '/payment'
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base">{t.payment}</span>
            </Link>

            <Link
              to="/profile"
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg text-left transition-colors touch-manipulation ${
                location.pathname === '/profile'
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base">{language === 'mm' ? 'ပရိုဖိုင်' : 'Profile'}</span>
            </Link>
          </nav>

          {/* Sidebar footer */}
          <div className="p-2 sm:p-3 md:p-4 border-t border-white/20 space-y-2 sm:space-y-3">
            {user && (
              <div className="bg-white/10 rounded-lg p-2 sm:p-2.5 md:p-3">
                <p className="text-white text-xs sm:text-sm">
                  {language === 'mm' ? 'အသုံးပြုသူ' : 'User'}
                </p>
                <p className="text-blue-400 font-bold text-xs sm:text-sm md:text-base">
                  {user.name || user.user_name}
                </p>
                <p className="text-white text-xs opacity-70">
                  {user.phone}
                </p>
              </div>
            )}
            <div className="bg-white/10 rounded-lg p-2 sm:p-2.5 md:p-3">
              <p className="text-white text-xs sm:text-sm">{t.playerBalance}</p>
              <p className="text-yellow-400 font-bold text-sm sm:text-base md:text-lg">
                {playerBalance.toLocaleString()} {t.kyat}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Selected Ticket Badge Component
const SelectedTicketBadge = () => {
  const { selectedTickets } = useApp()
  
  if (selectedTickets.length === 0) return null
  
  return (
    <span className="ml-auto bg-yellow-400 text-black text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
      {selectedTickets.length}
    </span>
  )
}

export default Sidebar
