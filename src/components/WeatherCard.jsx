function WeatherCard({ weather }) {
    return (
        <div className="weather-card">
            <h2>{weather.name}</h2>

            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
            />

            <p><strong>Temperature:</strong> {Math.round(weather.main.temp)} °C</p>
            <p><strong>Weather:</strong> {weather.weather[0].description}</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
        </div>
    )
}

export default WeatherCard