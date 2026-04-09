// ============================================
// calendarHelpers.js
// Calendar ka sara data logic yahan hai
// Grid generate karna, date compare karna sab
// ============================================

// Month ke saare din generate karta hai
// Leading aur trailing empty cells bhi include hote hain
export function generateMonthDays(year, month) {
  // month = 0-indexed (0 = January, 11 = December)
  const days = []

  // Pehle din ko pata karo (0=Sun, 1=Mon ... 6=Sat)
  const firstDayOfMonth = new Date(year, month, 1).getDay()

  // Total days in this month
  const totalDays = new Date(year, month + 1, 0).getDate()

  // Leading empty cells - month start se pehle ke blank boxes
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ day: null, date: null, isEmpty: true })
  }

  // Actual days of the month
  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month, d)
    days.push({
      day: d,
      date: date,
      isEmpty: false,
      isToday: isSameDay(date, new Date()),
    })
  }

  // Trailing empty cells - grid ko 7 columns mein complete karne ke liye
  const remaining = (7 - (days.length % 7)) % 7
  for (let i = 0; i < remaining; i++) {
    days.push({ day: null, date: null, isEmpty: true })
  }

  return days
}

// Check karo kya do dates same din hain
export function isSameDay(date1, date2) {
  if (!date1 || !date2) return false
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

// Check karo kya ek date range ke andar hai
export function isInRange(date, startDate, endDate) {
  if (!date || !startDate || !endDate) return false
  const d = date.getTime()
  const s = startDate.getTime()
  const e = endDate.getTime()
  // start aur end ke beech mein hai?
  return d > Math.min(s, e) && d < Math.max(s, e)
}

// Check karo kya date hover preview range mein hai
export function isInHoverRange(date, startDate, hoverDate) {
  if (!date || !startDate || !hoverDate) return false
  const d = date.getTime()
  const s = startDate.getTime()
  const h = hoverDate.getTime()
  return d > Math.min(s, h) && d < Math.max(s, h)
}

// Month ka naam return karta hai
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
]

// Week ke din ke naam (short)
export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Date ko readable string mein convert karo
export function formatDate(date) {
  if (!date) return ''
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`
}
