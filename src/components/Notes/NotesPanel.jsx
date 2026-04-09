import { useEffect, useState } from 'react';
import { Calendar, X, Download } from 'lucide-react';
import { formatDate, MONTH_NAMES } from '../../utils/calendarHelpers';
import { useNotesData } from '../../context/NotesContext';
import NoteEditor from './NoteEditor';
import NotesSearch from './NotesSearch';

export default function NotesPanel({
  year,
  month,
  startDate,
  endDate,
  onClearSelection,
  themeColor
}) {
  const { notes, getMonthKey, getDateKey, getRangeKey } = useNotesData();
  const [searchedNoteKey, setSearchedNoteKey] = useState(null);

  const monthKey = getMonthKey(year, month);
  const singleDateKey = getDateKey(startDate);
  const rangeKey = getRangeKey(startDate, endDate);
  
  // Decide what key to show based on selection or search
  let activeKey = null;
  let activeTitle = '';
  
  if (searchedNoteKey) {
    activeKey = searchedNoteKey;
    activeTitle = 'Search Result Note';
  } else if (startDate && endDate) {
    activeKey = rangeKey;
    activeTitle = `Notes for ${formatDate(startDate)} – ${formatDate(endDate)}`;
  } else if (startDate && !endDate) {
    activeKey = singleDateKey;
    activeTitle = `Notes for ${formatDate(startDate)}`;
  } else {
    activeKey = monthKey;
    activeTitle = `Monthly Notes – ${MONTH_NAMES[month]} ${year}`;
  }

  // Clear search result when user selects a new date
  useEffect(() => {
    setSearchedNoteKey(null);
  }, [startDate, endDate, year, month]);

  // Export current month's notes
  const exportCurrentMonthNotes = () => {
    // Collect monthly note, plus all date/range notes falling in this month/year
    const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    let exportText = `--- Notes for ${MONTH_NAMES[month]} ${year} ---\n\n`;

    const relevantNotes = Object.entries(notes).filter(([key, note]) => {
      return (
        key === getMonthKey(year, month) ||
        key.startsWith(`date_${monthPrefix}`) ||
        key.startsWith(`range_${monthPrefix}`) ||
        key.startsWith(monthPrefix) // getDateKey returns YYYY-MM-DD directly
      );
    });

    if (relevantNotes.length === 0) {
      alert("No notes found for this month!");
      return;
    }

    relevantNotes.forEach(([key, note]) => {
      exportText += `Context: ${key}\n`;
      if (note.tag) exportText += `Tag: ${note.tag.toUpperCase()}\n`;
      if (note.mood) exportText += `Mood: ${note.mood}\n`;
      exportText += `Last Edited: ${new Date(note.lastEdited).toLocaleString()}\n`;
      exportText += `Note:\n${note.text || '(No text)'}\n\n`;
      exportText += `----------------------------------------\n\n`;
    });

    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calendar-notes-${MONTH_NAMES[month]}-${year}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="notes-panel" style={{ '--theme-color': themeColor }}>
      
      {/* Top Bar: Search & Actions */}
      <div className="notes-top-bar">
        <NotesSearch onSelectNote={key => setSearchedNoteKey(key)} />
        <button className="export-btn" onClick={exportCurrentMonthNotes} title="Download current month notes">
          <Download size={14} /> <span>Export</span>
        </button>
      </div>

      {startDate && !searchedNoteKey && (
        <div className="notes-selection-header">
           <div className="range-info">
              {endDate ? (
                <div className="range-dates">
                  <span className="range-from">{formatDate(startDate)}</span>
                  <span className="range-arrow">→</span>
                  <span className="range-to">{formatDate(endDate)}</span>
                </div>
              ) : (
                <div className="range-dates">
                  <span className="range-from">{formatDate(startDate)}</span>
                </div>
              )}
              <button
                className="clear-btn"
                onClick={onClearSelection}
                title="Clear Selection"
              >
                <X size={14} />
              </button>
            </div>
        </div>
      )}

      {searchedNoteKey && (
        <div className="search-result-header">
          <span className="search-result-label">Viewing found note</span>
          <button className="clear-btn" onClick={() => setSearchedNoteKey(null)}><X size={14} /></button>
        </div>
      )}

      {/* Note Editor Area */}
      <div className="notes-content">
         <NoteEditor 
            key={activeKey} // forces unmount/remount on key change, simplifying state 
            noteKey={activeKey} 
            title={activeTitle} 
            autoFocus={true} 
         />
      </div>

    </div>
  );
}
