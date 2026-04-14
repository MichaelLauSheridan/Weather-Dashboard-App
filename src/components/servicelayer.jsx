export async function getWeather(city) {
    const apiKey = 'YOUR_API_KEY'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('City not found')
    }

    return await response.json()
  }