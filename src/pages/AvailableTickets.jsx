import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import LotteryCountdown from '../components/LotteryCountdown'

// Import images for enhanced UI
import coin from '../assets/coin.png'
import trophy from '../assets/img/trophy.svg'
import winner from '../assets/img/winner.png'
import moneyBag from '../assets/img/moneyBag.png'
import hot from '../assets/img/hot.png'

const AvailableTickets = () => {
  const { selectedTickets, setSelectedTickets, language } = useApp()
  const navigate = useNavigate()
  const t = translations[language]
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTickets, setFilteredTickets] = useState([])
  const [isSelecting, setIsSelecting] = useState(false)

  // Mock data for available tickets (000-999)
  const allTickets = useMemo(() => 
    Array.from({ length: 1000 }, (_, i) => i.toString().padStart(3, '0')),
    []
  )
  
  const availableTickets = useMemo(() => 
    allTickets.filter(ticket => !selectedTickets.includes(ticket)),
    [allTickets, selectedTickets]
  )

  // Filter tickets based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = availableTickets.filter(ticket => 
        ticket.includes(searchTerm)
      )
      setFilteredTickets(filtered.slice(0, 100))
    } else {
      setFilteredTickets(availableTickets.slice(0, 200))
    }
  }, [searchTerm, availableTickets])

  const handleTicketSelect = (ticket) => {
    if (!selectedTickets.includes(ticket) && selectedTickets.length < 10) {
      setIsSelecting(true)
      setSelectedTickets([...selectedTickets, ticket])
      setTimeout(() => setIsSelecting(false), 300)
    }
  }

  const getRandomLuckyNumbers = () => {
    const randomTickets = []
    const available = availableTickets.filter(t => !selectedTickets.includes(t))
    for (let i = 0; i < 3 && available.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * available.length)
      randomTickets.push(available[randomIndex])
      available.splice(randomIndex, 1)
    }
    setSelectedTickets([...selectedTickets, ...randomTickets])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 bg-cyan-400/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-yellow-400/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-16 w-12 h-12 bg-green-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-12 w-18 h-18 bg-pink-400/10 rounded-full animate-bounce"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 px-4 pt-6 pb-4">
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-cyan-400/30">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <img src={hot} alt="Hot" className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 text-center">
              {language === 'mm' ? 'ရရှိနိုင်သော မဲများ' : 'Available Tickets'}
            </h1>
            <img src={coin} alt="Coin" className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
          </div>
          <p className="text-white/80 text-center text-sm sm:text-base">
            {language === 'mm' 
              ? 'သင့်ရဲ့ ကံကောင်းသော နံပါတ်ကို ရွေးချယ်ပါ' 
              : 'Choose your lucky numbers!'
            }
          </p>
        </div>
      </div>

      {/* Lottery Countdown - Compact */}
      <div className="relative z-10 px-4 pb-4">
        <LotteryCountdown compact={true} />
      </div>

      {/* Stats and Search Section */}
      <div className="relative z-10 px-4 pb-4">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-green-400/30 mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <img src={moneyBag} alt="Available" className="w-6 h-6" />
                <span className="text-white/80 text-sm">{language === 'mm' ? 'ရရှိနိုင်' : 'Available'}</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-cyan-400">{availableTickets.length}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <img src={trophy} alt="Selected" className="w-6 h-6" />
                <span className="text-white/80 text-sm">{language === 'mm' ? 'ရွေးချယ်ထား' : 'Selected'}</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-400">{selectedTickets.length}</p>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder={language === 'mm' ? 'နံပါတ်ရှာရန်...' : 'Search numbers...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-center text-lg font-bold"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-white/70">🔍</span>
            </div>
          </div>
        </div>

        {/* Quick Select Buttons */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={getRandomLuckyNumbers}
            disabled={selectedTickets.length >= 10}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none touch-manipulation"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>🎲</span>
              <span className="text-sm">{language === 'mm' ? 'ကံထူးရွေးချယ်' : 'Lucky Pick'}</span>
            </span>
          </button>
          <button
            onClick={() => setSelectedTickets([])}
            disabled={selectedTickets.length === 0}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none touch-manipulation"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>🗑️</span>
              <span className="text-sm">{language === 'mm' ? 'ဖျက်ရန်' : 'Clear All'}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Tickets Grid */}
      <div className="relative z-10 px-4 pb-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
          <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-4 sm:mb-6">
            {language === 'mm' ? 'နံပါတ်များ ရွေးချယ်ရန်' : 'Select Your Numbers'}
          </h3>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3 max-h-80 overflow-y-auto">
            {filteredTickets.map((ticket, index) => (
              <button
                key={index}
                onClick={() => handleTicketSelect(ticket)}
                disabled={selectedTickets.length >= 10}
                className={`bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-2 sm:py-3 px-2 sm:px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110 disabled:transform-none text-xs sm:text-sm touch-manipulation ${
                  isSelecting ? 'animate-pulse' : ''
                }`}
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                {ticket}
              </button>
            ))}
          </div>

          {filteredTickets.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">🔍</span>
              <p className="text-white/70">
                {language === 'mm' 
                  ? `"${searchTerm}" နှင့် ကိုက်ညီသော နံပါတ်များ မတွေ့ရပါ` 
                  : `No numbers found matching "${searchTerm}"`
                }
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3 sm:space-y-4">
          {selectedTickets.length > 0 && (
            <button 
              onClick={() => navigate('/selected')}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 sm:py-5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 touch-manipulation"
            >
              <span className="flex items-center justify-center space-x-3">
                <img src={winner} alt="Winner" className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-base sm:text-lg md:text-xl">
                  {language === 'mm' ? 'ရွေးချယ်ထားသော မဲများ' : 'View Selected Tickets'}
                </span>
                <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                  {selectedTickets.length}
                </span>
              </span>
            </button>
          )}

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

export default AvailableTickets
