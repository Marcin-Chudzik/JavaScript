export const getWeatherByCity = city => {
    // API key. Normally it's required to create an account on API site, so i published mine own.
    const apiKey = '7ad87a34dcc3c2be88b7ba506cf382d0';
    // Calling an "OpenWeather - Geocoding" API with city name as param. 
    return fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    )
    .then(resp => resp.json())
    .then(data => {
        // Saving lat and lon city geographic coordinates.
        const lat = data[0].lat;
        const lon = data[0].lon;
        // Calling an "OpenWeather - Current weather data" API with saved city's lat and lon.
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        // Saving city's current weather data.
        ).then(resp => resp.json().then(data => data))
    });
}