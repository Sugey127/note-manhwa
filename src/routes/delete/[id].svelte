<script lang="ts">
  import { onMount } from 'svelte';
  import { deleteNote } from '$lib/notes/usecases/delete-note';
  import { goto } from '$app/navigation'; 

  export let params; 
  let noteId: string = params.id;

  async function handleConfirm() {
      try {
          await deleteNote(noteId);
          alert('Manhwa eliminado con éxito.');
          goto('/'); 
      } catch (error) {
          console.error('Error al eliminar la nota:', error);
      }
  }

  function handleCancel() {
      goto('/'); 
  }

  onMount(() => {
      // Aquí puedes cargar información de la nota si es necesario
  });
</script>

<div class="flex items-center justify-center h-screen bg-gray-100">
  <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-lg font-semibold">Confirmar eliminación</h2>
      <p>¿Está seguro de que desea eliminar esta nota?</p>
      <div class="mt-4 flex justify-end space-x-2">
          <button class="bg-red-500 text-white px-4 py-2 rounded" on:click={handleConfirm}>Sí, eliminar</button>
          <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded" on:click={handleCancel}>Cancelar</button>
      </div>
  </div>
</div>
