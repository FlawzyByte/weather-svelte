<script lang="ts">
	import Header from '../lib/components/Header.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import '../app.css';
	const githubUrl = "https://github.com/FlawzyByte";
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>
</div>

<Footer githubUrl={githubUrl} />

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>