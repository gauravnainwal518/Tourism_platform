//future use
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const UpdateMarkers = ({ places }) => {
  const map = useMap();
  const markersLayer = useRef(L.layerGroup().addTo(map));

  useEffect(() => {
    markersLayer.current.clearLayers();

    if (places.length === 0) return;

    const bounds = [];

    places.forEach((p) => {
      const lat = p.geometry.coordinates[1];
      const lon = p.geometry.coordinates[0];
      const name = p.properties.name || "Unnamed Place";
      const kinds = p.properties.kinds || "General";

      const marker = L.marker([lat, lon], { icon: markerIcon }).bindPopup(
        `<b>${name}</b><br>${kinds}`
      );

      markersLayer.current.addLayer(marker);
      bounds.push([lat, lon]);
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [places, map]);

  return null;
};

const MapComponent = ({ center = [30.3165, 78.0322], places = [] }) => {
  return (
    <div
      style={{ height: "500px", width: "100%" }}
      className="rounded-lg shadow-lg"
    >
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UpdateMarkers places={places} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
