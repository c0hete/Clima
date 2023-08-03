import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Details from '../details';
import Error from '../error';
import './index.css';
import { capitalizeFirstLetters } from '../../functions/capitalizeFirstLetters';

function CurrentWeather({ city }) {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city) {
      const apiKey = 'bd9dc44134d81a9ff53c6b13a921e023';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

      axios.get(url)
        .then((response) => {
          const iconCode = response.data.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleDateString("es-ES", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          const capitalizedDate = capitalizeFirstLetters(formattedDate); // Aplicamos la función aquí

          setWeather({
            location: response.data.name,
            temperature: response.data.main.temp,
            description: capitalizeFirstLetters(response.data.weather[0].description), // También aquí
            humidity: response.data.main.humidity,
            pressure: response.data.main.pressure,
            windSpeed: response.data.wind.speed,
            iconUrl: iconUrl,
            date: capitalizedDate // Fecha capitalizada
          });
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [city]);

  return (
    <div className="current-weather-container">
      {error ? <Error message={error} /> : (
        <>
          <h1>{weather.location}</h1>
          <p className="weather-date">{weather.date}</p> {/* La fecha ya está en mayúsculas */}
          <img src={weather.iconUrl} alt="" className="weather-icon" />
          <p className="weather-details">{weather.temperature}°C</p>
          <p className="weather-description">{weather.description}</p> {/* La descripción también */}
          <Details 
            humidity={weather.humidity}
            pressure={weather.pressure}
            windSpeed={weather.windSpeed}
          />
        </>
      )}
    </div>
  );
}

export default CurrentWeather;
