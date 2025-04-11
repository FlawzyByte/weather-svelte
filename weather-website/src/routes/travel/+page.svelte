<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    const travelIdeas = writable<any[]>([]);
    const error = writable<string>('');
    const inputVisible = writable<boolean>(false);
    const selectedPlace = writable<string>(''); 
    const userInput = writable<string>(''); 
    // Fetch backend
    onMount(async () => {
        try {
            const response = await fetch('/travel');
            if (!response.ok) throw new Error('Failed to fetch travel ideas');
            const data = await response.json();
            travelIdeas.set(data);
        } catch (err) {
            console.error('Error fetching travel ideas:', err);
            error.set(String(err));
        }
    });

    const isValidFormat = (input: string) => {
        const regex = /^[a-zA-Z]+-[a-zA-Z]+$/; 
        return regex.test(input);
    };

    const openInputDialog = (place: string) => {
        selectedPlace.set(place);
        inputVisible.set(true);
    };

    const confirmAndRedirect = () => {
        $inputVisible = false; 

        if (isValidFormat($userInput)) {
            const origin = 'budapest-hungary'; 
            const destination = $userInput.toLowerCase();
            const redirectUrl = `https://www.kiwi.com/en/search/results/${origin}/${destination}/anytime/anytime`;

            // Rdr to the travel website
            window.open(redirectUrl, '_blank', 'noopener,noreferrer');
        } else {
            alert('Invalid format! Please use the format: city-country (e.g., paris-france).');
        }
    };
</script>

<main class="container mx-auto p-4">
    <h1 class="text-4xl font-bold text-center">Travel Ideas & Suggestions</h1>
    <p class="text-center text-lg mt-4">Explore travel destinations based on popular bookmarks!</p>

    {#if $error}
        <p class="text-red-500 text-center mt-4">{$error}</p>
    {/if}

    {#if $travelIdeas.length > 0}
        <section class="mt-8">
            <h2 class="text-2xl font-bold mb-4">Popular Destinations</h2>
            <ul class="space-y-4">
                {#each $travelIdeas as idea, index}
                    <li class="p-4 border rounded shadow">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-lg font-bold">{index + 1}. {idea.place}</p>
                                <p class="text-sm text-gray-600">Bookmarked {idea._count.place} times</p>
                            </div>
                            <button
                                class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                on:click={() => openInputDialog(idea.place)}
                            >
                                Check Flights
                            </button>
                        </div>
                    </li>
                {/each}
            </ul>
        </section>
    {:else}
        <p class="text-center mt-4">No travel ideas available yet. Bookmark some places to get started!</p>
    {/if}

    {#if $inputVisible}
        <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white p-6 rounded shadow-lg">
                <h3 class="text-lg font-bold mb-4">Are you sure you want to check flight prices?</h3>
                <p class="text-sm mb-2">Please confirm the destination in this format: <strong>city-country</strong></p>
                <input
                    type="text"
                    bind:value={$userInput}
                    placeholder="e.g., paris-france"
                    class="border rounded w-full p-2 mb-4"
                />
                <div class="flex justify-end space-x-4">
                    <button
                        class="p-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                        on:click={() => (inputVisible.set(false), userInput.set(''))}
                    >
                        Cancel
                    </button>
                    <button
                        class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        on:click={confirmAndRedirect}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    {/if}
</main>