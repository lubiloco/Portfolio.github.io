// script.js

document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city');
    const weatherResult = document.getElementById('weather-result');

    const apiKey = 'dfe83f6e1f0a97b25d7f29fac59b5c8f'; // Replace with your OpenWeatherMap API key

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });

    async function getWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            weatherResult.innerHTML = `<p>${error.message}</p>`;
            weatherResult.style.display = 'block';
        }
    }

    function displayWeather(data) {
        const { name, main, weather, wind } = data;
        weatherResult.innerHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${main.temp} °C</p>
            <p>Weather: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind Speed: ${wind.speed} m/s</p>
        `;
        weatherResult.style.display = 'block';
    }
});
