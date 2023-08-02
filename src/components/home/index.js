import React, { useState, useEffect } from 'react';
import CurrentWeather from '../weather';
import Forecast from '../forecast';
import Search from '../search';
import axios from 'axios';

function Home() {
  const [city, setCity] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiKey = 'bd9dc44134d81a9ff53c6b13a921e023';
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=es`;

      try {
        const response = await axios.get(url);
        setCity(response.data.name);
      } catch (error) {
        console.error(error);
      }
    }, error => {
      console.error(error);
    });
  }, []);

  return (
    <div>
      <Search onSearch={setCity} />
      <CurrentWeather city={city} />
      <Forecast city={city} />
    </div>
  );
}

export default Home;