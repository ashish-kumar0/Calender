import CalendarWrapper from './components/Layout/CalendarWrapper'
import { NotesProvider } from './context/NotesContext'
import './index.css'

export default function App() {
  return (
    <NotesProvider>
      <CalendarWrapper />
    </NotesProvider>
  )
}
