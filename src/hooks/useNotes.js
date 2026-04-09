// ============================================
// useNotes.js
// Notes ko NotesContext se load karta hai
// ============================================

import { useNotesData } from '../context/NotesContext'

export function useNotes(year, month) {
  const { notes, saveNote, deleteNote, getMonthKey, getDateKey, getRangeKey } = useNotesData()

  return {
    notes,
    saveNote,
    deleteNote,
    getMonthKey,
    getDateKey,
    getRangeKey
  }
}
