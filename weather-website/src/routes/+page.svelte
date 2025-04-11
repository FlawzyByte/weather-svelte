<script lang="ts">
  import { goto } from '$app/navigation';

  //conv Cels to Fahr
  const CelsToFehr = (celsius: number) => (celsius * 9) / 5 + 32;
</script>

<main class="container mx-auto p-4">
  <section class="text-center my-8">
    <h1 class="text-4xl font-bold">Welcome to the Weather and Travel Dashboard</h1>
    <p class="mt-4 text-lg">Your go-to place for current weather conditions and travel suggestions.</p>
    <p class="mt-4 text-lg">Would you like to simply check the weather, or register to save your preferred locations and receive daily weather updates?</p>
    <div class="button-container">
      <button class="button-78" on:click|preventDefault={() => goto('/weather')}>Check the weather!</button>
    </div>
  </section>  

  <section class="my-8">    
    <h2 class="text-2xl font-semibold">Explore Our Features</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div class="p-4 border rounded-lg hover:shadow-lg">
        <h3 class="text-xl font-bold">Weather</h3>
        <p class="mt-2">Check the current weather conditions for any location.</p>
        <a href="/weather" class="inline-block mt-4 text-blue-500 hover:underline">Learn more</a>
      </div>
      <div class="p-4 border rounded-lg hover:shadow-lg">
        <h3 class="text-xl font-bold">Travel Suggestions</h3>
        <p class="mt-2">Get travel ideas and suggestions based on the weather.</p>
        <a href="/travel" class="inline-block mt-4 text-blue-500 hover:underline">Learn more</a>
      </div>
      <div class="p-4 border rounded-lg hover:shadow-lg">
        <h3 class="text-xl font-bold">Favorites</h3>
        <p class="mt-2">Save and manage your favorite travel destinations.</p>
        <a href="/favorites" class="inline-block mt-4 text-blue-500 hover:underline">Learn more</a>
      </div>
    </div>
  </section>

  <section class="my-8">
    <h2 class="text-2xl font-semibold">Why Choose Us?</h2>
    <p class="mt-4">
      Our dashboard provides accurate and up-to-date weather information, along with personalized travel suggestions to help you plan your trips effectively. Whether you're looking for a sunny beach getaway or a cozy mountain retreat, we've got you covered.
    </p>
  </section>
</main>

<style>
  main {
    max-width: 1200px;
  }
  .container {
    max-width: 1200px;
  }
  .text-blue-500 {
    color: #3b82f6;
  }
  .button-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
  
  .button-78 {
    align-items: center;
    appearance: none;
    background-clip: padding-box;
    background-color: initial;
    background-image: none;
    border-style: none;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    flex-direction: row;
    flex-shrink: 0;
    font-family: Eina01, sans-serif;
    font-size: 16px;
    font-weight: 800;
    justify-content: center;
    line-height: 24px;
    margin: 0;
    min-height: 64px;
    outline: none;
    overflow: visible;
    padding: 19px 26px;
    pointer-events: auto;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    width: auto;
    word-break: keep-all;
    z-index: 0;
  }

  @media (min-width: 768px) {
    .button-78 {
      padding: 19px 32px;
    }
  }

  .button-78:before,
  .button-78:after {
    border-radius: 80px;
  }

  .button-78:before {
    background-image: linear-gradient(92.83deg, #ff7426 0, #f93a13 100%);
    content: "";
    display: block;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -2;
  }

  .button-78:after {
    background-color: initial;
    background-image: linear-gradient(#541a0f 0, #0c0d0d 100%);
    bottom: 4px;
    content: "";
    display: block;
    left: 4px;
    overflow: hidden;
    position: absolute;
    right: 4px;
    top: 4px;
    transition: all 100ms ease-out;
    z-index: -1;
  }

  .button-78:hover:not(:disabled):before {
    background: linear-gradient(92.83deg, rgb(255, 116, 38) 0%, rgb(249, 58, 19) 100%);
  }

  .button-78:hover:not(:disabled):after {
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    transition-timing-function: ease-in;
    opacity: 0;
  }

  .button-78:active:not(:disabled) {
    color: #ccc;
  }

  .button-78:active:not(:disabled):before {
    background-image: linear-gradient(0deg, rgba(0, 0, 0, .2), rgba(0, 0, 0, .2)), linear-gradient(92.83deg, #ff7426 0, #f93a13 100%);
  }

  .button-78:active:not(:disabled):after {
    background-image: linear-gradient(#541a0f 0, #0c0d0d 100%);
    bottom: 4px;
    left: 4px;
    right: 4px;
    top: 4px;
  }

  .button-78:disabled {
    cursor: default;
    opacity: .24;
  }

  main {
    text-align: center;
    padding: 50px;
  }
</style>