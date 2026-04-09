# 📅 Wall Calendar — Interactive React Component

A polished, interactive wall calendar component inspired by physical wall calendars. Made with React and Vite, it brings a delightful and productive calendar experience to web apps. Plan, track, and annotate your year easily with a beautiful monthly interface.

---

## ✨ Features

- **Authentic Wall Calendar Look** – Monthly hero images, spiral binding, and subtle shadows for a classic vibe.
- **Date Range Selection** – Intuitive range selection: click to start, hover to expand, click to complete.
- **Integrated Notes** – Add, edit, and auto-save notes for each month or specific date range; all persisted in localStorage.
- **Voice to Text Conversion** – Quickly add notes using your voice for hands-free productivity.
- **Search Bar for Notes** – Instantly search and filter notes, making it easy to find what you need.
- **Delete Notes Easily** – Remove any note by simply clicking the bin/trash icon.
- **Holiday Markers** – Recognizes and highlights major Indian and international holidays for clear scheduling.
- **Animated Month Flips** – Enjoy smooth, CSS-powered animations when switching months.
- **Responsive Layout** – Optimized for desktop (side-by-side view) and mobile (stacked layout).
- **Dynamic Theming** – Accent colors and images change seamlessly every month.
- **No Backend Required** – 100% client-side; your data never leaves your browser.
- **Reusable Hooks** – Includes custom React hooks (`useDateRange`, `useNotes`) for easy integration and code reuse.
- **Quick Start** – Simple Vite setup, ready to clone and run.
- **Accessible and Keyboard-Friendly** – Navigable and usable without mouse input.
- **Customizable** – Swap hero images, add more holidays, or adapt styling as needed.

---

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/ashish-kumar0/Calender.git
cd Calender

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# Visit http://localhost:5173
```

---

## 🛠️ Tech Stack

| Tool         | Purpose              |
|--------------|---------------------|
| React 18     | UI framework        |
| Vite         | Build tool          |
| Lucide React | Icons               |
| CSS Variables| Dynamic theming     |
| localStorage | Notes persistence   |

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
│   │   └── NotesPanel.jsx        # Month & range notes area
│   └── Layout/
│       └── CalendarWrapper.jsx   # Responsive shell
├── hooks/
│   ├── useDateRange.js           # Range selection logic
│   └── useNotes.js               # Notes logic
├── utils/
│   └── calendarHelpers.js        # Date/grid helpers
└── constants/
    └── heroImages.js             # Monthly images, holidays
```

---

## 🎯 Design Decisions

- **Local-First** – All data stored in-browser with `localStorage`
- **Unsplash Images** – High-quality, license-free hero images; no external API key needed.
- **All-CSS Animations** – Minimizes dependencies and improves perf.
- **Fully Reusable Hooks** – Easy to drop into your own project.

---

## 📱 Responsive Design

| Screen             | Layout                                         |
|--------------------|------------------------------------------------|
| Desktop (>700px)   | Hero image left, calendar + notes right       |
| Mobile (≤700px)    | Hero image top, then calendar, then notes     |

---

## 🌐 Live Demo

[View on Vercel]([https://wall-calendar-ashish.vercel.app](https://calender-drab-gamma.vercel.app/)

---

## 📸 Video Demo

[Watch on Loom]([https://loom.com/YOUR_LINK](https://www.loom.com/share/0830d36bbaa74c048934acaadecead23)

---

## 💡 Usage Scenarios

- Personal productivity dashboard
- Event planning tools
- School/academic scheduling
- Habit tracking and journaling
- Family or team wall calendar apps

---

## 🙋‍♂️ Author & Contact

Made with ❤️ by Ashish Kumar  
Questions? Suggestions? Open an issue or reach me at [ashishkumar.dev26@gmail.com](ashishkumar.dev26@gmail.com)
