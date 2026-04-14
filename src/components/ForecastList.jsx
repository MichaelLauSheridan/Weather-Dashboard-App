function ForecastList({ forecast }) {
    return (
        <div className="forecast-container">
            <h2>5-Day Forecast</h2>

            <div className="forecast-list">
                {forecast.map((item, index) => (
                    <div className="forecast-card" key={index}>
                        <p><strong>{item.dt_txt}</strong></p>
                        <p>{Math.round(item.main.temp)} °C</p>
                        <p>{item.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ForecastList