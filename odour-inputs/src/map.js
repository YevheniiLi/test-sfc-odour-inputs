import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

function SetViewOnClick({ animateRef }) {
  const map = useMapEvents('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
}

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [isLocating, setIsLocating] = useState(false); // Добавляем состояние для отслеживания поиска местоположения
  const map = useMapEvents({
    click() {
      if (!isLocating) { // Добавляем проверку, чтобы предотвратить многократные вызовы map.locate()
        setIsLocating(true);
        map.locate();
      }
    },
    locationfound(e) {
      setPosition(e.latlng);
      setIsLocating(false); // Устанавливаем состояние isLocating в false, когда местоположение найдено
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const Map = () => {
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [mapZoom, setMapZoom] = useState(13);
  const apiKey = 'psrDQYg6YQYVbTFu6m8pwUlmvXe0KK5gQ1USHg-_vpI';
  const [markers, setMarkers] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const addMarker = (lat, lng) => {
    setMarkers((prevMarkers) => [...prevMarkers, { lat, lng }]);
  };

  useEffect(() => {
    let map = null;

    if (mapRef.current) {
      map = mapRef.current.leafletElement;

      const hereTileUrl = `https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/reduced.day/{z}/{x}/{y}/256/png8?apiKey=${apiKey}`;
      L.tileLayer(hereTileUrl, {
        attribution: '&copy; HERE',
      }).addTo(map);

      map.on('moveend', () => {
        setMapCenter([map.getCenter().lat, map.getCenter().lng]);
        setMapZoom(map.getZoom());
      });

      map.once('load', () => {
        map.on('click', (e) => {
          addMarker(e.latlng.lat, e.latlng.lng);
        });
      });
    }

    return () => {
      if (map) {
        map.off('moveend');
        map.off('click');
        map.remove();
      }
    };
  }, [apiKey, mapCenter, mapZoom]);

  const mapStyle = {
    width: '100%',
    height: '80vh',
    pointerEvents: isDragging ? 'none' : 'auto',
  };

  const animateRef = useRef(false);

  return (
    <div>
      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={mapZoom}
        style={mapStyle}
        ondragstart={() => setIsDragging(true)}
        ondragend={() => setIsDragging(false)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup>Hello, this is a custom popup for marker {index + 1}!</Popup>
          </Marker>
        ))}
        <SetViewOnClick animateRef={animateRef} />
        <LocationMarker />
      </MapContainer>
      <p>
        <label>
          <input
            type="checkbox"
            onChange={() => {
              animateRef.current = !animateRef.current;
            }}
          />
          Animate panning
        </label>
      </p>
    </div>
  );
};

export default Map;
