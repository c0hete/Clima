import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import './index.css';
import 'moment/locale/es';
import { motion } from 'framer-motion';


function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


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
            iconUrl: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`,
            description: capitalizeFirstLetter(item.weather[0].description)
          }));
          setForecast(forecastData);
        })
        .catch((error) => {
          console.error(error.response || error);
        });
    }

    const handleScroll = (e) => {
      if (forecastRef.current) {
        e.preventDefault();  // Previene el comportamiento predeterminado de desplazamiento
        forecastRef.current.scrollLeft += e.deltaY;  
      }
    }

    // Agrega el manejador de eventos al ref del contenedor
    forecastRef.current && forecastRef.current.addEventListener('wheel', handleScroll);

    return () => {
      forecastRef.current && forecastRef.current.removeEventListener('wheel', handleScroll);
    }

}, [city]);

  const scrollLeft = () => {
    forecastRef.current.scrollLeft -= 200;
  };

  const scrollRight = () => {
    forecastRef.current.scrollLeft += 200;
  };

    // Definir las animaciones
    const fadeInUp = {
      initial: {
        y: 20,
        opacity: 0,
        scale: 0.95,
      },
      animate: i => ({
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          delay: i * 0.15
        },
      }),
      exit: {
        opacity: 0,
        scale: 0.9
      },
      whileHover: {
        y: -10,  // Eleva la tarjeta un poco
        scale: 1.05,  // Agranda la tarjeta un poco
        transition: {
          type: 'spring',  // Efecto de resorte para que sea más fluido
          stiffness: 300
        }
      }
    };
  
  return (
    <div className="forecast-wrapper">
<div className="forecast-arrows">
  <button className="forecast-arrow cursor-pointer duration-200 hover:scale-125 active:scale-100" onClick={scrollLeft} title="Scroll Left">
    <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-blue-300">
      <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
    </svg>
  </button>
  <button className="forecast-arrow cursor-pointer duration-200 hover:scale-125 active:scale-100" onClick={scrollRight} title="Scroll Right">
    <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-blue-300" transform="scale(-1, 1)">
      <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
    </svg>
  </button>
</div>

<div className="forecast-container" ref={forecastRef}>
      {forecast.map((day, index) => (
        <motion.div
          key={day.dt_txt}
          className="cardContainerFore"
          variants={fadeInUp}
          custom={index < 6 ? index : 0}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover="whileHover"  // Agregar esto para el efecto al hacer hover
        >
          <div className="cardFore">
            <p className="city">{capitalizeFirstLetter(city)}</p>
<p className="date">{capitalizeFirstLetter(moment(day.dt_txt).format('dddd, D [de] MMMM, H:mm'))}</p>

              <p className="weather">{day.description}</p>
              <img src={day.iconUrl} alt="Weather icon" className="weather" />
              <p className="temp">{day.main.temp}°C</p>
              <div className="minmaxContainer">
                <div className="min">
                  <p className="minHeading">Min</p>
                  <p className="minTemp">{day.main.temp_min}°</p>
                </div>
                <div className="max">
                  <p className="maxHeading">Max</p>
                  <p className="maxTemp">{day.main.temp_max}°</p>
                </div>
              </div>
            </div>
                   </motion.div>
                   ))}
      </div>
    </div>
  );
}

export default Forecast;
