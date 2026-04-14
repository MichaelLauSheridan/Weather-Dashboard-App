import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastList from './components/ForecastList'
import Loading from './components/Loading'
import ErrorMessage from './components/ErrorMessage'
import { getWeather, getForecast } from './components/servicelayer'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function getDailyForecasts(list) {
    const dailyData = {}

    list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0]
      const time = item.dt_txt.split(' ')[1]

      if (!dailyData[date] || time === '12:00:00') {
        dailyData[date] = item
      }
    })

    return Object.values(dailyData).slice(0, 5)
  }

  function fetchWeather() {
    if (city.trim() === '') {
      setError('Please enter a city name')
      setWeather(null)
      setForecast([])
      return
    }

    setLoading(true)
    setError('')
    setWeather(null)
    setForecast([])

    Promise.all([getWeather(city), getForecast(city)])
      .then(([weatherData, forecastData]) => {
        setWeather(weatherData)

        const dailyForecasts = getDailyForecasts(forecastData.list)
        setForecast(dailyForecasts)

        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  return (
    <div className="app-container">
      <h1>Weather App</h1>

      <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!weather && !loading && !error && (
        <p className="no-data-message">No data yet. Search for a city.</p>
      )}
      {weather && <WeatherCard weather={weather} />}
      {forecast.length > 0 && <ForecastList forecast={forecast} />}
    </div>
  )
}

export default App