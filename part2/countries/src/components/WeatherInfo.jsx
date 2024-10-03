import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const iconBaseUrl = "https://openweathermap.org/img/wn/";

const WeatherInfo = ({ country }) => {
  const [lat, lon] = country.capitalInfo.latlng;
  const [weather, setWeather] = useState({
    temp: "",
    wind: "",
    icon: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    weatherService
      .getWeather(lat, lon)
      .then((data) => {
        setIsLoading(false);
        setWeather({
          temp: data.current.temp,
          wind: data.current.wind_speed,
          icon: data.current.weather[0].icon,
          description: data.current.weather[0].description,
        });
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
      });
  }, []);

  if (error) return;

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section>
          <h2>Weather in {country.capital[0]}</h2>
          <p>temperature {weather.temp} Celcius</p>
          <div>
            <img
              src={`${iconBaseUrl}/${weather.icon}@2x.png`}
              alt={weather.description}
            />
          </div>
          <p>wind {weather.wind} m/s</p>
        </section>
      )}
    </>
  );
};
export default WeatherInfo;
