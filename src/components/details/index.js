function Details({ humidity, pressure, windSpeed }) {
  return (
    <div>
      <p>Humedad: {humidity}%</p>
      <p>Presión: {pressure} hPa</p>
      <p>Velocidad del viento: {windSpeed} m/s</p> {/* Cambia la unidad si es necesario */}
    </div>
  );
}

export default Details;
