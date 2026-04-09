// ============================================
// heroImages.js
// Har month ke liye ek hero image
// Unsplash se free high-quality images
// ============================================

export const HERO_IMAGES = {
  0: { // January - Peak Winter
    url: 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=2000&q=90',
    theme: { primary: '#1a3a5c', bgStart: '#e8f0fe', bgEnd: '#b6d0f7' },
    label: 'Winter Escape'
  },
  1: { // February - Late Winter/Frost
    url: 'https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?w=2000&q=90',
    theme: { primary: '#8b1a4a', bgStart: '#fcecf2', bgEnd: '#f1b8cf' },
    label: 'Morning Frost'
  },
  2: { // March - Early Spring
    url: 'https://plus.unsplash.com/premium_photo-1674917000586-b7564f21540e?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    theme: { primary: '#2d6a4f', bgStart: '#e8fae9', bgEnd: '#a3e9b1' },
    label: 'Spring Awakening'
  },
  3: { // April - Spring Bloom
    url: 'https://images.unsplash.com/photo-1652355562884-68d376a811e9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxhcHJpbHxlbnwwfHwwfHx8MA%3D%3D',
    theme: { primary: '#6b4226', bgStart: '#fdf6e3', bgEnd: '#ebd5b3' },
    label: 'Cherry Blossoms'
  },
  4: { // May - Lush Spring
    url: 'https://images.unsplash.com/photo-1526344966-89049886b28d?w=2000&q=90',
    theme: { primary: '#1b4332', bgStart: '#e9f5ec', bgEnd: '#a0dbb3' },
    label: 'Lush Meadows'
  },
  5: { // June - Early Summer Beach
    url: 'https://images.unsplash.com/photo-1570246159995-57eaeeca884b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGp1bmV8ZW58MHx8MHx8fDA%3D',
    theme: { primary: '#0077b6', bgStart: '#e6f7ff', bgEnd: '#90e0ef' },
    label: 'Summer Sands'
  },
  6: { // July - Sunny Mid-Summer
    url: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=2000&q=90',
    theme: { primary: '#e76f51', bgStart: '#fff0e6', bgEnd: '#f4a261' },
    label: 'Sun Flare'
  },
  7: { // August - Late Summer Heat
    url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=2000&q=90',
    theme: { primary: '#264653', bgStart: '#e0f2f1', bgEnd: '#80cbc4' },
    label: 'Summer Bloom'
  },
  8: { // September - Early Autumn
    url: 'https://images.unsplash.com/photo-1601252641354-66bd14da756a?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    theme: { primary: '#d4a373', bgStart: '#fefae0', bgEnd: '#faedcb' },
    label: 'Golden Path'
  },
  9: { // October - Peak Autumn
    url: 'https://images.unsplash.com/photo-1665053573132-16664ac42cb9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMwfHxvY3RvYmVyJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww',
    theme: { primary: '#bc4749', bgStart: '#ffeded', bgEnd: '#ffb5a7' },
    label: 'Fall Foliage'
  },
  10: { // November - Late Autumn
    url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=2000&q=90',
    theme: { primary: '#5c4033', bgStart: '#f4ece5', bgEnd: '#d8c3a5' },
    label: 'Autumn Mist'
  },
  11: { // December - Early Winter
    url: 'https://images.unsplash.com/photo-1609024849543-ff59df361d08?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk5fHxjaHJpc3RtYXN8ZW58MHx8MHx8fDA%3D',
    theme: { primary: '#03045e', bgStart: '#e0eaff', bgEnd: '#caf0f8' },
    label: 'Winter Village'
  }
}

// Indian + International Holidays (month-indexed, day as key)
export const HOLIDAYS = {
  0: { 1: '🎊 New Year', 26: '🇮🇳 Republic Day' },
  1: { 14: '💝 Valentine\'s Day' },
  2: { 8: '👩 Women\'s Day', 21: '🌸 Holi' },
  3: { 14: '🐣 Baisakhi' },
  4: { 1: '👷 Labour Day' },
  5: { 21: '☀️ Summer Solstice' },
  6: {},
  7: { 15: '🇮🇳 Independence Day' },
  8: {},
  9: { 2: '🕊️ Gandhi Jayanti', 24: '🪔 Diwali' },
  10: { 14: '👶 Children\'s Day' },
  11: { 25: '🎄 Christmas', 31: '🎉 New Year\'s Eve' }
}
