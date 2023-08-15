import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet';

function Map({ center, markerPosition, markerText, onMapClick, whenReady }) {
  return (
    <div className="map-wrap">
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
