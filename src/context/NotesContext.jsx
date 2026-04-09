// ============================================
// NotesContext.jsx
// Global state for all notes in the application
// Provides tagging, moods, and auto-saving mechanisms
// ============================================

import { createContext, useContext, useState, useEffect } from 'react'

const NotesContext = createContext()

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('wall_calendar_notes')
        return saved ? JSON.parse(saved) : {}
      } catch (e) {
        console.error('Failed to parse notes', e)
        return {}
      }
    }
    return {}
  })

  // Whenever notes change, persist them
  useEffect(() => {
    localStorage.setItem('wall_calendar_notes', JSON.stringify(notes))
  }, [notes])

  // Save or update a note
  const saveNote = (key, noteData) => {
    if (!key) return
    setNotes(prev => {
      // Don't save empty notes without tags/moods if they were previously empty
      if (!noteData.text?.trim() && !noteData.tag && !noteData.mood && !prev[key]) {
        return prev
      }
      
      const newNotes = { ...prev }
      if (!noteData.text?.trim() && !noteData.tag && !noteData.mood) {
         // remove if everything is empty
         delete newNotes[key]
      } else {
         newNotes[key] = {
           ...prev[key],
           ...noteData,
           lastEdited: new Date().toISOString()
         }
      }
      return newNotes
    })
  }

  // Delete a note
  const deleteNote = (key) => {
    setNotes(prev => {
      const copy = { ...prev }
      delete copy[key]
      return copy
    })
  }

  // Helper to generate keys consistently
  const getMonthKey = (year, month) => `month_${year}_${month}`
  
  const getDateKey = (date) => {
    if (!date) return null
    // Avoid timezone offset issues
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const getRangeKey = (start, end) => {
    if (!start || !end) return null
    return `range_${getDateKey(start)}_${getDateKey(end)}`
  }

  return (
    <NotesContext.Provider value={{ 
      notes, 
      saveNote, 
      deleteNote, 
      getMonthKey, 
      getDateKey, 
      getRangeKey 
    }}>
      {children}
    </NotesContext.Provider>
  )
}

export function useNotesData() {
  return useContext(NotesContext)
}
