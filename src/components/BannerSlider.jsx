import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import { useEffect } from 'react'

const BannerSlider = () => {
  const { 
    language, 
    bannerIndex, 
    setBannerIndex, 
    banners, 
    isLoading 
  } = useApp()
  const t = translations[language]


  // Auto-rotate banners
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setBannerIndex((prev) => (prev + 1) % banners.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [banners.length, setBannerIndex])

  // Fallback banners if API data is not available
  const fallbackBanners = [
    {
      title: t.bannerTitle,
      subtitle: t.bannerSubtitle,
      bg: "from-purple-600 to-blue-600",
      isFallback: true
    },
    {
      title: "🎯 Daily Jackpot Winner!",
      subtitle: "Join thousands of winners",
      bg: "from-green-600 to-teal-600",
      isFallback: true
    },
    {
      title: "💰 Special Bonus Round",
      subtitle: "Extra chances to win big",
      bg: "from-orange-600 to-red-600",
      isFallback: true
    }
  ]

  // Use API banners if available, otherwise use fallback
  const displayBanners = banners.length > 0 ? banners : fallbackBanners

  // Show loading state
  if (isLoading) {
    return (
      <div className="relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8 text-center">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white mx-auto mb-3 sm:mb-4"></div>
          <p className="text-white text-xs sm:text-sm md:text-base">
            {language === 'mm' ? 'ဘန်နာများ ရယူနေပါသည်...' : 'Loading banners...'}
          </p>
        </div>
      </div>
    )
  }

  // Show empty state if no banners
  if (displayBanners.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl bg-gradient-to-r from-gray-600 to-gray-700">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8 text-center">
          <p className="text-white text-xs sm:text-sm md:text-base">
            {language === 'mm' ? 'ဘန်နာများ မရှိသေးပါ' : 'No banners available'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl">
      
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${bannerIndex * 100}%)` }}
      >
        {displayBanners.map((banner, index) => (
          <div key={banner.id || index} className="w-full flex-shrink-0">
            {banner.isFallback ? (
              // Fallback banner with gradient background
              <div className={`bg-gradient-to-r ${banner.bg} p-3 sm:p-4 md:p-6 lg:p-8 text-center`}>
                <div className="text-white">
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 sm:mb-3 lg:mb-4 leading-tight">
                    {banner.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                    {banner.subtitle}
                  </p>
                  <div className="flex justify-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">
                    <div className="bg-white bg-opacity-20 rounded-full px-1.5 py-1 sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2">
                      <span className="text-xs sm:text-sm font-semibold">{t.dailyDraw}</span>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-full px-1.5 py-1 sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2">
                      <span className="text-xs sm:text-sm font-semibold">{t.alwaysOpen}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // API banner with image
              <div className="w-full h-28 sm:h-32 md:h-40 lg:h-48 xl:h-56 flex items-center justify-center">
                <img
                  src={banner.img_url}
                  alt={`Banner ${banner.id}`}
                  className="w-full h-full object-cover"
                  style={{ 
                    display: 'block',
                    visibility: 'visible',
                    opacity: 1,
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                  onLoad={(e) => {
                    e.target.style.display = 'block'
                    e.target.style.visibility = 'visible'
                    e.target.style.opacity = '1'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    // Show fallback content
                    e.target.parentElement.innerHTML = `
                      <div class="text-white text-center">
                        <h2 class="text-base sm:text-lg font-bold">${t.bannerTitle}</h2>
                        <p class="text-xs sm:text-sm">${t.bannerSubtitle}</p>
                      </div>
                    `
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Banner indicators */}
      {displayBanners.length > 1 && (
        <div className="absolute bottom-1.5 sm:bottom-2 md:bottom-3 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-1.5 md:space-x-2">
          {displayBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setBannerIndex(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full transition-colors touch-manipulation ${
                index === bannerIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BannerSlider
