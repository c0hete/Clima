import React, { useState, useEffect, useRef } from 'react'; // Importa useRef
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';
import './index.css';

function Forecast({ city }) {
  const [forecast, setForecast] = useState([]);
  const forecastRef = useRef(null); // Referencia para el contenedor del carrusel

  useEffect(() => {
    moment.locale('es');

    if (city) {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=bd9dc44134d81a9ff53c6b13a921e023&units=metric&lang=es`)
        .then((response) => {
          const forecastData = response.data.list.map(item => ({
            ...item,
            iconUrl: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`
          }));
          setForecast(forecastData);
        })
        .catch((error) => {
          console.error(error.response || error);
        });
    }
  }, [city]);

  const scrollLeft = () => {
    forecastRef.current.scrollLeft -= 200; // Ajusta según el tamaño de tus tarjetas
  };

  const scrollRight = () => {
    forecastRef.current.scrollLeft += 200; // Ajusta según el tamaño de tus tarjetas
  };

  return (
    <div>
      <button onClick={scrollLeft}>←</button>
      <div className="forecast-container" ref={forecastRef}>
        {forecast.map((day) => (
          <div key={day.dt_txt} className="forecast-card">
            <h3>{moment(day.dt_txt).format('dddd, D [de] MMMM [de] YYYY, H:mm')}</h3>
            <img src={day.iconUrl} alt="" />
            <p>{day.main.temp}°C</p>
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
      <button onClick={scrollRight}>→</button>
    </div>
  );
}

export default Forecast;
