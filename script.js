const API_KEY = "ecc53b2658584c4216d364bedbc3063f";

// Mapping weather conditions to custom icons
const customWeatherIcons = {
    "Thunderstorm": "assets/thunderstorm.svg",
    "Drizzle": "assets/drizzle.svg",
    "Rain": "assets/rain.svg",
    "Snow": "assets/snow.svg",
    "Clear": "assets/clear.svg",
    "Clouds": "assets/clouds.svg",
    "Atmosphere": "assets/atmosphere.svg",
    "default": "assets/default.svg"
};

document.getElementById('search-btn').addEventListener('click', async () => {
    const city = document.getElementById('city').value.trim();
    const country = document.getElementById('country').value.trim();

    if (!city || !country) {
        alert('Please enter both city and country.');
        return;
    }

    try {
        // Fetch weather data
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`
        );
        const weatherData = await weatherResponse.json();

        if (!weatherResponse.ok) {
            throw new Error(weatherData.message);
        }

        // Update current weather info
        document.getElementById('location').innerText = `${weatherData.name}, ${weatherData.sys.country}`;
        document.getElementById('temperature').innerText = `${Math.round(weatherData.main.temp)}°C`;
        document.getElementById('description').innerText = weatherData.weather[0].description;
        document.getElementById('humidity').innerText = `${weatherData.main.humidity}%`;

        const windSpeedInKmh = weatherData.wind.speed * 3.6;
        document.getElementById('wind-speed').innerText = `${windSpeedInKmh.toFixed(2)} km/h`;

        const mainCondition = weatherData.weather[0].main;
        const weatherIconSrc = customWeatherIcons[mainCondition] || customWeatherIcons["default"];
        document.getElementById('weather-icon').src = weatherIconSrc;

        // Fetch forecast data
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();

        // Only handle days 2, 3, and 4
        const days = ['day2', 'day3', 'day4'];
        days.forEach((day, index) => {
            // Adjust to start from the second day's forecast
            const forecast = forecastData.list[(index + 1) * 8];
            const forecastCondition = forecast.weather[0].main;
            const forecastIconSrc = customWeatherIcons[forecastCondition] || customWeatherIcons["default"];

            const dayElement = document.getElementById(day);
            dayElement.querySelector('p:first-child').innerText = new Date(forecast.dt_txt).toDateString();
            dayElement.querySelector('img').src = forecastIconSrc;
            dayElement.querySelector('p:last-child').innerText = `${Math.round(forecast.main.temp)}°C`;
        });
    } catch (error) {
        alert('Error fetching weather data: ' + error.message);
    }
});