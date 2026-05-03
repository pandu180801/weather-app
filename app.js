const API_KEY = "37cf1b54536b608d8808d643207e0c2c";

document.getElementById('getWeatherBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            document.getElementById('weatherDisplay').innerHTML = `<p>Error: ${data.message}</p>`;
        }
    } catch (error) {
        document.getElementById('weatherDisplay').innerHTML = '<p>Error fetching weather data</p>';
    }
});

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const weatherHtml = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Feels like: ${main.feels_like}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
    document.getElementById('weatherDisplay').innerHTML = weatherHtml;
}