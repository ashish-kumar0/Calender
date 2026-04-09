import { useState, useEffect, useRef } from 'react';
import { Mic, Download, Trash2, Undo } from 'lucide-react';
import { useNotesData } from '../../context/NotesContext';

const TAGS = [
  { id: 'urgent', label: 'Urgent', color: '🔴' },
  { id: 'reminder', label: 'Reminder', color: '🟡' },
  { id: 'done', label: 'Done', color: '🟢' },
  { id: 'info', label: 'Info', color: '🔵' }
];

const MOODS = ['😔', '😐', '🙂', '😄', '🚀'];

export default function NoteEditor({ noteKey, title, autoFocus }) {
  const { notes, saveNote, deleteNote } = useNotesData();
  const existingNote = notes[noteKey] || { text: '', tag: null, mood: null };

  const [text, setText] = useState(existingNote.text || '');
  const [tag, setTag] = useState(existingNote.tag || null);
  const [mood, setMood] = useState(existingNote.mood || null);
  const [saveStatus, setSaveStatus] = useState(''); // 'Saving...', 'Saved ✓'
  const [isListening, setIsListening] = useState(false);
  const [deletedCache, setDeletedCache] = useState(null); // for Undo

  const textareaRef = useRef(null);

  // Sync internal state if key changes
  useEffect(() => {
    const freshNote = notes[noteKey] || { text: '', tag: null, mood: null };
    setText(freshNote.text || '');
    setTag(freshNote.tag || null);
    setMood(freshNote.mood || null);
    setSaveStatus('');
    setDeletedCache(null);
  }, [noteKey, notes]);

  // Handle Auto-Focus
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
        textareaRef.current.focus();
    }
  }, [noteKey, autoFocus]);

  // Auto-save debounce effect
  useEffect(() => {
    // Only save if it actually differs from what's in context, to avoid infinite loops
    const currentNoteDetails = notes[noteKey] || {};
    const textChanged = text !== (currentNoteDetails.text || '');
    const tagChanged = tag !== (currentNoteDetails.tag || null);
    const moodChanged = mood !== (currentNoteDetails.mood || null);

    if (textChanged || tagChanged || moodChanged) {
      setSaveStatus('Saving...');
      const timer = setTimeout(() => {
        saveNote(noteKey, { text, tag, mood });
        setSaveStatus('Saved ✓');
        setTimeout(() => setSaveStatus(''), 2000);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [text, tag, mood, noteKey, saveNote, notes]);

  // Voice to text
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText((prev) => prev + (prev.length > 0 ? ' ' : '') + transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleClear = () => {
    if (text || tag || mood) {
      setDeletedCache({ text, tag, mood });
      setText('');
      setTag(null);
      setMood(null);
      deleteNote(noteKey);
    }
  };

  const handleUndo = () => {
    if (deletedCache) {
      setText(deletedCache.text);
      setTag(deletedCache.tag);
      setMood(deletedCache.mood);
      saveNote(noteKey, deletedCache);
      setDeletedCache(null);
    }
  };

  return (
    <div className="note-editor sticky-note-style">
      <div className="note-editor-header">
        <h4 className="note-title">{title}</h4>
        <div className="note-actions">
          <button 
            className={`action-icon-btn ${isListening ? 'listening' : ''}`}
            onClick={toggleListening}
            title="Voice to text"
          >
            <Mic size={14} />
            {isListening && <span className="recording-dot" />}
          </button>
          
          {deletedCache ? (
            <button className="action-icon-btn" onClick={handleUndo} title="Undo Clear">
              <Undo size={14} />
            </button>
          ) : (
            <button className="action-icon-btn delete-btn" onClick={handleClear} title="Clear Note">
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <textarea
        ref={textareaRef}
        className="note-textarea-custom"
        placeholder="Type your notes here... (Auto-saves)"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="note-metadata-row">
        {/* Tags */}
        <div className="note-tags">
          {TAGS.map(t => (
            <button
              key={t.id}
              className={`tag-btn ${tag === t.id ? 'active' : ''}`}
              onClick={() => setTag(tag === t.id ? null : t.id)}
              title={t.label}
            >
              {t.color} <span className="tag-label">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Moods */}
        <div className="note-moods">
          {MOODS.map(m => (
            <button
              key={m}
              className={`mood-btn ${mood === m ? 'active' : ''}`}
              onClick={() => setMood(mood === m ? null : m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="note-footer">
        <span className="save-status">{saveStatus}</span>
        {existingNote.lastEdited && !saveStatus && (
          <span className="last-edited">
            Last edited: {new Date(existingNote.lastEdited).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
        )}
      </div>
    </div>
  );
}
