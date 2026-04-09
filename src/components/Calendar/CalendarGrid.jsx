// ============================================
// CalendarGrid.jsx
// Saari date cells render karta hai
// Range selection visual states handle karta hai
// Holiday markers bhi yahan hain
// ============================================

import {
  generateMonthDays,
  DAY_NAMES,
  isSameDay,
  isInRange,
  isInHoverRange
} from '../../utils/calendarHelpers'
import { HOLIDAYS } from '../../constants/heroImages'
import { useNotesData } from '../../context/NotesContext';

const TAG_DOTS = {
  urgent: '🔴',
  reminder: '🟡',
  done: '🟢',
  info: '🔵'
}

export default function CalendarGrid({
  year,
  month,
  startDate,
  endDate,
  hoverDate,
  onDateClick,
  onDateHover,
  themeColor
}) {
  // Is month ke saare din generate karo
  const days = generateMonthDays(year, month)
  const holidays = HOLIDAYS[month] || {}
  
  const { notes, getDateKey } = useNotesData()

  // Har cell ke liye CSS class determine karo
  const getCellClass = (dayObj) => {
    if (dayObj.isEmpty) return 'day-cell empty'

    const { date } = dayObj
    let classes = ['day-cell']

    // Aaj ka din
    if (dayObj.isToday) classes.push('today')

    // Start date
    if (startDate && isSameDay(date, startDate)) classes.push('range-start')

    // End date
    if (endDate && isSameDay(date, endDate)) classes.push('range-end')

    // Range ke andar (start aur end ke beech)
    if (startDate && endDate && isInRange(date, startDate, endDate)) {
      classes.push('in-range')
    }

    // Hover preview - end date select karne se pehle
    if (startDate && !endDate && hoverDate && isInHoverRange(date, startDate, hoverDate)) {
      classes.push('in-hover-range')
    }

    // Hover cursor target
    if (startDate && !endDate && hoverDate && isSameDay(date, hoverDate)) {
      classes.push('hover-end')
    }

    // Weekend highlight (Sunday=0, Saturday=6)
    const dayOfWeek = date.getDay()
    if (dayOfWeek === 0) classes.push('sunday')
    if (dayOfWeek === 6) classes.push('saturday')

    // Holiday
    if (holidays[dayObj.day]) classes.push('holiday')

    // Check if it has notes
    const dateKey = getDateKey(date)
    if (notes[dateKey]) {
      classes.push('has-note')
    }

    return classes.join(' ')
  }
  
  const getNoteTooltip = (dayObj) => {
    if (dayObj.isEmpty) return ''
    let tooltip = holidays[dayObj.day] ? holidays[dayObj.day] + '\n' : ''
    const dateKey = getDateKey(dayObj.date)
    const note = notes[dateKey]
    if (note) {
      if (note.text) tooltip += `Note: ${note.text}\n`
      if (note.tag) tooltip += `Tag: ${note.tag}\n`
      if (note.mood) tooltip += `Mood: ${note.mood}\n`
    }
    return tooltip.trim()
  }

  return (
    <div className="calendar-grid-container">

      {/* --- Day Name Headers (Sun Mon Tue ...) --- */}
      <div className="day-names-row">
        {DAY_NAMES.map((name) => (
          <div key={name} className="day-name">{name}</div>
        ))}
      </div>

      {/* --- Date Cells Grid --- */}
      <div className="days-grid">
        {days.map((dayObj, index) => {
          const dateKey = !dayObj.isEmpty ? getDateKey(dayObj.date) : null;
          const note = dateKey ? notes[dateKey] : null;

          return (
            <div
              key={index}
              className={getCellClass(dayObj)}
              onClick={() => !dayObj.isEmpty && onDateClick(dayObj.date)}
              onMouseEnter={() => !dayObj.isEmpty && onDateHover(dayObj.date)}
              onMouseLeave={() => onDateHover(null)}
              title={getNoteTooltip(dayObj)}
            >
              {/* Din ka number */}
              {!dayObj.isEmpty && (
                <>
                  <span className="day-number">{dayObj.day}</span>
                  
                  {/* Indicators Container */}
                  <div className="cell-indicators">
                    {/* Holiday marker dot */}
                    {holidays[dayObj.day] && (
                      <span className="holiday-dot">🔴</span>
                    )}
                    
                    {/* Note Tag Dot */}
                    {note?.tag && (
                      <span className="note-tag-dot">{TAG_DOTS[note.tag]}</span>
                    )}

                    {/* Note Mood Emoji */}
                    {note?.mood && (
                      <span className="note-mood-emoji">{note.mood}</span>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}
