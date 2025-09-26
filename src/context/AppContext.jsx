import { createContext, useContext, useState, useEffect } from 'react'
import authService from '../services/authService'
import apiService from '../services/apiService'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [selectedTickets, setSelectedTickets] = useState([])
  const [language, setLanguage] = useState('mm')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [playerBalance, setPlayerBalance] = useState(0)
  const [user, setUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [bannerIndex, setBannerIndex] = useState(0)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [banners, setBanners] = useState([])
  const [bannerTexts, setBannerTexts] = useState([])

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const result = await apiService.getUserData()
      if (result.success && result.data) {
        const userData = result.data.data || result.data
        setUser(userData)
        setPlayerBalance(parseFloat(userData.balance) || 0)
        return userData
      } else {
        console.error('Failed to fetch user data:', result.message)
        return null
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      return null
    }
  }

  // Fetch banners from API
  const fetchBanners = async () => {
    try {
      const result = await apiService.getBanners()
      
      if (result.success && result.data) {
        const bannersData = result.data.data || result.data
        setBanners(bannersData)
        return bannersData
      } else {
        console.error('Failed to fetch banners:', result.message)
        // Set fallback banners if API fails
        setBanners([])
        return null
      }
    } catch (error) {
      console.error('Error fetching banners:', error)
      setBanners([])
      return null
    }
  }

  // Fetch banner texts from API
  const fetchBannerTexts = async () => {
    try {
      const result = await apiService.getBannerTexts()
      
      if (result.success && result.data) {
        const bannerTextsData = result.data.data || result.data
        setBannerTexts(bannerTextsData)
        return bannerTextsData
      } else {
        console.error('Failed to fetch banner texts:', result.message)
        // Set fallback banner texts if API fails
        setBannerTexts([])
        return null
      }
    } catch (error) {
      console.error('Error fetching banner texts:', error)
      setBannerTexts([])
      return null
    }
  }

  // Check authentication status and fetch banners on app load
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Fetch banners and banner texts first (no auth required)
        await Promise.all([
          fetchBanners(),
          fetchBannerTexts()
        ])
        
        // Check authentication status
        const isAuth = authService.isAuthenticated()
        setIsLoggedIn(isAuth)
        
        if (isAuth) {
          // First try to get data from localStorage
          const localUserData = authService.getCurrentUserData()
          if (localUserData) {
            setUser(localUserData)
            setPlayerBalance(parseFloat(localUserData.balance) || 0)
          }
          
          // Then fetch fresh data from API
          await fetchUserData()
        }
      } catch (error) {
        console.error('Error initializing app:', error)
        setIsLoggedIn(false)
      }
    }

    initializeApp()
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === 'mm' ? 'en' : 'mm')
  }

  const handleLogin = async (credentials, rememberMe = false) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await authService.login(credentials, rememberMe)
      
      if (result.success) {
        setIsLoggedIn(true)
        setUser(result.data.user)
        setPlayerBalance(parseFloat(result.data.user.balance) || 0)
        setShowLoginForm(false)
        return { success: true, message: 'Login successful' }
      } else {
        setError(result.message || 'Login failed')
        return { success: false, message: result.message || 'Login failed' }
      }
    } catch (error) {
      const errorMessage = 'Network error. Please try again.'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await authService.logout()
      setIsLoggedIn(false)
      setUser(null)
      setPlayerBalance(0)
      setSelectedTickets([])
      setError(null)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async (passwordData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await authService.changePassword(passwordData)
      
      if (result.success) {
        return { success: true, message: result.message || 'Password changed successfully' }
      } else {
        setError(result.message || 'Failed to change password')
        return { success: false, message: result.message || 'Failed to change password' }
      }
    } catch (error) {
      const errorMessage = 'Network error. Please try again.'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUserData = async () => {
    if (isLoggedIn) {
      await fetchUserData()
    }
  }

  const value = {
    selectedTickets,
    setSelectedTickets,
    language,
    setLanguage,
    isLoggedIn,
    setIsLoggedIn,
    playerBalance,
    setPlayerBalance,
    user,
    setUser,
    sidebarOpen,
    setSidebarOpen,
    bannerIndex,
    setBannerIndex,
    showLoginForm,
    setShowLoginForm,
    isLoading,
    setIsLoading,
    error,
    setError,
    banners,
    setBanners,
    bannerTexts,
    setBannerTexts,
    toggleLanguage,
    handleLogin,
    handleLogout,
    handleChangePassword,
    refreshUserData,
    fetchUserData,
    fetchBanners,
    fetchBannerTexts
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
