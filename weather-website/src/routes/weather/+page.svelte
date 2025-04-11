<script lang="ts">
    import { writable } from 'svelte/store';
    import BookmarkButton from '$lib/components/BookmarkButton.svelte';
    import './weather.css';
    
    let country = '';
    let city = '';
    const weatherData = writable<any>(null);
    const error = writable<string>('');
    const showDetails = writable<number | null>(null);
    const detailedWeatherData = writable<any>(null);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY; 

    const fetchWeatherData = async () => {
        try {
            weatherData.set(null);
            error.set('');
            const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}`;
            
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("The location you're searching doesn't exist, Please re-write it");
            const data = await response.json();
            
            // Filter 9AM
            const dailyForecasts = [];
            const dateSet = new Set();
            for (const forecast of data.list) {
                const date = forecast.dt_txt.split(' ')[0];
                const time = forecast.dt_txt.split(' ')[1];
                if (time === "09:00:00" && !dateSet.has(date)) {
                    dailyForecasts.push(forecast);
                    dateSet.add(date);
                }
            }
            weatherData.set({ ...data, list: dailyForecasts });
        } catch (err) {
            error.set(String(err));
        }
    };

    const fetchDetailedWeatherData = async (date: string) => {
        try {
            detailedWeatherData.set(null);
            error.set('');
            const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}`;
            
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Failed to fetch detailed weather data');
            const data = await response.json();

            const forecasts = data.list.filter((f: any) => f.dt_txt.startsWith(date));
            if (forecasts.length > 0) {
                detailedWeatherData.set(forecasts);
            } else {
                throw new Error('No data for the specified date');
            }
        } catch (err) {
            error.set(String(err));
        }
    };

    const toggleDetails = (index: number, date: string) => {
        showDetails.update(value => {
            if (value === index) {
                return null;
            } else {
                fetchDetailedWeatherData(date);
                return index;
            }
        });
    };

    const celsiusToFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;
</script>
  
<main class="container mx-auto p-4">
    <section class="text-center my-8">
        <h1 class="text-4xl font-bold">Weather Information</h1>
        <p class="mt-4 text-lg">Check the current weather conditions for any location by entering the city name.</p>
        <div class="input-container">
            <input type="text" bind:value={country} placeholder="Enter country code (e.g., US)" class="border rounded p-2 mb-2" />
            <input type="text" bind:value={city} placeholder="Enter city name" class="border rounded p-2 mb-2" />
            <button on:click={fetchWeatherData} class="p-2 bg-blue-500 text-white rounded">Get Weather</button>
        </div>
    </section>

    {#if $error}
        <p class="text-red-500 text-center mt-4">{$error}</p>
    {/if}

    {#if $weatherData}
        <section class="mt-8">
            <h2 class="text-2xl font-bold flex items-center justify-between">
                <span class="flex items-center">
                  Weather Forecast for {$weatherData.city.name}, {$weatherData.city.country}
                  <img
                    src={`https://flagcdn.com/h20/${$weatherData.city.country.toLowerCase()}.png`}
                    alt="{$weatherData.city.country} flag"
                    class="ml-2"
                  />
                </span>
                <BookmarkButton place="{$weatherData.city.name}, {$weatherData.city.country}" />
              </h2>
            <p class="mt-2">Coordinates: Latitude {$weatherData.city.coord.lat}, Longitude {$weatherData.city.coord.lon}</p>
            <p class="mt-2">Population: {$weatherData.city.population}</p>
            <p class="mt-2">Timezone: {$weatherData.city.timezone / 3600} hours from GMT</p>
            <p class="mt-2">Sunrise: {new Date($weatherData.city.sunrise * 1000).toLocaleTimeString()}</p>
            <p class="mt-2">Sunset: {new Date($weatherData.city.sunset * 1000).toLocaleTimeString()}</p>

            <h3 class="text-xl font-bold mt-6">Forecast:</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {#each $weatherData.list as forecast, index}
                    <div class="forecast-card p-4 border rounded shadow" class:rotate-360={$showDetails === index}>
                        <div class="card-content" class:hidden={$showDetails === index}>
                            <p><strong>Date & Time:</strong> {forecast.dt_txt}</p>
                            <p><strong>Temperature:</strong> {forecast.main.temp}°K ({(forecast.main.temp - 273.15).toFixed(2)}°C / {celsiusToFahrenheit(forecast.main.temp - 273.15).toFixed(2)}°F)</p>
                            <p><strong>Weather:</strong> {forecast.weather[0].description} <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt={forecast.weather[0].description} /></p>
                            <p><strong>Humidity:</strong> {forecast.main.humidity}%</p>
                            <p><strong>Wind:</strong> {forecast.wind.speed} m/s, {forecast.wind.deg}°</p>
                            <button on:click={() => toggleDetails(index, forecast.dt_txt.split(' ')[0])} class="mt-2 p-2 bg-green-500 text-white rounded">More Information</button>
                        </div>
                        
                        {#if $showDetails === index}
                            {#if $detailedWeatherData}
                                <div class="additional-info mt-2 flex flex-wrap gap-2">
                                    {#each $detailedWeatherData as detailedForecast}
                                        <div class="detailed-forecast p-2 border-t">
                                            <img src={`http://openweathermap.org/img/wn/${detailedForecast.weather[0].icon}.png`} alt={detailedForecast.weather[0].description} />
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        {/if}
                    </div>
                {/each}
            </div>
        </section>
    {/if}
</main>