import React from 'react';
import './index.css';



function Details({ humidity, pressure, windSpeed, windDirection }) {

  return (
      <div className="details">
        <div className="details-item humidity">
            <h1 className="details-title">Humedad</h1>
            <p>{humidity}%</p>
            <div className="humidity-bar">
                <div className="humidity-fill" style={{width: `${humidity}%`}}></div>
            </div>
        </div>

        <div className="details-item pressure">
    <h1 className="details-title">Presión</h1>
    <p>{pressure} hPa</p>
    <div className="pressure-bar">
        <div className="pressure-marker" style={{left: `${((pressure - 950) / 100) * 100}%`}}></div>
    </div>
</div>


<div className="details-item wind-speed">
                <h1 className="details-title">Velocidad del Viento</h1>
                <p>{windSpeed} m/s</p>

                <div className="wind-speed-bar">
    <div className="wind-speed-fill" style={{ '--wind-speed': windSpeed }}></div>
    <div className="direction-arrow" style={{ transform: `rotate(${windDirection}deg)` }}></div>

    <div className="wind-gust"></div>
</div>


                <div className="wind-gust"></div>
            </div>
        </div>
    );
}

export default Details;
