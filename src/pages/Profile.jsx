import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ChangePasswordForm from '../components/ChangePasswordForm'
import apiService from '../services/apiService'

// Import images for enhanced UI
import coin from '../assets/coin.png'
import trophy from '../assets/img/trophy.svg'
import winner from '../assets/img/winner.png'
import moneyBag from '../assets/img/moneyBag.png'
import hot from '../assets/img/hot.png'

const Profile = () => {
  const { 
    user, 
    playerBalance, 
    language, 
    refreshUserData,
    isLoading 
  } = useApp()
  
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [tickets, setTickets] = useState([])
  const [ticketLoading, setTicketLoading] = useState(false)
  const [ticketError, setTicketError] = useState(null)
  const [ticketFilters, setTicketFilters] = useState({
    date: '',
    status: '',
    page: 1,
    limit: 10
  })
  const [ticketPagination, setTicketPagination] = useState({})
  const [ticketStats, setTicketStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    totalAmount: 0
  })
  const t = translations[language]

  useEffect(() => {
    // Refresh user data when component mounts
    refreshUserData()
  }, [refreshUserData])

  // Fetch user's tickets
  const fetchMyTickets = async () => {
    if (!user?.id) return

    try {
      setTicketLoading(true)
      setTicketError(null)
      
      const result = await apiService.getMyTickets(ticketFilters)
      
      if (result.success) {
        const tickets = result.data?.data?.tickets || []
        const pagination = result.data?.data?.pagination || {}
        
        setTickets(tickets)
        setTicketPagination(pagination)
        
        // Calculate stats
        const stats = tickets.reduce((acc, ticket) => {
          acc.total += 1
          acc.totalAmount += parseFloat(ticket.amount || 0)
          if (ticket.payment_status === 'completed') acc.completed += 1
          if (ticket.payment_status === 'pending') acc.pending += 1
          return acc
        }, { total: 0, completed: 0, pending: 0, totalAmount: 0 })
        
        setTicketStats(stats)
      } else {
        setTicketError(result.message || 'Failed to fetch tickets')
      }
    } catch (error) {
      console.error('Error fetching tickets:', error)
      setTicketError('Network error. Please try again.')
    } finally {
      setTicketLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'tickets') {
      fetchMyTickets()
    }
  }, [activeTab, ticketFilters.date, ticketFilters.status, ticketFilters.page])

  const handleTicketFilterChange = (key, value) => {
    setTicketFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }))
  }

  const handleTicketPageChange = (newPage) => {
    setTicketFilters(prev => ({ ...prev, page: newPage }))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20'
      case 'pending': return 'text-yellow-400 bg-yellow-400/20'
      case 'failed': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return language === 'mm' ? 'ပြီးစီးပါပြီ' : 'Completed'
      case 'pending': return language === 'mm' ? 'စောင့်ဆိုင်းနေပါသည်' : 'Pending'
      case 'failed': return language === 'mm' ? 'မအောင်မြင်ပါ' : 'Failed'
      default: return status
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>{language === 'mm' ? 'အချက်အလက်များ ရယူနေပါသည်...' : 'Loading user data...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {language === 'mm' ? 'အသုံးပြုသူ ပရိုဖိုင်' : 'User Profile'}
          </h1>
          <p className="text-white/70 text-sm sm:text-base">
            {language === 'mm' ? 'သင့်အချက်အလက်များကို စီမံခန့်ခွဲပါ' : 'Manage your account information'}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {language === 'mm' ? 'ပရိုဖိုင်' : 'Profile'}
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'security'
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {language === 'mm' ? 'လုံခြုံရေး' : 'Security'}
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'tickets'
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {language === 'mm' ? 'မဲများ' : 'Tickets'}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 sm:space-y-8">
          {activeTab === 'profile' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                {language === 'mm' ? 'အချက်အလက်များ' : 'Profile Information'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* User Info */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {language === 'mm' ? 'အမည်' : 'Full Name'}
                    </label>
                    <div className="bg-white/20 rounded-lg p-3 sm:p-4">
                      <p className="text-white font-medium">{user.name || 'N/A'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {language === 'mm' ? 'အသုံးပြုသူအမည်' : 'Username'}
                    </label>
                    <div className="bg-white/20 rounded-lg p-3 sm:p-4">
                      <p className="text-white font-medium">{user.user_name || 'N/A'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {language === 'mm' ? 'ဖုန်းနံပါတ်' : 'Phone Number'}
                    </label>
                    <div className="bg-white/20 rounded-lg p-3 sm:p-4">
                      <p className="text-white font-medium">{user.phone || 'N/A'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {language === 'mm' ? 'အီးမေးလ်' : 'Email'}
                    </label>
                    <div className="bg-white/20 rounded-lg p-3 sm:p-4">
                      <p className="text-white font-medium">{user.email || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Balance Info */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {language === 'mm' ? 'လက်ကျန်ငွေ' : 'Current Balance'}
                    </label>
                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-lg p-3 sm:p-4">
                      <p className="text-yellow-400 font-bold text-lg sm:text-xl">
                        {playerBalance.toLocaleString()} {t.kyat}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {language === 'mm' ? 'အဓိကလက်ကျန်ငွေ' : 'Main Balance'}
                    </label>
                    <div className="bg-white/20 rounded-lg p-3 sm:p-4">
                      <p className="text-white font-medium">
                        {user.main_balance ? parseFloat(user.main_balance).toLocaleString() : '0'} {t.kyat}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {language === 'mm' ? 'အကောင့်အခြေအနေ' : 'Account Status'}
                    </label>
                    <div className="bg-white/20 rounded-lg p-3 sm:p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 1 
                          ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                          : 'bg-red-500/20 text-red-400 border border-red-400/30'
                      }`}>
                        {user.status === 1 
                          ? (language === 'mm' ? 'အသုံးပြုနိုင်သည်' : 'Active')
                          : (language === 'mm' ? 'ပိတ်ထားသည်' : 'Inactive')
                        }
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {language === 'mm' ? 'အကောင့်နံပါတ်' : 'Account ID'}
                    </label>
                    <div className="bg-white/20 rounded-lg p-3 sm:p-4">
                      <p className="text-white font-medium">#{user.id}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Refresh Button */}
              <div className="mt-6 sm:mt-8 flex justify-center">
                <button
                  onClick={refreshUserData}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-2.5 px-6 sm:px-8 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{language === 'mm' ? 'ပြန်လည်ရယူနေပါသည်...' : 'Refreshing...'}</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>{language === 'mm' ? 'အချက်အလက်များ ပြန်လည်ရယူရန်' : 'Refresh Data'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                {language === 'mm' ? 'လုံခြုံရေး စီမံခန့်ခွဲမှု' : 'Security Management'}
              </h2>
              
              <ChangePasswordForm />
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="space-y-6">
              {/* Ticket Stats */}
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-green-400/30">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <img src={moneyBag} alt="Total" className="w-5 h-5" />
                      <span className="text-white/80 text-xs sm:text-sm">{language === 'mm' ? 'စုစုပေါင်း' : 'Total'}</span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-blue-400">{ticketStats.total}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <img src={trophy} alt="Completed" className="w-5 h-5" />
                      <span className="text-white/80 text-xs sm:text-sm">{language === 'mm' ? 'ပြီးစီး' : 'Completed'}</span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-green-400">{ticketStats.completed}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <img src={hot} alt="Pending" className="w-5 h-5" />
                      <span className="text-white/80 text-xs sm:text-sm">{language === 'mm' ? 'စောင့်ဆိုင်း' : 'Pending'}</span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-yellow-400">{ticketStats.pending}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <img src={coin} alt="Amount" className="w-5 h-5" />
                      <span className="text-white/80 text-xs sm:text-sm">{language === 'mm' ? 'ငွေ' : 'Amount'}</span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-purple-400">{ticketStats.totalAmount.toLocaleString()} ကျပ်</p>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">
                  {language === 'mm' ? 'စစ်ထုတ်ရန်' : 'Filters'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">
                      {language === 'mm' ? 'ရက်စွဲ' : 'Date'}
                    </label>
                    <input
                      type="date"
                      value={ticketFilters.date}
                      onChange={(e) => handleTicketFilterChange('date', e.target.value)}
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">
                      {language === 'mm' ? 'အခြေအနေ' : 'Status'}
                    </label>
                    <select
                      value={ticketFilters.status}
                      onChange={(e) => handleTicketFilterChange('status', e.target.value)}
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <option value="">{language === 'mm' ? 'အားလုံး' : 'All'}</option>
                      <option value="completed">{language === 'mm' ? 'ပြီးစီးပါပြီ' : 'Completed'}</option>
                      <option value="pending">{language === 'mm' ? 'စောင့်ဆိုင်းနေပါသည်' : 'Pending'}</option>
                      <option value="failed">{language === 'mm' ? 'မအောင်မြင်ပါ' : 'Failed'}</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => setTicketFilters({ date: '', status: '', page: 1, limit: 10 })}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      {language === 'mm' ? 'ရှင်းလင်းရန်' : 'Clear'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Tickets List */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
                {ticketLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                    <p className="text-white/70">{language === 'mm' ? 'ဖွင့်နေပါသည်...' : 'Loading...'}</p>
                  </div>
                ) : ticketError ? (
                  <div className="text-center py-8">
                    <span className="text-4xl mb-4 block">❌</span>
                    <p className="text-red-400 mb-4">{ticketError}</p>
                    <button
                      onClick={fetchMyTickets}
                      className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      {language === 'mm' ? 'ပြန်လည်ကြိုးစားရန်' : 'Try Again'}
                    </button>
                  </div>
                ) : tickets.length === 0 ? (
                  <div className="text-center py-8">
                    <span className="text-4xl mb-4 block">🎫</span>
                    <p className="text-white/70 mb-4">
                      {language === 'mm' ? 'မဲများ မတွေ့ရပါ' : 'No tickets found'}
                    </p>
                    <button
                      onClick={() => navigate('/available')}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      {language === 'mm' ? 'မဲရွေးချယ်ရန်' : 'Select Tickets'}
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-white mb-4">
                      {language === 'mm' ? 'မဲများ' : 'Tickets'} ({tickets.length})
                    </h3>
                    <div className="space-y-3">
                      {tickets.map((ticket) => (
                        <div key={ticket.id} className="bg-white/10 rounded-xl p-3 sm:p-4 border border-white/20">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-2">
                                <span className="text-white font-bold text-sm sm:text-base">{ticket.selected_digit}</span>
                              </div>
                              <div>
                                <p className="text-white font-semibold text-sm sm:text-base">
                                  {language === 'mm' ? 'နံပါတ်' : 'Number'}: {ticket.selected_digit}
                                </p>
                                <p className="text-white/70 text-xs sm:text-sm">
                                  {formatDate(ticket.created_at)}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-bold text-sm sm:text-base">{ticket.amount} ကျပ်</p>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.payment_status)}`}>
                                {getStatusText(ticket.payment_status)}
                              </span>
                            </div>
                          </div>
                          {ticket.payment_reference && (
                            <p className="text-white/60 text-xs">
                              {language === 'mm' ? 'ငွေလွှဲကုဒ်' : 'Payment Ref'}: {ticket.payment_reference}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {ticketPagination.last_page > 1 && (
                      <div className="flex justify-center items-center space-x-2 mt-6">
                        <button
                          onClick={() => handleTicketPageChange(ticketFilters.page - 1)}
                          disabled={ticketFilters.page <= 1}
                          className="px-3 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          {language === 'mm' ? 'နောက်သို့' : 'Previous'}
                        </button>
                        <span className="text-white px-4 text-sm">
                          {ticketFilters.page} / {ticketPagination.last_page}
                        </span>
                        <button
                          onClick={() => handleTicketPageChange(ticketFilters.page + 1)}
                          disabled={ticketFilters.page >= ticketPagination.last_page}
                          className="px-3 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          {language === 'mm' ? 'ရှေ့သို့' : 'Next'}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/available')}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 touch-manipulation"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>🎲</span>
                    <span className="text-sm sm:text-base">
                      {language === 'mm' ? 'မဲအသစ်ရွေးချယ်ရန်' : 'Select New Tickets'}
                    </span>
                  </span>
                </button>

                <button 
                  onClick={() => navigate('/my-tickets')}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 touch-manipulation"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>📋</span>
                    <span className="text-sm sm:text-base">
                      {language === 'mm' ? 'အပြည့်အစုံကြည့်ရန်' : 'View Full History'}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
