import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import apiService from '../services/apiService'

// Import images for enhanced UI
import coin from '../assets/coin.png'
import trophy from '../assets/img/trophy.svg'
import winner from '../assets/img/winner.png'
import moneyBag from '../assets/img/moneyBag.png'
import hot from '../assets/img/hot.png'

const MyTickets = () => {
  const { user, language } = useApp()
  const navigate = useNavigate()
  const t = translations[language]
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    date: '',
    status: '',
    page: 1,
    limit: 20
  })
  const [pagination, setPagination] = useState({})
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    totalAmount: 0
  })

  // Fetch user's tickets
  const fetchMyTickets = async () => {
    if (!user?.id) {
      setError('User not authenticated')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const result = await apiService.getMyTickets(filters)
      
      console.log('API Response:', result) // Debug logging
      console.log('API Response Data:', result.data) // Debug logging
      console.log('API Response Tickets:', result.data?.data?.tickets) // Debug logging
      
      if (result.success) {
        const tickets = result.data?.data?.tickets || []
        const pagination = result.data?.data?.pagination || {}
        
        console.log('Tickets extracted:', tickets)
        console.log('Pagination extracted:', pagination)
        console.log('Tickets length:', tickets.length)
        
        setTickets(tickets)
        setPagination(pagination)
        
        // Calculate stats
        const ticketStats = tickets.reduce((acc, ticket) => {
          acc.total += 1
          acc.totalAmount += parseFloat(ticket.amount || 0)
          if (ticket.payment_status === 'completed') acc.completed += 1
          if (ticket.payment_status === 'pending') acc.pending += 1
          return acc
        }, { total: 0, completed: 0, pending: 0, totalAmount: 0 })
        
        console.log('Calculated stats:', ticketStats)
        setStats(ticketStats)
      } else {
        console.error('API Error:', result)
        setError(result.message || result.data?.message || 'Failed to fetch tickets')
      }
    } catch (error) {
      console.error('Error fetching tickets:', error)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMyTickets()
  }, [user?.id, filters.date, filters.status, filters.page])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }))
  }

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }))
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
        <div className="text-center text-white">
          <p className="text-lg mb-4">{language === 'mm' ? 'အကောင့်ဝင်ရောက်ရန် လိုအပ်ပါသည်' : 'Please login to view your tickets'}</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            {language === 'mm' ? 'မူလစာမျက်နှာသို့' : 'Back to Home'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-400/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-green-400/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-16 w-12 h-12 bg-blue-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-12 w-18 h-18 bg-pink-400/10 rounded-full animate-bounce"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 px-4 pt-6 pb-4">
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-yellow-400/30">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <img src={trophy} alt="Trophy" className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 text-center">
              {language === 'mm' ? 'ကျွန်ုပ်၏ မဲများ' : 'My Tickets'}
            </h1>
            <img src={coin} alt="Coin" className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
          </div>
          <p className="text-white/80 text-center text-sm sm:text-base">
            {language === 'mm' 
              ? 'သင့်ရဲ့ မဲများ၏ မှတ်တမ်းများကို ကြည့်ရှုပါ' 
              : 'View your lottery ticket history'
            }
          </p>
        </div>
      </div>

      {/* Debug Section - Remove this after fixing */}
      {/* <div className="relative z-10 px-4 pb-4">
        <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-4 border border-red-400/30">
          <h3 className="text-red-400 font-bold mb-2">Debug Info:</h3>
          <p className="text-white text-sm">Tickets Count: {tickets.length}</p>
          <p className="text-white text-sm">Loading: {loading.toString()}</p>
          <p className="text-white text-sm">Error: {error || 'None'}</p>
          <p className="text-white text-sm">User ID: {user?.id || 'Not logged in'}</p>
        </div>
      </div> */}

      {/* Stats Section */}
      <div className="relative z-10 px-4 pb-4">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-green-400/30">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <img src={moneyBag} alt="Total" className="w-6 h-6" />
                <span className="text-white/80 text-sm">{language === 'mm' ? 'စုစုပေါင်း' : 'Total'}</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-400">{stats.total}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <img src={trophy} alt="Completed" className="w-6 h-6" />
                <span className="text-white/80 text-sm">{language === 'mm' ? 'ပြီးစီး' : 'Completed'}</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-green-400">{stats.completed}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <img src={hot} alt="Pending" className="w-6 h-6" />
                <span className="text-white/80 text-sm">{language === 'mm' ? 'စောင့်ဆိုင်း' : 'Pending'}</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-400">{stats.pending}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <img src={coin} alt="Amount" className="w-6 h-6" />
                <span className="text-white/80 text-sm">{language === 'mm' ? 'ငွေ' : 'Amount'}</span>
              </div>
              <p className="text-lg sm:text-xl font-bold text-purple-400">{stats.totalAmount.toLocaleString()} ကျပ်</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="relative z-10 px-4 pb-4">
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
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">
                {language === 'mm' ? 'အခြေအနေ' : 'Status'}
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
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
                onClick={() => setFilters({ date: '', status: '', page: 1, limit: 20 })}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {language === 'mm' ? 'ရှင်းလင်းရန်' : 'Clear'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="relative z-10 px-4 pb-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-white/70">{language === 'mm' ? 'ဖွင့်နေပါသည်...' : 'Loading...'}</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">❌</span>
              <p className="text-red-400 mb-4">{error}</p>
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
                  <div key={ticket.id} className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-2">
                          <span className="text-white font-bold text-lg">{ticket.selected_digit}</span>
                        </div>
                        <div>
                          <p className="text-white font-semibold">
                            {language === 'mm' ? 'နံပါတ်' : 'Number'}: {ticket.selected_digit}
                          </p>
                          <p className="text-white/70 text-sm">
                            {formatDate(ticket.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">{ticket.amount} ကျပ်</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.payment_status)}`}>
                          {getStatusText(ticket.payment_status)}
                        </span>
                      </div>
                    </div>
                    {ticket.payment_reference && (
                      <p className="text-white/60 text-sm">
                        {language === 'mm' ? 'ငွေလွှဲကုဒ်' : 'Payment Ref'}: {ticket.payment_reference}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-6">
                  <button
                    onClick={() => handlePageChange(filters.page - 1)}
                    disabled={filters.page <= 1}
                    className="px-3 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {language === 'mm' ? 'နောက်သို့' : 'Previous'}
                  </button>
                  <span className="text-white px-4">
                    {filters.page} / {pagination.last_page}
                  </span>
                  <button
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={filters.page >= pagination.last_page}
                    className="px-3 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {language === 'mm' ? 'ရှေ့သို့' : 'Next'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 px-4 pb-6">
        <div className="space-y-3">
          <button 
            onClick={() => navigate('/available')}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 touch-manipulation"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>🎲</span>
              <span className="text-sm sm:text-base">
                {language === 'mm' ? 'မဲအသစ်ရွေးချယ်ရန်' : 'Select New Tickets'}
              </span>
            </span>
          </button>

          <button 
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 sm:py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 touch-manipulation"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>🏠</span>
              <span className="text-sm sm:text-base">
                {language === 'mm' ? 'မူလစာမျက်နှာသို့' : 'Back to Home'}
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyTickets
