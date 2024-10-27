<script lang="ts">
	export let isOpen = false;
	export let onClose;
	export let onSubmit;

	let title = '';
	let category = '';
	let content = '';
	let image = '';
	let errorMessage = '';

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

	const handleSubmit = () => {
		if (validateInput()) {
			onSubmit({ title, category, content, image });
			title = '';
			category = '';
			content = '';
			image = '';
			onClose();
		} else {
			alert(errorMessage); 		}
	};
</script>

{#if isOpen}
	<div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
		<div class="bg-constrast p-6 rounded-lg shadow-lg ">
		
			<h2 class="text-xl font-semibold mb-4">Agregar Manhwa</h2>
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
				<button on:click={handleSubmit} class="bg-primary text-base px-4 py-2 rounded mr-2">Guardar</button>
				<button on:click={onClose} class="bg-base px-4 py-2 rounded">Cancelar</button>
			</div>
		</div>
	</div>
{/if}