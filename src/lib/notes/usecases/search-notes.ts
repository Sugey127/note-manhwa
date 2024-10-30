import type { Note } from '../note';
import { localDatabase } from './create-note';

export async function searchNotes(query: string): Promise<Note[]> {
  const offlineResults = await localDatabase.notes
    .filter(note => note.title.includes(query) || note.content.includes(query) || note.category.includes(query))
    .toArray();

  if (navigator.onLine) {
    const response = await fetch(`http://localhost:3000/api/notes/search?query=${query}`);
    if (response.ok) {
      const onlineResults = await response.json();
      return [...offlineResults, ...onlineResults];
    }
  }

  return offlineResults;
}
