import type { Note } from '../note';
import { localDatabase } from './create-note';

export async function filterNotes(category: string): Promise<Note[]> {
  const offlineResults = await localDatabase.notes
    .filter(note => note.category.toLowerCase() === category.toLowerCase())
    .toArray();

  if (navigator.onLine) {
    const response = await fetch(`http://localhost:3000/api/filter?category=${category}`);
    if (response.ok) {
      const onlineResults = await response.json();
      return [...offlineResults, ...onlineResults];
    }
  }

  return offlineResults;
}
