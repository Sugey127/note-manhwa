<script>
	import Note from '$lib/notes/ui/note.svelte';
	import { getAllNotes } from '$lib/notes/usecases/get-all-notes';
	let notesPromise = $state.raw(getAllNotes());
</script>

<button
		class="bg-gray font-bold rounded-full h-11"
		type="button"
		onclick={() => (notesPromise = getAllNotes())}
	>
		Recargar
	</button>
<div class="grid grid-cols-2 gap-4">
	{#await notesPromise}
		Cargando ...
	{:then notes}
		{#each notes as note}
			<Note {...note} />
		{/each}
	{/await}
</div>
