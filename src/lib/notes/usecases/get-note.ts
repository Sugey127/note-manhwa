import type { Note } from '../note';
import { localDatabase } from './create-note';

export async function getNoteById(id: number): Promise<Note | null> {
  const note = await localDatabase.notes.get(id);
  
  if (note) {
    return note;
  }

  if (navigator.onLine) {
    const response = await fetch(`http://localhost:3000/api/notes/${id}`);
    if (response.ok) {
      return await response.json();
    }
  }

  return null;
}
