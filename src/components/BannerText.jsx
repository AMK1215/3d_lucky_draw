import { useApp } from '../context/AppContext'
import { useEffect, useState } from 'react'

const BannerText = () => {
  const { bannerTexts, isLoading, language } = useApp()
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  // Fallback text if no banner texts are available
  const fallbackTexts = [
    language === 'mm' 
      ? "သင့်ရဲ့ ကံကောင်းမှုကို စမ်းကြည့်ပါ! နံပါတ်တွေကို ရွေးချယ်ပြီး ကံထူးမှုကို စောင့်ဆိုင်းပါ"
      : "Try your luck! Choose numbers and wait for the lucky draw"
  ]

  // Use API banner texts if available, otherwise use fallback
  const displayTexts = bannerTexts.length > 0 ? bannerTexts : fallbackTexts

  // Auto-rotate banner texts
  useEffect(() => {
    if (displayTexts.length > 1) {
      const interval = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % displayTexts.length)
      }, 8000) // Change text every 8 seconds
      return () => clearInterval(interval)
    }
  }, [displayTexts.length])

  // Get current text
  const getCurrentText = () => {
    if (bannerTexts.length > 0) {
      return bannerTexts[currentTextIndex]?.text || bannerTexts[0]?.text || ''
    }
    return fallbackTexts[currentTextIndex] || fallbackTexts[0]
  }

  // Show loading state
  if (isLoading && bannerTexts.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 text-center">
        <div className="animate-pulse">
          <div className="h-3 sm:h-4 bg-white/20 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-3 sm:h-4 bg-white/20 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    )
  }

  // Show empty state if no texts
  if (displayTexts.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 text-center">
        <p className="text-white text-xs sm:text-sm md:text-base">
          {language === 'mm' ? 'ဘန်နာစာသားများ မရှိသေးပါ' : 'No banner texts available'}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 text-center relative overflow-hidden">
      {/* Marquee container */}
      <div className="w-full overflow-hidden relative">
        <div className="flex animate-marquee hover:pause-animation whitespace-nowrap">
          <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-medium px-2 sm:px-4">
            {getCurrentText()}
          </span>
        </div>
      </div>

      {/* Text indicators (only show if multiple texts) */}
      {displayTexts.length > 1 && (
        <div className="flex justify-center space-x-1 sm:space-x-2 mt-2 sm:mt-3 md:mt-4">
          {displayTexts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTextIndex(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                index === currentTextIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BannerText
