import { LatLngExpression, Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import "../styles/MapComponent.css";

const MapComponent = () => {
    const position: LatLngExpression = [51.505, -0.09]
    const customIcon = new Icon({
        iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40]
    });

    return (
        <div className='map-container'>
             <MapContainer  style={{ width: "100%", height: "100%" }}  center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
            </MapContainer>
        </div>
    )
}

export default MapComponent;