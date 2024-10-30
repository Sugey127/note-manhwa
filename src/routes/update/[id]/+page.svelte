<script lang="ts">
	import { onMount } from 'svelte';
	import { updateNote } from '$lib/notes/usecases/update-notes';
	import { getNoteById } from '$lib/notes/usecases/get-note';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import UpdateIcon from '../../../assets/put.svg';

	let title = '';
	let category = '';
	let content = '';
	let image = '';
	let errorMessage = '';

	onMount(async () => {
		const noteId = parseInt($page.params.id);
		const note = await getNoteById(noteId);
		if (note) {
			title = note.title;
			category = note.category;
			content = note.content;
			image = note.image || '';
		}
	});

	const validateInput = () => {
		if (title.length < 2) {
			errorMessage = 'El título debe tener al menos 2 caracteres.';
			return false;
		}
		if (title.length > 50) {
			errorMessage = 'El título no puede tener más de 50 caracteres.';
			return false;
		}
		if (category.length < 2) {
			errorMessage = 'La categoría debe tener al menos 2 caracteres.';
			return false;
		}
		if (category.length > 20) {
			errorMessage = 'La categoría no puede tener más de 20 caracteres.';
			return false;
		}
		if (content.length < 2) {
			errorMessage = 'El contenido debe tener al menos 2 caracteres.';
			return false;
		}
		if (content.split(' ').length > 100) {
			errorMessage = 'El contenido no puede tener más de 100 palabras.';
			return false;
		}
		if (!image) {
			errorMessage = 'La URL de la imagen es obligatoria.';
			return false;
		}
		errorMessage = '';
		return true;
	};

	const handleUpdate = async () => {
		if (validateInput()) {
			try {
				await updateNote(parseInt($page.params.id), { title, category, content, image });
				alert('Nota actualizada con éxito.');
				goto('/');
			} catch (error) {
				console.error('Error al actualizar la nota:', error);
			}
		} else {
			alert(errorMessage);
		}
	};

	const handleCancel = () => {
		goto('/');
	};
</script>

<div class="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100">
	<div class="flex-shrink-0 md:w-1/2 p-4">
		<img src={UpdateIcon} alt="Icono de eliminación" class="max-w-full max-h-60 md:max-h-full" />
	</div>
	<div class="bg-base text-white p-6 rounded-lg shadow-lg w-full max-w-md">
		<h2 class="text-lg font-semibold text-center">Actualizar Nota</h2>
		<label class="block mb-2">
			Título:
			<input type="text" bind:value={title} class="border rounded p-2 w-full" required />
		</label>
		<label class="block mb-2">
			Categoría:
			<input type="text" bind:value={category} class="border rounded p-2 w-full" required />
		</label>
		<label class="block mb-2">
			Contenido:
			<textarea bind:value={content} class="border rounded p-2 w-full" required></textarea>
		</label>
		<label class="block mb-2">
			URL de Imagen:
			<input type="text" bind:value={image} class="border rounded p-2 w-full" />
		</label>
		<div class="flex justify-end mt-4">
			<button on:click={handleUpdate} class="bg-success text-white px-4 py-2 rounded mr-2"
				>Actualizar</button
			>
			<button on:click={handleCancel} class="bg-danger text-white px-4 py-2 rounded"
				>Cancelar</button
			>
		</div>
	</div>
</div>
