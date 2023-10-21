import React, { useRef, RefObject } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression, Map } from 'leaflet';

const defaultCenter: LatLngExpression = [38.9072, -77.0369];
const defaultZoom = 8;
const disneyWorldLatLng: LatLngExpression = [28.3852, -81.5639];
const disneyLandLatLng: LatLngExpression = [33.8121, -117.9190];

function MapP() {
  const mapRef: RefObject<Map> = useRef(null);

  /**
   * handleOnSetView
   */
  function handleOnSetView() {
    const map = mapRef.current;
    if (map) {
      map.setView(disneyWorldLatLng, 14);
    }
  }


  function handleOnFlyTo() {
    const map = mapRef.current;
    if (map) {
      map.flyTo(disneyLandLatLng, 14, {
        duration: 2,
      });
    }
  }

  return (
    <div className="App" style={{ display: "flex" }}>
        <div className="sidebar">
        <h2>Disney World</h2>
        <p>Bay Lake, FL</p>
        <ul>
          <li>Lat: 28.3852</li>
          <li>Long: -81.5639</li>
        </ul>
        <p>
          <button onClick={handleOnSetView}>Set View to Disney World</button>
        </p>
        <h2>Disneyland</h2>
        <p>Anaheim, CA</p>
        <ul>
          <li>Lat: 33.8121</li>
          <li>Long: -117.9190</li>
        </ul>
        <p>
          <button onClick={handleOnFlyTo}>Fly to Disneyland</button>
        </p>
      </div>
      <MapContainer ref={mapRef} style={{ height: "100vh", width: "400px" }} center={defaultCenter} zoom={defaultZoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
      </MapContainer>
      
    </div>
  );
}

export default MapP;
