<script>
	import Note from '$lib/notes/ui/note.svelte';
	import { getAllNotes } from '$lib/notes/usecases/get-all-notes';
	import LinkButton from '$lib/shared/ui/button.svelte';
	import SearchButton from '$lib/shared/ui/button-buscador.svelte';


	let notesPromise = $state.raw(getAllNotes());
</script>

<div class="grid gap-5">
    <div class="flex gap-4 justify-between">
        <button
            class="bg-primary font-bold text-base rounded-xl h-11 px-4 hover:bg-secondary transition"
            type="button"
            onclick={() => (notesPromise = getAllNotes())}
        >
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
					<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
				</svg>
        </button>
				<SearchButton />
				<LinkButton />
    </div>
</div>


<div class="grid grid-cols-2 gap-4">
	{#await notesPromise}
		Cargando ...
	{:then notes}
		{#each notes as note}
			<Note {...note} />
		{/each}
	{/await}
</div>
