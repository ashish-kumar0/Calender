# 📅 Wall Calendar — Interactive React Component

A polished, interactive wall calendar component built with React + Vite, inspired by physical wall calendars. Features date range selection, integrated notes, holiday markers, and a fully responsive design.

---

## ✨ Features

- **Wall Calendar Aesthetic** — Hero image per month with spiral binding decoration
- **Date Range Selector** — Click start date, hover to preview, click end date
- **Integrated Notes** — Month-level notes + date-range-specific notes (auto-saved to localStorage)
- **Holiday Markers** — Indian + International holidays highlighted
- **Month Flip Animation** — Subtle page-turn effect on navigation
- **Responsive Design** — Side-by-side on desktop, stacked on mobile
- **Dynamic Theming** — Accent color shifts per month

---

## 🚀 Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/wall-calendar.git
cd wall-calendar

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| Lucide React | Icons |
| CSS Variables | Dynamic theming |
| localStorage | Notes persistence |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarGrid.jsx      # Date cells + range selection
│   │   ├── CalendarHeader.jsx    # Month nav + spiral binding
│   │   └── HeroImage.jsx         # Monthly hero image
│   ├── Notes/
│   │   └── NotesPanel.jsx        # Notes area (month + range)
│   └── Layout/
│       └── CalendarWrapper.jsx   # Responsive layout shell
├── hooks/
│   ├── useDateRange.js           # Range selection logic
│   └── useNotes.js               # localStorage notes
├── utils/
│   └── calendarHelpers.js        # Grid generation, date utils
└── constants/
    └── heroImages.js             # Per-month images + holidays
```

---

## 🎯 Design Decisions

- **No backend needed** — All notes stored in localStorage (client-side only)
- **Unsplash images** — Free, high-quality, no API key required
- **CSS-only animations** — No animation library needed, keeps bundle small
- **Custom hooks** — useDateRange and useNotes are fully reusable

---

## 📱 Responsive Behavior

| Screen | Layout |
|--------|--------|
| Desktop (>700px) | Hero image left, calendar + notes right |
| Mobile (700px) | Hero top → calendar → notes (stacked) |

---

## 🌐 Live Demo

[View on Vercel](https://wall-calendar-ashish.vercel.app)

---

## 📸 Video Demo

[Watch on Loom](https://loom.com/YOUR_LINK)

---

Made with love by Ashish Kumar
