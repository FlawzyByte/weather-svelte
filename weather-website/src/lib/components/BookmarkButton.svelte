<script lang="ts">
  export let place: string;

  const bookmark = async () => {
      try {
          const response = await fetch('/bookmark', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ place }),
          });

          if (response.ok) {
              alert(`${place} has been bookmarked successfully!`);
          } else {
              const errorData = await response.json();
              alert(`Failed to bookmark the location: ${errorData.error || 'Unknown error'}`);
          }
      } catch (error) {
          console.error('Error bookmarking place:', error);
          alert('An error occurred while bookmarking the location.');
      }
  };
</script>

<button class="bookmark-button" aria-label="Bookmark this location" on:click={bookmark}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    class="bookmark-icon"
  >
      <path d="M6 4c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v18l-7-5-7 5V4z" />
  </svg>
</button>

<style>
.bookmark-button {
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  transition: transform 0.2s ease-in-out;
}

.bookmark-button:hover {
  transform: scale(1.1);
}

.bookmark-icon {
  width: 24px;
  height: 24px;
  fill: #ffcc00; /* Customize the fill color for the bookmark icon */
  transition: fill 0.2s ease-in-out;
}

.bookmark-button:hover .bookmark-icon {
  fill: #ffa500; /* Change color when hovering */
}
</style>