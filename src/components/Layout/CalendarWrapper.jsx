// ============================================
// CalendarWrapper.jsx
// Main layout shell
// Desktop: side-by-side
// Mobile: stacked vertically
// Month flip animation bhi yahan hai
// ============================================

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import HeroImage from '../Calendar/HeroImage'
import CalendarHeader from '../Calendar/CalendarHeader'
import CalendarGrid from '../Calendar/CalendarGrid'
import NotesPanel from '../Notes/NotesPanel'
import { useDateRange } from '../../hooks/useDateRange'
import { HERO_IMAGES } from '../../constants/heroImages'

export default function CalendarWrapper() {
  // Aaj ki date se start karo
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  // Flip animation state
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDir, setFlipDir] = useState('next') // 'next' ya 'prev'

  // Date range hook se sab milta hai
  const {
    startDate,
    endDate,
    hoverDate,
    handleDateClick,
    handleDateHover,
    clearSelection
  } = useDateRange()

  // Theme support
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check saved theme in localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('calendar-theme')
      return savedTheme === 'dark'
    }
    return false
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('calendar-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('calendar-theme', 'light')
    }
  }, [isDarkMode])

  // Current month ka theme object
  const currentTheme = HERO_IMAGES[month].theme

  // Previous month navigate karo
  const goToPrev = () => {
    setFlipDir('prev')
    triggerFlip(() => {
      if (month === 0) {
        setMonth(11)
        setYear(y => y - 1)
      } else {
        setMonth(m => m - 1)
      }
    })
  }

  // Next month navigate karo
  const goToNext = () => {
    setFlipDir('next')
    triggerFlip(() => {
      if (month === 11) {
        setMonth(0)
        setYear(y => y + 1)
      } else {
        setMonth(m => m + 1)
      }
    })
  }

  // Flip animation trigger karo
  const triggerFlip = (callback) => {
    setIsFlipping(true)
    setTimeout(() => {
      callback()
      setIsFlipping(false)
    }, 300) // 300ms animation
  }

  return (
    <div
      className="app-wrapper"
      style={{ 
        '--theme-color': currentTheme.primary,
        '--bg-start': currentTheme.bgStart,
        '--bg-end': currentTheme.bgEnd
      }}
    >
      {/* Background texture */}
      <div className="bg-texture" />

      {/* Theme Toggle Button */}
      <button 
        className="theme-toggle-btn"
        onClick={() => setIsDarkMode(prev => !prev)}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Main calendar card - wall calendar look */}
      <div className={`calendar-card ${isFlipping ? `flip-${flipDir}` : ''}`}>

        {/* === LEFT PANEL: Hero Image === */}
        <div className="left-panel">
          <HeroImage month={month} year={year} />
        </div>

        {/* === RIGHT PANEL: Calendar + Notes === */}
        <div className="right-panel">

          {/* Month navigation header */}
          <CalendarHeader
            year={year}
            month={month}
            onPrev={goToPrev}
            onNext={goToNext}
          />

          {/* Date grid */}
          <CalendarGrid
            year={year}
            month={month}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onDateClick={handleDateClick}
            onDateHover={handleDateHover}
            themeColor={currentTheme.primary}
          />

          {/* Notes section */}
          <NotesPanel
            year={year}
            month={month}
            startDate={startDate}
            endDate={endDate}
            onClearSelection={clearSelection}
            themeColor={currentTheme.primary}
          />

        </div>
      </div>

      {/* Footer - subtle branding */}
      <div className="footer-text">
        Wall Calendar • {year}
      </div>
    </div>
  )
}
