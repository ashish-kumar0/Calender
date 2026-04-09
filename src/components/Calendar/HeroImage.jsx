// ============================================
// HeroImage.jsx
// Month ke hisaab se image dikhata hai
// Smooth crossfade transition on month change
// ============================================

import { useState, useEffect } from 'react'
import { HERO_IMAGES } from '../../constants/heroImages'
import { MONTH_NAMES } from '../../utils/calendarHelpers'

export default function HeroImage({ month, year }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSrc, setCurrentSrc] = useState('')

  const imageData = HERO_IMAGES[month]

  // Month change hone pe image update karo with fade
  useEffect(() => {
    setIsLoaded(false) // pehle fade out
    const timer = setTimeout(() => {
      setCurrentSrc(imageData.url)
    }, 150)
    return () => clearTimeout(timer)
  }, [month, imageData.url])

  return (
    <div
      className="hero-image-container"
      style={{ '--theme-color': imageData.theme }}
    >
      {/* Background image */}
      <img
        src={currentSrc}
        alt={imageData.label}
        className={`hero-img ${isLoaded ? 'loaded' : ''}`}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Dark gradient overlay - month name ke liye readability */}
      <div className="hero-overlay" />

      {/* Month name watermark - wall calendar style */}
      <div className="hero-month-label">
        <span className="hero-year">{year}</span>
        <span className="hero-month">{MONTH_NAMES[month].toUpperCase()}</span>
      </div>

      {/* Bottom diagonal cut - calendar ke reference image jaisa */}
      <div
        className="hero-diagonal"
        style={{ background: imageData.theme }}
      />
    </div>
  )
}
