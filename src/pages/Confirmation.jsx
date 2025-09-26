import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import { useNavigate, useLocation } from 'react-router-dom'

const Confirmation = () => {
  const { selectedTickets, setSelectedTickets, language } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const t = translations[language]

  // Get data passed from Payment page
  const { tickets, paymentResult, paymentImage } = location.state || {}
  
  // Use tickets from payment result or fallback to selectedTickets
  const confirmedTickets = tickets?.tickets || selectedTickets
  const totalAmount = tickets?.total_amount || (selectedTickets.length * 1000)
  const totalTickets = tickets?.total_tickets || selectedTickets.length

  const handleNewTickets = () => {
    setSelectedTickets([])
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
      <div className="px-4 pt-4">
        {/* Success Message */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 text-center mb-6">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-white mb-4">{t.thankYou}</h2>
          <p className="text-white text-lg leading-relaxed">
            {language === 'mm' 
              ? 'သင့်လက်မှတ်များ အောင်မြင်စွာ ပေးချေပြီးပါပြီ' 
              : 'Your tickets have been successfully paid'
            }
            <br />
            {language === 'mm' 
              ? 'လက်မှတ်များကို စစ်ဆေးပါ' 
              : 'Please check your tickets'
            }
          </p>
        </div>

        {/* Payment Summary */}
        {tickets && (
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">
              {language === 'mm' ? 'ပေးချေမှု အချက်အလက်' : 'Payment Details'}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-white">
                <span>{language === 'mm' ? 'လက်မှတ်အရေအတွက်:' : 'Number of Tickets:'}</span>
                <span className="font-bold text-yellow-400">{totalTickets}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>{language === 'mm' ? 'စုစုပေါင်း ငွေပမာဏ:' : 'Total Amount:'}</span>
                <span className="font-bold text-yellow-400">{totalAmount.toLocaleString()} ကျပ်</span>
              </div>
              <div className="flex justify-between text-white">
                <span>{language === 'mm' ? 'ပေးချေမှု နည်းလမ်း:' : 'Payment Method:'}</span>
                <span className="font-bold text-green-400">KPay</span>
              </div>
              <div className="flex justify-between text-white">
                <span>{language === 'mm' ? 'ပေးချေမှု အခြေအနေ:' : 'Payment Status:'}</span>
                <span className="font-bold text-green-400">
                  {language === 'mm' ? 'ပြီးစီးပါပြီ' : 'Completed'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Payment Screenshot */}
        {paymentImage && (
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">
              {language === 'mm' ? 'ပေးချေမှု စကရင်ရော့ ပုံ' : 'Payment Screenshot'}
            </h3>
            <div className="text-center">
              <img
                src={paymentImage}
                alt="Payment Screenshot"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
              <p className="text-white text-opacity-70 text-sm mt-3">
                {language === 'mm' 
                  ? 'ဤပုံကို အက်မင်များက စစ်ဆေးပြီး အတည်ပြုပေးမည်' 
                  : 'This image will be verified by administrators'
                }
              </p>
            </div>
          </div>
        )}

        {/* Selected Tickets */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">
            {language === 'mm' ? 'သင့်လက်မှတ်များ' : 'Your Tickets'}
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {confirmedTickets.map((ticket, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-3 text-center">
                <span className="text-sm font-bold text-white">
                  {typeof ticket === 'string' ? ticket : ticket.selected_digit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={handleNewTickets}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:from-blue-600 hover:to-cyan-700 transition-all"
          >
            {language === 'mm' ? 'လက်မှတ်အသစ်များ ရွေးချယ်ပါ' : 'Select New Tickets'}
          </button>
          
          <button 
            onClick={() => navigate('/selected')}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all"
          >
            {language === 'mm' ? 'လက်မှတ်များကို ကြည့်ရှုပါ' : 'View Tickets'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
