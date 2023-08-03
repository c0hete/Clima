import React, { useState, useEffect, useRef } from 'react';
import Search from '../search';
import axios from 'axios';
import moment from 'moment';
import './index.css';

function Forecast({ city, onSearch }) {
  const [forecast, setForecast] = useState([]);
  const forecastRef = useRef(null);

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
    forecastRef.current.scrollLeft -= 200;
  };

  const scrollRight = () => {
    forecastRef.current.scrollLeft += 200;
  };

  return (
    <div className="forecast-wrapper">
      <div className="forecast-arrows">
        <button className="forecast-arrow" onClick={scrollLeft}>←</button>
        <Search onSearch={onSearch} />
        <button className="forecast-arrow" onClick={scrollRight}>→</button>
      </div>
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
    </div>
  );
}

export default Forecast;
