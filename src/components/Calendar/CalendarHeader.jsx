// ============================================
// CalendarHeader.jsx
// Month/Year dikhata hai + prev/next navigation
// Spiral binding CSS decoration bhi yahan hai
// ============================================

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MONTH_NAMES } from '../../utils/calendarHelpers'

export default function CalendarHeader({ year, month, onPrev, onNext }) {
  return (
    <div className="calendar-header">

      {/* --- Spiral Binding Decoration (pure CSS) --- */}
      <div className="spiral-binding">
        {/* 12 spiral dots banao */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="spiral-dot" />
        ))}
      </div>

      {/* --- Month + Year + Navigation --- */}
      <div className="header-content">
        {/* Previous month button */}
        <button
          className="nav-btn"
          onClick={onPrev}
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Month aur Year display */}
        <div className="month-display">
          <span className="month-name">{MONTH_NAMES[month]}</span>
          <span className="year-name">{year}</span>
        </div>

        {/* Next month button */}
        <button
          className="nav-btn"
          onClick={onNext}
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

    </div>
  )
}
