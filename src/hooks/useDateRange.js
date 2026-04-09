// ============================================
// useDateRange.js
// Date range selection ka poora logic yahan hai
// Start date, end date, hover preview sab
// ============================================

import { useState } from 'react'
import { isSameDay } from '../utils/calendarHelpers'

export function useDateRange() {
  // Selection ke teen states hain
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [hoverDate, setHoverDate] = useState(null)

  // Jab user kisi date pe click kare
  const handleDateClick = (date) => {
    if (!date) return

    // Case 1: Koi bhi date select nahi hai abhi
    if (!startDate) {
      setStartDate(date)
      setEndDate(null)
      return
    }

    // Case 2: Start date same hai jo click hua - reset karo
    if (isSameDay(date, startDate) && !endDate) {
      setStartDate(null)
      setEndDate(null)
      return
    }

    // Case 3: End date already set hai - fresh start karo
    if (endDate) {
      setStartDate(date)
      setEndDate(null)
      setHoverDate(null)
      return
    }

    // Case 4: End date set karo
    // Agar selected date start se pehle hai to swap karo
    if (date < startDate) {
      setEndDate(startDate)
      setStartDate(date)
    } else {
      setEndDate(date)
    }
    setHoverDate(null)
  }

  // Jab user hover kare - preview dikhao
  const handleDateHover = (date) => {
    if (startDate && !endDate) {
      setHoverDate(date)
    }
  }

  // Poori selection clear karo
  const clearSelection = () => {
    setStartDate(null)
    setEndDate(null)
    setHoverDate(null)
  }

  return {
    startDate,
    endDate,
    hoverDate,
    handleDateClick,
    handleDateHover,
    clearSelection,
  }
}
