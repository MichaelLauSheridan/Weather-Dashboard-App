import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'
import ErrorMessage from './components/ErrorMessage'
import { getWeather } from './components/servicelayer'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function fetchWeather() {
    if (city.trim() === '') {
      setError('Please enter a city name')
      setWeather(null)
      return
    }

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
      {weather && <WeatherCard weather={weather} />}
    </div>
  )
}

export default App