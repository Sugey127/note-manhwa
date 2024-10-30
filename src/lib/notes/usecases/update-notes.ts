import type { Note } from '../note';
import { localDatabase } from './create-note';

export async function updateNote(id: number, updatedNote: Partial<Note>): Promise<void> {
  if (!navigator.onLine) {
    await localDatabase.notes.update(id, updatedNote);
    requestSync();
    return;
  }

  await sendToApi(updatedNote, id);
}

async function sendToApi(note: Partial<Note>, id: number) {
  const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
    method: 'PUT',
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
