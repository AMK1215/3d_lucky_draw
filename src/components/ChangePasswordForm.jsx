import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import { useState } from 'react'

const ChangePasswordForm = () => {
  const { 
    language, 
    handleChangePassword,
    isLoading,
    error,
    setError
  } = useApp()
  
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  })
  const [localError, setLocalError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  
  const t = translations[language]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear errors when user starts typing
    if (localError || error || successMessage) {
      setLocalError('')
      setError(null)
      setSuccessMessage('')
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const validateForm = () => {
    if (!formData.current_password.trim()) {
      setLocalError(language === 'mm' ? 'လက်ရှိ စကားဝှက်ကို ရိုက်ထည့်ပါ' : 'Please enter current password')
      return false
    }

    if (!formData.new_password.trim()) {
      setLocalError(language === 'mm' ? 'စကားဝှက်အသစ်ကို ရိုက်ထည့်ပါ' : 'Please enter new password')
      return false
    }

    if (formData.new_password.length < 6) {
      setLocalError(language === 'mm' ? 'စကားဝှက်အသစ်သည် အနည်းဆုံး ၆ လုံး ရှိရပါမည်' : 'New password must be at least 6 characters')
      return false
    }

    if (formData.new_password !== formData.new_password_confirmation) {
      setLocalError(language === 'mm' ? 'စကားဝှက်အသစ်များ မတူညီပါ' : 'New passwords do not match')
      return false
    }

    if (formData.current_password === formData.new_password) {
      setLocalError(language === 'mm' ? 'စကားဝှက်အသစ်သည် လက်ရှိ စကားဝှက်နှင့် မတူညီရပါ' : 'New password must be different from current password')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const result = await handleChangePassword(formData)
    
    if (result.success) {
      setSuccessMessage(result.message)
      setFormData({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      })
      setLocalError('')
    } else {
      setLocalError(result.message)
    }
  }

  const displayError = localError || error

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
          {language === 'mm' ? 'စကားဝှက် ပြောင်းလဲရန်' : 'Change Password'}
        </h3>
        <p className="text-white/70 text-sm">
          {language === 'mm' ? 'သင့်အကောင့်လုံခြုံရေးအတွက် စကားဝှက်ကို ပုံမှန်ပြောင်းလဲပေးပါ' : 'Regularly update your password for account security'}
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
          <p className="text-green-200 text-sm text-center">{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {displayError && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-200 text-sm text-center">{displayError}</p>
        </div>
      )}

      <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
        {/* Current Password */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            {language === 'mm' ? 'လက်ရှိ စကားဝှက်' : 'Current Password'}
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              name="current_password"
              value={formData.current_password}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base pr-10"
              placeholder={language === 'mm' ? 'လက်ရှိ စကားဝှက်ကို ရိုက်ထည့်ပါ' : 'Enter current password'}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              disabled={isLoading}
            >
              {showPasswords.current ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L12 12m-3.122-3.122l1.415-1.414M12 12l3.122 3.122m0 0l1.414 1.415M12 12l-3.122 3.122m0 0l-1.415 1.414M12 12l3.122-3.122" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            {language === 'mm' ? 'စကားဝှက်အသစ်' : 'New Password'}
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              name="new_password"
              value={formData.new_password}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base pr-10"
              placeholder={language === 'mm' ? 'စကားဝှက်အသစ်ကို ရိုက်ထည့်ပါ' : 'Enter new password'}
              required
              disabled={isLoading}
              minLength={6}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              disabled={isLoading}
            >
              {showPasswords.new ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L12 12m-3.122-3.122l1.415-1.414M12 12l3.122 3.122m0 0l1.414 1.415M12 12l-3.122 3.122m0 0l-1.415 1.414M12 12l3.122-3.122" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            {language === 'mm' ? 'စကားဝှက်အသစ် အတည်ပြုရန်' : 'Confirm New Password'}
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              name="new_password_confirmation"
              value={formData.new_password_confirmation}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base pr-10"
              placeholder={language === 'mm' ? 'စကားဝှက်အသစ်ကို ထပ်မံရိုက်ထည့်ပါ' : 'Confirm new password'}
              required
              disabled={isLoading}
              minLength={6}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              disabled={isLoading}
            >
              {showPasswords.confirm ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L12 12m-3.122-3.122l1.415-1.414M12 12l3.122 3.122m0 0l1.414 1.415M12 12l-3.122 3.122m0 0l-1.415 1.414M12 12l3.122-3.122" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4">
          <h4 className="text-blue-300 text-sm font-medium mb-2">
            {language === 'mm' ? 'စကားဝှက် လိုအပ်ချက်များ' : 'Password Requirements'}
          </h4>
          <ul className="text-blue-200 text-xs space-y-1">
            <li>• {language === 'mm' ? 'အနည်းဆုံး ၆ လုံး ရှိရပါမည်' : 'At least 6 characters long'}</li>
            <li>• {language === 'mm' ? 'လက်ရှိ စကားဝှက်နှင့် မတူညီရပါ' : 'Must be different from current password'}</li>
            <li>• {language === 'mm' ? 'စကားဝှက်အသစ်နှစ်ခုလုံး တူညီရပါမည်' : 'Both new passwords must match'}</li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {language === 'mm' ? 'စကားဝှက် ပြောင်းလဲနေပါသည်...' : 'Changing password...'}
            </>
          ) : (
            <>
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {language === 'mm' ? 'စကားဝှက် ပြောင်းလဲရန်' : 'Change Password'}
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default ChangePasswordForm
