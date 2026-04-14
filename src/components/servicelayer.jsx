export async function getWeather(city) {
    const apiKey = 'f2a1b6678ef6e67679ea3fe75e85b455'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('City not found')
        } else if (response.status === 401) {
            throw new Error('Invalid API key or key not activated yet')
        } else {
            throw new Error(data.message || 'Something went wrong')
        }
    }

    return data
  }