<script lang="ts">
	import type { Note } from '../note';
	import { goto } from '$app/navigation';

	let note: Partial<Note> = $props();
	const handleDelete = () => {
		if (note.id) {
			goto(`/delete/${note.id}`);
		}
	};

	const handleUpdate = () => {
		if (note.id) {
			goto(`/update/${note.id}`);
		}
	};
</script>

<article
	class="bg-white text-base py-6 px-4 rounded-xl flex flex-col md:flex-row gap-4 break-inside"
>
	{#if note.image}
		<img src={note.image} alt="Imagen del manhwa" class="w-full md:w-1/3 h-auto rounded-md" />
	{/if}
	<div class="flex-1 flex flex-col">
		<h4 class="text-xl font-semibold">
			{note.title}
		</h4>
		<p class="font-semibold">
			# {note.category}
		</p>
		<p class="flex-1">
			{note.content}
		</p>
		<div class="mt-4 flex flex-col md:flex-row md:justify-end space-y-2 md:space-y-0 md:space-x-2">
			<button on:click={handleUpdate} class="bg-blue text-white px-4 py-2 rounded w-full md:w-auto">Editar</button>
			<button on:click={handleDelete} class="bg-base text-white px-4 py-2 rounded w-full md:w-auto"
				>Eliminar</button
			>
		</div>
	</div>
</article>
