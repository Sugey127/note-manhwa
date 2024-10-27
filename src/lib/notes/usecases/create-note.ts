import Dexie, { type EntityTable } from "dexie";
import type { Note } from "../note";

export const localDatabase = new Dexie('noter') as Dexie & { notes: EntityTable<Note, 'id'> };

localDatabase.version(1).stores({
  notes: '++id, title, content, category',
});

export async function createNote(note: Note): Promise<void> {
  const noteWithId = { ...note, id: new Date().getTime() };

  if (!navigator.onLine) {
    await localDatabase.notes.add(noteWithId); 
    requestSync();
    return;
  }

  await sendToApi(noteWithId); 
}


export async function sendToApi(note: Note) {
  const response = await fetch('http://localhost:3000/api/notes', {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al enviar los datos');
  }
}

async function requestSync() {
  const registration = await navigator.serviceWorker.ready;
  await registration.sync.register('sync-notes');
}

export async function syncNotes() {
  const notesToSync = await localDatabase.notes.toArray();

  for (const note of notesToSync) {
    try {
      await sendToApi(note);
      await localDatabase.notes.delete(note.id);
    } catch (error) {
      console.error('Error al sincronizar nota:', error);
    }
  }
}