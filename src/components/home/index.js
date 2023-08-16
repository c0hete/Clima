import Search from '../search';
import React, { useState, useEffect } from 'react';
import CurrentWeather from '../weather';
import Details from '../details';
import Forecast from '../forecast';
import Social from '../social';
import Map from '../map';
import axios from 'axios';
import { CircleLoader } from "react-spinners"; 
import { motion } from 'framer-motion';
import './index.css';


function Home() {
  const [city, setCity] = useState('');
  const [hasGeoPermission, setHasGeoPermission] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [windDirection, setWindDirection] = useState(0);
  const [center, setCenter] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapReady, setMapReady] = useState(false);



  const fetchWeatherData = async (url) => {
    try {
        const response = await axios.get(url);
        setCity(response.data.name);
        setHumidity(response.data.main.humidity);
        setPressure(response.data.main.pressure);
        setWindSpeed(response.data.wind.speed);
        setWindDirection(response.data.wind.deg);

        // Extraer latitud y longitud de la respuesta
        const latitude = response.data.coord.lat;
        const longitude = response.data.coord.lon;

        // Actualizar el marcador y el centro del mapa
        setMarkerPosition([latitude, longitude]);
        setCenter([latitude, longitude]);
    } catch (error) {
        console.error(error);
    }
}

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCenter([latitude, longitude]);
      setMarkerPosition([latitude, longitude]);
  
      const apiKey = 'bd9dc44134d81a9ff53c6b13a921e023';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=es`;
      fetchWeatherData(url);
    }, error => {
      console.error(error);
      setHasGeoPermission(false);
      // En caso de error, puedes definir unas coordenadas por defecto:
      setCenter([-38.7318286, -72.6141467]);
      setMarkerPosition([-38.7318286, -72.6141467]);
    });
  }, []);
  const getWeatherForLocation = async (latitude, longitude) => {
    const apiKey = 'bd9dc44134d81a9ff53c6b13a921e023';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=es`;
    fetchWeatherData(url);
  }
  const handleMapClick = (latlng) => {
    setMarkerPosition([latlng.lat, latlng.lng]);
    getWeatherForLocation(latlng.lat, latlng.lng);
  }


  const handleCitySearch = (cityName) => {
    const apiKey = 'bd9dc44134d81a9ff53c6b13a921e023';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`;
    fetchWeatherData(url);
  }

  return (
    <div className="home-container">
      {!city && !hasGeoPermission && (
        <div className="initial-prompt">
          <div className="spinner-container">
            <CircleLoader color="#ffff" />
          </div>
          <Search onSearch={handleCitySearch} />
        </div>
      )}

      {city && (
        <>
          <div className="search-container">
            <Search onSearch={handleCitySearch} />
            <Social />
          </div>
          <div className="details-container">
            <Details 
              humidity={humidity}
              pressure={pressure}
              windSpeed={windSpeed}
              windDirection={windDirection}
            />
          </div> 
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <CurrentWeather city={city} />
          </motion.div>
          {center && (
      <Map 
        center={center}
        markerPosition={markerPosition}
        markerText={city}
        onMapClick={handleMapClick}
        whenReady={() => setMapReady(true)}
      />
          )}
          <div className="forecast-container">
            <Forecast city={city} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
