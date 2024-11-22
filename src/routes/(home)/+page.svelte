<script>
	import Note from '$lib/notes/ui/note.svelte';
	import { getAllNotes } from '$lib/notes/usecases/get-all-notes';
	import { filterNotes } from '$lib/notes/usecases/filter-notes';
	import LinkButton from '$lib/shared/ui/button.svelte';
	import SearchButton from '$lib/shared/ui/button-buscador.svelte';
	import { json } from '@sveltejs/kit';

	let selectedCategory = $state('Todos');
	let notesPromise = $state(getAllNotes());
</script>

<div class="grid gap-5">
	<div class="flex gap-4 justify-between">
		<SearchButton />
		<LinkButton />
		<ul class="flex gap-5 font-medium text-sm w-80 tablet:w-full">
			<li>
				<button
					class={selectedCategory === 'Todos' ? 'active-category-tag' : 'diable-category-tag'}
					onclick={() => {notesPromise = getAllNotes(); selectedCategory= 'Todos'}}
				>
					Todos
				</button>
			</li>
			<li>
				<button
					class={selectedCategory === 'Fantasia' ? 'active-category-tag' : 'diable-category-tag'}
					onclick={() => {notesPromise = filterNotes('Fantasia'); selectedCategory = 'Fantasia';}}
				>
					Fantasia
				</button>
			</li>
			<li>
				<button
					class={selectedCategory === 'Romance' ? 'active-category-tag' : 'diable-category-tag'}
					onclick={() => {notesPromise = filterNotes('Romance'); selectedCategory = 'Romance';}}
				>
					Romance
				</button>
			</li>
			<li>
				<button
					class={selectedCategory === 'Reencarnaciones'
						? 'active-category-tag'
						: 'diable-category-tag'}
					onclick={() => {notesPromise = filterNotes('Reencarnaciones'); selectedCategory = 'Reencarnaciones';}}
					>
					Reencarnaciones
				</button>
			</li>
		</ul>
	</div>
</div>

<div class="grid grid-cols-2 gap-4">
	{#await notesPromise}
		<div class="text-center col-span-2">Cargando ...</div>
	{:then notes}
		{#if notes.length === 0}
			<div class="text-center col-span-2">No hay notas en categoria: {selectedCategory}</div>
		{:else}
			{#each notes as note}
				<Note {...note} />
			{/each}
		{/if}
		{:catch error}
	<p style="color: red">{error.message}</p>
	{/await}
</div>
