<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    const favorites = writable<any[]>([]);
    const error = writable<string>('');


    onMount(async () => {
        try {
            const response = await fetch('/favorites'); 
            if (!response.ok) throw new Error('Failed to fetch favorites');
            const data = await response.json();
            favorites.set(data); 
        } catch (err) {
            console.error('Error fetching favorites:', err);
            error.set(String(err)); 
        }
    });
</script>

<main class="container mx-auto p-4">
    <h1 class="text-4xl font-bold text-center">My Favorites</h1>
    <p class="text-center text-lg mt-4">Here are all the places you have bookmarked!</p>

    {#if $error}
        <p class="text-red-500 text-center mt-4">{$error}</p>
    {/if}

    {#if $favorites.length > 0}
        <ul class="mt-8 space-y-4">
            {#each $favorites as favorite}
                <li class="p-4 border rounded shadow">
                    <p class="text-lg font-bold">{favorite.id} - {favorite.place}</p>
                    <p class="text-sm text-gray-600">
                        Added on {new Date(favorite.createdAt).toLocaleDateString()}
                    </p>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="text-center mt-4">No favorites yet. Start bookmarking your favorite places!</p>
    {/if}
</main>