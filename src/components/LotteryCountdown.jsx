import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

const LotteryCountdown = ({ showTitle = true, compact = false }) => {
  const { language } = useApp()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [nextDrawDate, setNextDrawDate] = useState(null)
  const [drawType, setDrawType] = useState('')

  // Calculate next lottery draw date
  const getNextDrawDate = () => {
    const now = new Date()
    const currentDate = now.getDate()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    
    // Lottery draws on: 1st, 15th, and end of month
    const drawDates = [1, 15]
    
    // Add end of month date
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    drawDates.push(endOfMonth)
    
    // Find next draw date
    let nextDraw = null
    let type = ''
    
    for (const drawDate of drawDates) {
      const drawDateTime = new Date(currentYear, currentMonth, drawDate, 18, 0, 0) // 6 PM draw time
      
      if (drawDateTime > now) {
        nextDraw = drawDateTime
        if (drawDate === 1) type = language === 'mm' ? 'လဆန်း' : 'Early Month'
        else if (drawDate === 15) type = language === 'mm' ? 'လဆုတ်' : 'Mid Month'
        else type = language === 'mm' ? 'လကုန်' : 'End Month'
        break
      }
    }
    
    // If no draw this month, get first draw of next month
    if (!nextDraw) {
      const nextMonth = currentMonth + 1
      const nextYear = nextMonth > 11 ? currentYear + 1 : currentYear
      const actualNextMonth = nextMonth > 11 ? 0 : nextMonth
      nextDraw = new Date(nextYear, actualNextMonth, 1, 18, 0, 0)
      type = language === 'mm' ? 'လဆန်း' : 'Early Month'
    }
    
    return { date: nextDraw, type }
  }

  useEffect(() => {
    const { date, type } = getNextDrawDate()
    setNextDrawDate(date)
    setDrawType(type)

    const updateCountdown = () => {
      const now = new Date()
      const difference = date.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [language])

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-red-400/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⏰</span>
            <div>
              <p className="text-white/80 text-xs sm:text-sm">
                {language === 'mm' ? 'နောက်ထပ် မဲပွဲ' : 'Next Draw'}
              </p>
              <p className="text-white font-semibold text-sm sm:text-base">{drawType}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <div className="bg-white/20 rounded-lg px-2 py-1">
                <span className="text-white font-bold text-sm sm:text-base">{timeLeft.days}</span>
                <span className="text-white/70 text-xs ml-1">{language === 'mm' ? 'ရက်' : 'D'}</span>
              </div>
              <div className="bg-white/20 rounded-lg px-2 py-1">
                <span className="text-white font-bold text-sm sm:text-base">{timeLeft.hours}</span>
                <span className="text-white/70 text-xs ml-1">{language === 'mm' ? 'နာရီ' : 'H'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-red-400/30">
      {showTitle && (
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {language === 'mm' ? 'နောက်ထပ် မဲပွဲ ရေတွက်ချိန်' : 'Next Lottery Draw Countdown'}
          </h3>
          <p className="text-white/80 text-sm sm:text-base">
            {language === 'mm' ? `${drawType} မဲပွဲ` : `${drawType} Draw`} - {nextDrawDate?.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="text-center">
          <div className="bg-white/20 rounded-xl p-3 sm:p-4 border border-white/30">
            <div className="text-2xl sm:text-3xl font-bold text-red-400 mb-1">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-white/80 text-xs sm:text-sm">
              {language === 'mm' ? 'ရက်' : 'Days'}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-white/20 rounded-xl p-3 sm:p-4 border border-white/30">
            <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-1">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-white/80 text-xs sm:text-sm">
              {language === 'mm' ? 'နာရီ' : 'Hours'}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-white/20 rounded-xl p-3 sm:p-4 border border-white/30">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-white/80 text-xs sm:text-sm">
              {language === 'mm' ? 'မိနစ်' : 'Minutes'}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-white/20 rounded-xl p-3 sm:p-4 border border-white/30">
            <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-white/80 text-xs sm:text-sm">
              {language === 'mm' ? 'စက္ကန့်' : 'Seconds'}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-white/70 text-xs sm:text-sm">
          {language === 'mm' 
            ? 'မဲပွဲများ: လဆန်း (၁ရက်), လဆုတ် (၁၅ရက်), လကုန် (၂၉/၃၀/၃၁ရက်)' 
            : 'Draws: 1st, 15th, and end of each month at 6:00 PM'
          }
        </p>
      </div>
    </div>
  )
}

export default LotteryCountdown
