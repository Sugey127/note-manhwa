<script lang="ts">
  import { searchNotes } from '$lib/notes/usecases/search-notes';
  import type { Note } from '$lib/notes/note';
  import Searcher from '$lib/shared/ui/searcher.svelte';
	import NoteCard from '$lib/notes/ui/note.svelte';

  let currentNotes: Note[] = [];
  let searchTerm = '';

  const handleSearch = async (term: string) => {
    searchTerm = term;
    if (searchTerm) {
      currentNotes = await searchNotes(searchTerm);
    } else {
      currentNotes = []; 
    }
  };
</script>

<div class="px-4 py-5 grid gap-8 max-w-screen-xl m-auto">
  <Searcher on:search={event => handleSearch(event.detail)} />

    <div class="grid grid-cols-2 gap-4">
      {#each currentNotes as note}
          <NoteCard {...note} />
      {/each}
    </div>
</div>

