import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import { useNavigate } from 'react-router-dom'
import BannerSlider from '../components/BannerSlider'
import BannerText from '../components/BannerText'
import LotteryCountdown from '../components/LotteryCountdown'

// Import images
import coin from '../assets/coin.png'
import moneyBag from '../assets/img/moneyBag.png'
import trophy from '../assets/img/trophy.svg'
import winner from '../assets/img/winner.png'
import hot from '../assets/img/hot.png'
import promotion from '../assets/img/promotion.png'
import casinoL from '../assets/casinoL.png'
import fishL from '../assets/fishL.png'
import slotL from '../assets/img/slotL.png'
import sportL from '../assets/img/sportL.png'
import kbz from '../assets/img/kbz.png'
import wave from '../assets/img/wave.png'
import aya from '../assets/img/aya.png'
import phone from '../assets/img/phone.png'
import viber from '../assets/viber.png'
import line from '../assets/line.png'

const Home = () => {
  const { 
    isLoggedIn, 
    selectedTickets, 
    setShowLoginForm, 
    language 
  } = useApp()
  const navigate = useNavigate()
  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section with Banner */}
      <div className="px-2 sm:px-3 md:px-4 mb-4 sm:mb-6 md:mb-8">
        <BannerSlider />
      </div>

      {/* Banner Text with Marquee */}
      <div className="px-2 sm:px-3 md:px-4 mb-4 sm:mb-6 md:mb-8">
        <BannerText />
      </div>

      {/* Lottery Countdown Section */}
      <div className="px-2 sm:px-3 md:px-4 mb-4 sm:mb-6 md:mb-8">
        <LotteryCountdown />
      </div>

      {/* New Member Bonus Section */}
      <div className="px-2 sm:px-3 md:px-4 mb-4 sm:mb-6 md:mb-8">
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-yellow-400/30">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <img src={moneyBag} alt="Money Bag" className="w-8 h-8 sm:w-10 sm:h-10" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400 text-center">
              {language === 'mm' ? 'မန်ဘာသစ်အထူးဘောနပ် 100%' : 'New Member Bonus 100%'}
            </h2>
            <img src={coin} alt="Coin" className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <p className="text-white/80 text-center text-sm sm:text-base mb-4">
            {language === 'mm' 
              ? 'အသေးစိတ်သိရှိလိုပါက အောက်ပါ ဆက်သွယ်ရန်နံပါတ်များကို ဆက်သွယ်ပါ' 
              : 'Contact us for more details about our amazing bonus offers'
            }
          </p>
          <div className="flex justify-center space-x-4">
            <a href="tel:09251789588" className="flex items-center space-x-2 bg-green-500/20 hover:bg-green-500/30 px-3 py-2 rounded-lg transition-colors">
              <img src={phone} alt="Phone" className="w-5 h-5" />
              <span className="text-white text-sm">09-251789 588</span>
            </a>
            <a href="https://wa.me/09251789588" className="flex items-center space-x-2 bg-green-500/20 hover:bg-green-500/30 px-3 py-2 rounded-lg transition-colors">
              <img src={viber} alt="Viber" className="w-5 h-5" />
              <span className="text-white text-sm">Viber</span>
            </a>
            <a href="https://line.me/ti/p/~09251789588" className="flex items-center space-x-2 bg-green-500/20 hover:bg-green-500/30 px-3 py-2 rounded-lg transition-colors">
              <img src={line} alt="Line" className="w-5 h-5" />
              <span className="text-white text-sm">Line</span>
            </a>
          </div>
        </div>
      </div>

      {/* Game Categories Section */}
      <div className="px-2 sm:px-3 md:px-4 mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center mb-4">
          {language === 'mm' ? 'ဂိမ်းအမျိုးအစားများ' : 'Game Categories'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center hover:bg-white/20 transition-colors">
            <img src={casinoL} alt="Casino" className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2" />
            <p className="text-white text-xs sm:text-sm">{language === 'mm' ? 'ကာစီနို' : 'Casino'}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center hover:bg-white/20 transition-colors">
            <img src={slotL} alt="Slots" className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2" />
            <p className="text-white text-xs sm:text-sm">{language === 'mm' ? 'စလော့' : 'Slots'}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center hover:bg-white/20 transition-colors">
            <img src={fishL} alt="Fishing" className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2" />
            <p className="text-white text-xs sm:text-sm">{language === 'mm' ? 'ငါးဖမ်း' : 'Fishing'}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center hover:bg-white/20 transition-colors">
            <img src={sportL} alt="Sports" className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2" />
            <p className="text-white text-xs sm:text-sm">{language === 'mm' ? 'အားကစား' : 'Sports'}</p>
          </div>
        </div>
      </div>

      {/* Hot Promotions Section */}
      <div className="px-2 sm:px-3 md:px-4 mb-4 sm:mb-6 md:mb-8">
        <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-red-400/30">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <img src={hot} alt="Hot" className="w-6 h-6 sm:w-8 sm:h-8" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-red-400">
              {language === 'mm' ? 'ပရိုမိုးရှင်း' : 'Hot Promotions'}
            </h2>
            <img src={promotion} alt="Promotion" className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <img src={trophy} alt="Trophy" className="w-8 h-8 mx-auto mb-2" />
              <p className="text-white text-sm font-semibold">
                {language === 'mm' ? 'နေ့စဉ်ဘောနပ်' : 'Daily Bonus'}
              </p>
              <p className="text-yellow-400 text-xs">
                {language === 'mm' ? 'အမြဲတမ်း 50%' : 'Always 50%'}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <img src={winner} alt="Winner" className="w-8 h-8 mx-auto mb-2" />
              <p className="text-white text-sm font-semibold">
                {language === 'mm' ? 'အနိုင်ရသူဘောနပ်' : 'Winner Bonus'}
              </p>
              <p className="text-yellow-400 text-xs">
                {language === 'mm' ? 'အပတ်စဉ် 100%' : 'Weekly 100%'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="px-2 sm:px-3 md:px-4 mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center mb-4">
          {language === 'mm' ? 'ပေးချေမှုနည်းလမ်းများ' : 'Payment Methods'}
        </h2>
        <div className="flex justify-center space-x-3 sm:space-x-4 flex-wrap">
          <img src={kbz} alt="KBZ Pay" className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-lg p-2" />
          <img src={wave} alt="Wave Money" className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-lg p-2" />
          <img src={aya} alt="AYA Pay" className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-lg p-2" />
        </div>
      </div>

      {/* Main Action Section */}
      <div className="px-2 sm:px-3 md:px-4 space-y-3 sm:space-y-4">
        {isLoggedIn ? (
          <>
            <button 
              onClick={() => navigate('/selected')}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3 touch-manipulation"
            >
              <span className="text-2xl sm:text-3xl">🎫</span>
              <span className="text-sm sm:text-base md:text-lg">{t.selectedTickets}</span>
              {selectedTickets.length > 0 && (
                <span className="ml-auto bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                  {selectedTickets.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => navigate('/available')}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3 touch-manipulation"
            >
              <span className="text-2xl sm:text-3xl">🎲</span>
              <span className="text-sm sm:text-base md:text-lg">{t.availableTickets}</span>
            </button>

            <button 
              onClick={() => navigate('/my-tickets')}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3 touch-manipulation"
            >
              <span className="text-2xl sm:text-3xl">📋</span>
              <span className="text-sm sm:text-base md:text-lg">
                {language === 'mm' ? 'ကျွန်ုပ်၏ မဲများ' : 'My Tickets'}
              </span>
            </button>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8">
              <div className="flex justify-center space-x-4 mb-4">
                <span className="text-4xl sm:text-5xl md:text-6xl">🎰</span>
                <span className="text-4xl sm:text-5xl md:text-6xl">🎲</span>
                <span className="text-4xl sm:text-5xl md:text-6xl">🎯</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 font-bold">
                {language === 'mm' ? 'သင့်ရဲ့ ကံကောင်းမှုကို စမ်းကြည့်ပါ' : 'Try Your Luck Today!'}
              </h3>
              <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">
                {language === 'mm' 
                  ? 'နံပါတ်တွေကို ရွေးချယ်ပြီး ကံထူးမှုကို စောင့်ဆိုင်းပါ' 
                  : 'Choose your numbers and wait for the big win!'
                }
              </p>
              <button 
                onClick={() => setShowLoginForm(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base md:text-lg touch-manipulation shadow-lg"
              >
                {language === 'mm' ? 'ဝင်ရောက်ရန်' : 'Login to Start'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 sm:mt-12 pb-4 sm:pb-6 md:pb-8 px-2 sm:px-3 md:px-4 text-center">
        <p className="text-white/70 text-xs sm:text-sm">
          © 2024 {t.siteName}. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Home
