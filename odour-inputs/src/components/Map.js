import React, { useEffect, useRef, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";

const customIcon = new L.Icon({
  iconUrl: "./images/marker.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

const Maps = () => {
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [mapZoom, setMapZoom] = useState(13);

  const apiKey = "psrDQYg6YQYVbTFu6m8pwUlmvXe0KK5gQ1USHg-_vpI";
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMarkerClick = (marker) => {
    console.log("Clicked marker:", marker);

    const popupContent = `<b>${marker.popupText}</b><br>: ${marker.lat}<br>: ${marker.lng}`;

    marker.bindPopup(popupContent).openPopup();
    setSelectedMarker(marker);
  };

  const addMarker = useCallback(
    (lat, lng) => {
      const newMarker = { lat, lng, popupText: `Marker ${markers.length + 1}` };
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    },
    [markers]
  );

  useEffect(() => {
    let map = null;

    if (mapRef.current) {
      map = mapRef.current.leafletElement;

      const hereTileUrl = `https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/reduced.day/{z}/{x}/{y}/256/png8?apiKey=${apiKey}`;
      L.tileLayer(hereTileUrl, {
        attribution: "&copy; HERE",
      }).addTo(map);

      map.on("moveend", () => {
        setMapCenter([map.getCenter().lat, map.getCenter().lng]);
        setMapZoom(map.getZoom());
      });

      map.once("load", () => {
        console.log("Map loaded");
        map.on("click", (e) => {
          console.log("Click event:", e.latlng);
          addMarker(e.latlng.lat, e.latlng.lng);
        });
      });

      const handleLocationFound = (e) => {
        console.log("Location found:", e.latlng);
        setMapCenter([e.latlng.lat, e.latlng.lng]);
        setMapZoom(map.getZoom());
      };
      map.locate();
      map.on("locationfound", handleLocationFound);

      return () => {
        map.off("moveend");
        map.off("click");
        map.off("locationfound", handleLocationFound);
        map.remove();
      };
    }
  }, [addMarker, apiKey]);

  const mapStyle = {
    width: "100%",
    height: "400px",
    pointerEvents: isDragging ? "none" : "auto",
  };

  return (
    <div>
      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={mapZoom}
        style={mapStyle}
        onViewportChange={(viewport) => {
          setMapCenter([viewport.center.lat, viewport.center.lng]);
          setMapZoom(viewport.zoom);
        }}
        ondragstart={() => setIsDragging(true)}
        ondragend={() => setIsDragging(false)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            icon={customIcon}
            onClick={() => handleMarkerClick(marker)}
          >
            <Popup>{marker.popupText}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedMarker && (
        <div>
          <h3>I'm Marker:</h3>
          <p>{selectedMarker.popupText}</p>
        </div>
      )}
    </div>
  );
};

export default Maps;
