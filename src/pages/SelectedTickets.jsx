import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Import images for enhanced UI
import coin from '../assets/coin.png'
import trophy from '../assets/img/trophy.svg'
import winner from '../assets/img/winner.png'
import moneyBag from '../assets/img/moneyBag.png'

const SelectedTickets = () => {
  const { selectedTickets, language } = useApp()
  const navigate = useNavigate()
  const t = translations[language]
  const [isAnimating, setIsAnimating] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)

  // Calculate total amount (assuming 1000 kyats per ticket)
  useEffect(() => {
    setTotalAmount(selectedTickets.length * 1000)
  }, [selectedTickets])

  // Animation effect for ticket selection
  useEffect(() => {
    if (selectedTickets.length > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [selectedTickets.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-orange-400/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-12 h-12 bg-pink-400/10 rounded-full animate-bounce"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 px-4 pt-6 pb-4">
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-yellow-400/30">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <img src={trophy} alt="Trophy" className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 text-center">
              {language === 'mm' ? 'ရွေးချယ်ထားသော မဲများ' : 'Your Selected Tickets'}
            </h1>
            <img src={coin} alt="Coin" className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
          </div>
          <p className="text-white/80 text-center text-sm sm:text-base">
            {language === 'mm' 
              ? 'သင့်ရဲ့ ကံကောင်းမှုကို စမ်းကြည့်ပါ' 
              : 'Your lucky numbers are ready!'
            }
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-6">
        {selectedTickets.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
              <div className="flex justify-center space-x-4 mb-6">
                <span className="text-5xl sm:text-6xl animate-bounce">🎫</span>
                <span className="text-5xl sm:text-6xl animate-pulse">🎲</span>
                <span className="text-5xl sm:text-6xl animate-bounce">🎯</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 font-bold">
                {language === 'mm' ? 'မဲများ မရွေးချယ်ရသေးပါ' : 'No Tickets Selected Yet'}
              </h3>
              <p className="text-white/70 mb-6 sm:mb-8 text-sm sm:text-base">
                {language === 'mm' 
                  ? 'ကံကောင်းမှုကို စမ်းကြည့်ရန် မဲများကို ရွေးချယ်ပါ' 
                  : 'Select your lucky numbers to start playing!'
                }
              </p>
              <button 
                onClick={() => navigate('/available')}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg touch-manipulation"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>🎲</span>
                  <span>{language === 'mm' ? 'မဲရွေးချယ်ရန်' : 'Select Tickets'}</span>
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* Stats Card */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-green-400/30">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <img src={moneyBag} alt="Money" className="w-6 h-6" />
                    <span className="text-white/80 text-sm">{language === 'mm' ? 'ရွေးချယ်ထားသော မဲ' : 'Selected'}</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-400">{selectedTickets.length}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <img src={coin} alt="Amount" className="w-6 h-6" />
                    <span className="text-white/80 text-sm">{language === 'mm' ? 'စုစုပေါင်း' : 'Total'}</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-green-400">{totalAmount.toLocaleString()} ကျပ်</p>
                </div>
              </div>
            </div>
            
            {/* Tickets Grid */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-4 sm:mb-6">
                {language === 'mm' ? 'သင့်ရဲ့ ကံကောင်းသော နံပါတ်များ' : 'Your Lucky Numbers'}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
                {selectedTickets.map((ticket, index) => (
                  <div 
                    key={index} 
                    className={`bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-3 sm:p-4 text-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-2 ${
                      isAnimating ? 'animate-pulse' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">{ticket}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <button 
                onClick={() => navigate('/payment')}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 sm:py-5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 touch-manipulation"
              >
                <span className="flex items-center justify-center space-x-3">
                  <img src={winner} alt="Winner" className="w-6 h-6 sm:w-8 sm:h-8" />
                  <span className="text-base sm:text-lg md:text-xl">
                    {language === 'mm' ? 'ငွေလွှဲရန်' : 'Proceed to Payment'}
                  </span>
                  <span className="text-2xl">💳</span>
                </span>
              </button>

              <button 
                onClick={() => navigate('/available')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-3 sm:py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 touch-manipulation"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>➕</span>
                  <span className="text-sm sm:text-base">
                    {language === 'mm' ? 'မဲထပ်ရွေးချယ်ရန်' : 'Add More Tickets'}
                  </span>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectedTickets
