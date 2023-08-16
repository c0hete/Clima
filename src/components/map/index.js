import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet';
import './index.css'; // Ajusta la ruta si es necesario
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



function Map({ center, markerPosition, markerText, onMapClick, whenReady }) {
  return (
    <div className="map-container">
      <MapContainer 
        center={center} 
        zoom={8} 
        style={{ width: '100%', height: '300px' }}
        whenReady={whenReady}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickHandler onClick={onMapClick} />
        { markerPosition && <Marker position={markerPosition}>
          <Popup>{markerText}</Popup>
        </Marker> }
      </MapContainer>
    </div>
  );
}

function ClickHandler({ onClick }) {
  const map = useMapEvents({
    click: (e) => {
      if (onClick) onClick(e.latlng);
    },
  });

  return null;
}

export default Map;
