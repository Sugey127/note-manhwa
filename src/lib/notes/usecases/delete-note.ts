import Dexie, { type EntityTable } from "dexie";
import type { Note } from "../note";

export const localDatabase = new Dexie('noter') as Dexie & { notes: EntityTable<Note, 'id'> };

localDatabase.version(1).stores({
  notes: '++id, title, content, category',
});

export async function deleteNote(noteId: string): Promise<void> {
  if (!navigator.onLine) {
    await localDatabase.notes.delete(noteId);
    return;
  }

  await deleteFromApi(noteId); 
}

async function deleteFromApi(noteId: string) { 
  const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar los datos');
  }
}
