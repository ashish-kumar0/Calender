import { useState, useMemo } from 'react';
import { Search, Calendar as CalendarIcon, StickyNote } from 'lucide-react';
import { useNotesData } from '../../context/NotesContext';

export default function NotesSearch({ onSelectNote }) {
  const { notes } = useNotesData();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Convert notes object to an array and filter
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    
    return Object.entries(notes)
      .map(([key, note]) => ({ key, ...note }))
      .filter(note => {
        const textMatch = note.text && note.text.toLowerCase().includes(lowerQuery);
        const tagMatch = note.tag && note.tag.toLowerCase().includes(lowerQuery);
        return textMatch || tagMatch;
      })
      .sort((a, b) => new Date(b.lastEdited || 0) - new Date(a.lastEdited || 0))
      .slice(0, 5); // top 5 results
  }, [notes, query]);

  const handleSelect = (note) => {
    setQuery('');
    setIsOpen(false);
    onSelectNote(note.key);
  };

  const formatKeyName = (key) => {
    if (key.startsWith('month_')) {
      const parts = key.split('_');
      return `Month: ${parts[2]}/${parts[1]}`;
    }
    if (key.startsWith('range_')) {
      const parts = key.split('_');
      return `Range: ${parts[1]} to ${parts[2]}`;
    }
    return `Date: ${key}`;
  };

  return (
    <div className="notes-search-container">
      <div className="search-input-wrapper">
        <Search size={14} className="search-icon" />
        <input
          type="text"
          className="notes-search-input"
          placeholder="Search all notes..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
      </div>

      {isOpen && query.trim() !== '' && (
        <div className="search-results-dropdown">
          {results.length > 0 ? (
            results.map(note => (
              <div 
                key={note.key} 
                className="search-result-item" 
                onClick={() => handleSelect(note)}
              >
                <div className="result-header">
                  {note.key.startsWith('month') ? <CalendarIcon size={12}/> : <StickyNote size={12}/>}
                  <span className="result-title">{formatKeyName(note.key)}</span>
                  {note.tag && <span className="result-badge">{note.tag}</span>}
                </div>
                <div className="result-preview" dangerouslySetInnerHTML={{
                  __html: note.text ? 
                    note.text.replace(new RegExp(query, 'gi'), match => `<mark>${match}</mark>`).substring(0, 50) + '...'
                    : 'No text'
                }} />
              </div>
            ))
          ) : (
            <div className="search-no-results">No notes found for "{query}"</div>
          )}
        </div>
      )}
    </div>
  );
}
