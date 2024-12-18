import { localDatabase } from './create-note';

localDatabase.version(1).stores({
  notes: '++id, title, content, category',
});

export async function deleteNote(noteId: number): Promise<void> {
  if (!navigator.onLine) {
    await localDatabase.notes.delete(noteId);
    return;
  }

  await deleteFromApi(noteId); 
}

async function deleteFromApi(noteId: number) { 
  const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar los datos');
  }
}
