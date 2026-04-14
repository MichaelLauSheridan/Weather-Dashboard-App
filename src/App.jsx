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
        setForecast(forecastData.list.slice(0, 5))
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })

    setLoading(true)
    setError('')
    setWeather(null)

    getWeather(city)
      .then((data) => {
        setWeather(data)
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

      {!weather && !loading && !error && <p className="no-data">No data yet. Search for a city.</p>}

      {weather && <WeatherCard weather={weather} />}
      {forecast.length > 0 && <ForecastList forecast={forecast} />}
    </div>
  )
}

export default App