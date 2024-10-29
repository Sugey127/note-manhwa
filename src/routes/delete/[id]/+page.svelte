<script lang="ts">
	import { deleteNote } from '$lib/notes/usecases/delete-note';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
    import DeleteIcon from '../../../assets/delete.svg';

	async function handleConfirm() {
		try {
			await deleteNote(parseInt($page.params.id));
			alert('Manhwa eliminado con éxito.');
			goto('/');
		} catch (error) {
			console.error('Error al eliminar la nota:', error);
		}
	}

	function handleCancel() {
		goto('/');
	}
</script>

<div class="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100">
    <div class="flex-shrink-0 md:w-1/2 p-4">
      <img src={DeleteIcon} alt="Icono de eliminación" class="max-w-full max-h-60 md:max-h-full" />
    </div>
    <div class="md:w-1/2 flex items-center justify-center">
      <div class="bg-base text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-lg font-semibold text-center">Confirmar eliminación</h2>
        <p class="text-center">¿Está seguro de que desea eliminar esta nota?</p>
        <div class="mt-4 flex justify-center space-x-2">
          <button class="bg-success text-white px-4 py-2 rounded" on:click={handleConfirm}>Sí, eliminar</button>
          <button class="bg-danger text-white px-4 py-2 rounded" on:click={handleCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  
