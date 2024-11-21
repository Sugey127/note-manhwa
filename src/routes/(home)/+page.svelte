<script>
	import Note from '$lib/notes/ui/note.svelte';
	import { getAllNotes } from '$lib/notes/usecases/get-all-notes';
	import { filterNotes } from '$lib/notes/usecases/filter-notes';
	import LinkButton from '$lib/shared/ui/button.svelte';
	import SearchButton from '$lib/shared/ui/button-buscador.svelte';

	let notesPromise = $state.raw(getAllNotes());
	let selectedCategory = 'Todos';
  let noResults = false; 

	const filterNotesHandler = async (category) => {
		selectedCategory = category;
		noResults = false;

		if (category === 'Todos') {
			notesPromise = getAllNotes();
		} else {
				notesPromise = filterNotes(category).catch(() => {
					noResults = true;
					return [];
				});
		}
	};
	
</script>

<div class="grid gap-5">
    <div class="flex gap-4 justify-between">
        <button
            class="bg-primary font-bold text-base rounded-xl h-11 px-4 hover:bg-secondary transition"
            type="button"
            onclick={() => (notesPromise = getAllNotes())}
						aria-label="Actualizar notas" 
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

<ul class="flex gap-5 font-medium text-sm w-80 tablet:w-full">
	<li>
			<button 
					class={selectedCategory === 'Todos' ? 'bg-primary h-10 text-base grid items-center px-4 rounded-xl' : 'outline outline-1 outline-gray text-primary/50 h-10 grid items-center px-4 rounded-xl'}
					onclick={() => filterNotesHandler('Todos')}
			>
					Todos
			</button>
	</li>
	<li>
			<button 
					class={selectedCategory === 'Fantasia' ? 'bg-primary h-10 text-base grid items-center px-4 rounded-xl' : 'outline outline-1 outline-gray text-primary/50 h-10 grid items-center px-4 rounded-xl'}
					onclick={() => filterNotesHandler('Fantasia')}
			>
					Fantasia
			</button>
	</li>
	<li>
			<button 
					class={selectedCategory === 'Romance' ? 'bg-primary h-10 text-base grid items-center px-4 rounded-xl' : 'outline outline-1 outline-gray text-primary/50 h-10 grid items-center px-4 rounded-xl'}
					onclick={() => filterNotesHandler('Romance')}
			>
					Romance
			</button>
	</li>
	<li>
			<button 
					class={selectedCategory === 'Reencarnaciones' ? 'bg-primary h-10 text-base grid items-center px-4 rounded-xl' : 'outline outline-1 outline-gray text-primary/50 h-10 grid items-center px-4 rounded-xl'}
					onclick={() => filterNotesHandler('Reencarnaciones')}
			>
					Reencarnaciones
			</button>
	</li>
</ul>


<div class="grid grid-cols-2 gap-4">
	{#await notesPromise}
	<div class="text-center col-span-2">Cargando ...</div>
	{:then notes}
			{#if notes.length === 0 && noResults}
					<div class="text-center col-span-2">No hay notas en la categoría "{selectedCategory}"</div>
			{:else}
					{#each notes as note}
							<Note {...note} />
					{/each}
			{/if}
	{/await}
</div>
