import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import { useState } from 'react'

const LoginModal = () => {
  const { 
    showLoginForm, 
    setShowLoginForm, 
    language,
    handleLogin,
    isLoading,
    error,
    setError
  } = useApp()
  
  const [formData, setFormData] = useState({
    user_name: '',
    password: ''
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [localError, setLocalError] = useState('')
  
  const t = translations[language]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear errors when user starts typing
    if (localError || error) {
      setLocalError('')
      setError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.user_name.trim() || !formData.password.trim()) {
      setLocalError('Please fill in all fields')
      return
    }

    const result = await handleLogin(formData, rememberMe)
    
    if (!result.success) {
      setLocalError(result.message)
    } else {
      // Reset form on successful login
      setFormData({ user_name: '', password: '' })
      setRememberMe(false)
      setLocalError('')
    }
  }

  const displayError = localError || error

  return (
    <>
      {/* Modal overlay */}
      {showLoginForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl max-w-xs sm:max-w-sm md:max-w-md w-full relative mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowLoginForm(false)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-2 sm:p-2.5 text-white hover:bg-white/20 rounded-full transition-colors touch-manipulation"
              aria-label="Close"
            >
              <svg className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Logo */}
            <div className="text-center mb-3 sm:mb-4 md:mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl">3D</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{t.siteName}</h1>
            </div>

            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center mb-3 sm:mb-4 md:mb-6">{t.login}</h2>
            
            {/* Test Credentials Button */}
            <div className="mb-3 sm:mb-4">
              <button
                type="button"
                onClick={() => setFormData({ user_name: 'PLAYER0102', password: 'gscplus' })}
                className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 text-xs sm:text-sm py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-colors touch-manipulation"
                disabled={isLoading}
              >
                {language === 'mm' ? 'စမ်းသပ်ရန် နမူနာ အကောင့်' : 'Fill Test Credentials'}
              </button>
            </div>
            
            {/* Error Message */}
            {displayError && (
              <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-200 text-xs sm:text-sm text-center">{displayError}</p>
              </div>
            )}
            
            <form className="space-y-3 sm:space-y-4 md:space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-white text-sm sm:text-base font-medium mb-1.5 sm:mb-2">
                  {t.username}
                </label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-3 sm:py-3.5 md:py-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base touch-manipulation"
                  placeholder={t.username}
                  required
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm sm:text-base font-medium mb-1.5 sm:mb-2">
                  {t.password}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-3 sm:py-3.5 md:py-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base touch-manipulation"
                  placeholder={t.password}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <label className="flex items-center touch-manipulation">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded border-white/30 bg-white/20 text-yellow-400 focus:ring-yellow-400 focus:ring-2" 
                    disabled={isLoading}
                  />
                  <span className="ml-2 sm:ml-3 text-white">{t.rememberMe}</span>
                </label>
                <a href="#" className="text-yellow-400 hover:text-yellow-300 text-xs sm:text-sm touch-manipulation">
                  {t.forgotPassword}
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 sm:py-3.5 md:py-4 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed text-sm sm:text-base md:text-lg flex items-center justify-center touch-manipulation"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === 'mm' ? 'လုပ်ဆောင်နေပါသည်...' : 'Signing in...'}
                  </>
                ) : (
                  t.signIn
                )}
              </button>
            </form>

            <div className="mt-4 sm:mt-5 md:mt-6 text-center">
              <p className="text-white/70 text-xs sm:text-sm md:text-base">
                {t.noAccount} 
                <a href="#" className="text-yellow-400 hover:text-yellow-300 ml-1 touch-manipulation">
                  {t.createAccount}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginModal
