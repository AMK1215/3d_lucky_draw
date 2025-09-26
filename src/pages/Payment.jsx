import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import { useNavigate } from 'react-router-dom'
import apiService from '../services/apiService'
import kpayQR from '../assets/kpay_qr/kpay-qr.jpg'

const Payment = () => {
  const { selectedTickets, language, user, setSelectedTickets } = useApp()
  const navigate = useNavigate()
  const t = translations[language]

  const [isCreatingTickets, setIsCreatingTickets] = useState(false)
  const [createdTickets, setCreatedTickets] = useState(null)
  const [error, setError] = useState(null)
  const [paymentImage, setPaymentImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const amountPerTicket = 1000
  const totalAmount = selectedTickets.length * amountPerTicket

  // Handle redirect when no tickets are selected
  useEffect(() => {
    if (selectedTickets.length === 0) {
      navigate('/available')
    }
  }, [selectedTickets.length, navigate])

  // Create lottery tickets with payment image
  const createLotteryTicketsWithPayment = async () => {
    if (!user || !user.id) {
      setError('User information not found. Please login again.')
      return
    }

    if (!paymentImage) {
      setError('Please upload a payment screenshot to verify your payment.')
      return
    }

    setIsCreatingTickets(true)
    setError(null)

    try {
      const ticketData = {
        player_id: user.id,
        player_user_name: user.username || user.name || user.email,
        selected_digits: selectedTickets,
        amount_per_ticket: amountPerTicket,
        selected_datetime: new Date().toISOString(),
        payment_method: 'kpay',
        payment_reference: `KPAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }

      console.log('Creating lottery tickets with payment image:', ticketData)
      
      const result = await apiService.createLotteryTicketsWithImage(ticketData, paymentImage)
      
      if (result.success) {
        console.log('Tickets created successfully with payment:', result.data)
        setCreatedTickets(result.data)
        // Clear selected tickets and navigate to confirmation
        setSelectedTickets([])
        navigate('/confirmation', { 
          state: { 
            tickets: result.data,
            paymentImage: imagePreview
          } 
        })
      } else {
        console.error('Failed to create tickets:', result)
        
        // Show detailed validation errors if available
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat()
          setError(errorMessages.join(', '))
        } else {
          setError(result.message || 'Failed to create lottery tickets. Please try again.')
        }
      }
    } catch (error) {
      console.error('Error creating lottery tickets:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsCreatingTickets(false)
    }
  }

  // Handle image selection
  const handleImageSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
      if (!validTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, or GIF)')
        return
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB')
        return
      }

      setPaymentImage(file)
      setError(null)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }


  // If no tickets selected, show loading or redirect message
  if (selectedTickets.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p>Redirecting to ticket selection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="px-2 sm:px-3 md:px-4 pt-2 sm:pt-3 md:pt-4">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="text-sm">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 text-xs underline mt-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Selected Tickets Summary */}
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6 shadow-lg">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4">{t.selectedTickets}</h3>
          
          {/* Selected Ticket Numbers */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
            {selectedTickets.slice(0, 8).map((ticket, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-400 to-red-500 rounded-lg p-2 sm:p-3 text-center shadow-sm">
                <span className="text-xs sm:text-sm md:text-base font-bold text-white">{ticket}</span>
              </div>
            ))}
            {selectedTickets.length > 8 && (
              <div className="bg-gray-300 rounded-lg p-2 sm:p-3 text-center shadow-sm flex items-center justify-center">
                <span className="text-xs sm:text-sm md:text-base font-bold text-gray-600">
                  +{selectedTickets.length - 8} more
                </span>
              </div>
            )}
          </div>
          
          {/* Total Summary */}
          <div className="bg-gray-900 rounded-lg p-3 sm:p-4">
            <div className="text-center space-y-1 sm:space-y-2">
              <p className="text-yellow-400 text-sm sm:text-base font-medium">
                စုစုပေါင်း: {selectedTickets.length} မဲ
              </p>
              <p className="text-yellow-400 text-sm sm:text-base font-bold">
                ငွေပမာဏ: {totalAmount.toLocaleString()} ကျပ်
              </p>
            </div>
          </div>
        </div>

        {/* KPay QR Code Section */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 shadow-lg">
          <div className="text-center">
            {/* QR Code Container */}
            <div className="qr-code-container rounded-xl p-6 sm:p-8 md:p-10 inline-block mb-4 sm:mb-6">
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto">
                <img 
                  src={kpayQR} 
                  alt="KPay QR Code" 
                  className="qr-code-image w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* QR Code Instructions */}
            <div className="space-y-2 sm:space-y-3">
              <p className="text-gray-700 text-base sm:text-lg font-semibold">
                KPay QR Code
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                {language === 'mm' ? 'KBZPay ဖြင့် စကင်န်ပြီး ပေးချေပါ' : 'Use KBZPay Scan to pay this'}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
                <p className="text-blue-700 text-xs sm:text-sm font-mono">
                  https://kpay.com/xxxxxx
                </p>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-blue-600 text-xs sm:text-sm font-medium">KBZPay</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Amount and Image Upload */}
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg">
          {/* Amount to Transfer */}
          <div className="bg-gray-900 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="text-center space-y-1 sm:space-y-2">
              <p className="text-yellow-400 text-sm sm:text-base font-medium">
                လွှဲရမည့်ငွေပမာဏ:
              </p>
              <p className="text-yellow-400 text-lg sm:text-xl md:text-2xl font-bold">
                {totalAmount.toLocaleString()} ကျပ်
              </p>
            </div>
          </div>

          {/* Payment Screenshot Upload */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-lg font-bold text-gray-800 mb-3">
              {language === 'mm' ? 'ပေးချေမှု စကရင်ရော့ ပုံ' : 'Payment Screenshot'}
            </h4>
            
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="payment-image-upload"
                />
                <label
                  htmlFor="payment-image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600 text-sm">
                    {language === 'mm' 
                      ? 'ပေးချေမှု စကရင်ရော့ ပုံကို ရွေးချယ်ပါ' 
                      : 'Click to select payment screenshot'
                    }
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {language === 'mm' 
                      ? 'JPEG, PNG, GIF (5MB အထိ)' 
                      : 'JPEG, PNG, GIF (up to 5MB)'
                    }
                  </p>
                </label>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Payment Screenshot Preview"
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                  />
                  <button
                    onClick={() => {
                      setPaymentImage(null)
                      setImagePreview(null)
                      document.getElementById('payment-image-upload').value = ''
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
                <p className="text-green-600 text-sm text-center">
                  {language === 'mm' 
                    ? 'ပုံရွေးချယ်ပြီးပါပြီ' 
                    : 'Image selected successfully'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Create Tickets with Payment Button */}
          <button 
            onClick={createLotteryTicketsWithPayment}
            disabled={!paymentImage || isCreatingTickets}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 touch-manipulation text-sm sm:text-base md:text-lg"
          >
            {isCreatingTickets ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {language === 'mm' ? 'လက်မှတ်ဖန်တီးနေသည်...' : 'Creating tickets...'}
              </span>
            ) : (
              language === 'mm' ? 'လက်မှတ်များ ဖန်တီးပြီး ပေးချေပါ' : 'Create Tickets & Pay'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Payment
