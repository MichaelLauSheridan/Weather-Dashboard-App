function ForecastList({ forecast }) {
    return (
        <div className="forecast-container">
            <h2>5-Day Forecast</h2>

            <div className="forecast-list">
                {forecast.map((item, index) => (
                    <div className="forecast-card" key={index}>
                        <p>
                            <strong>
                                {new Date(item.dt_txt).toLocaleDateString(undefined, {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </strong>
                        </p>

                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt="forecast icon"
                        />

                        <p>{Math.round(item.main.temp)} °C</p>
                        <p>{item.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ForecastList