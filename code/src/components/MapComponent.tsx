import { LatLngExpression, Icon, Map } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import "../styles/MapComponent.css";
import { RefObject, useEffect, useRef, useState } from 'react';
import { Place } from '../types';

interface Props {
    currentPosition: [number, number];
    busStops: Place[];
    zoomedLocation: Place;
}

const zoom = 10

const MapComponent = ({ currentPosition, busStops, zoomedLocation } : Props) => {
    const mapRef: RefObject<Map> = useRef(null);

    const customIcon = new Icon({
        iconUrl: "/marker.png",
        iconSize: [41, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40]
    });

    const customBusIcon = new Icon({
        iconUrl: "/busMarker.png",
        iconSize: [41, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40]
    })

    useEffect(() => {
        if (zoomedLocation.id !== "") {
            const map = mapRef.current;
            if (map) {
              const coords: LatLngExpression = [ zoomedLocation.location.lat, zoomedLocation.location.lon ]
              map.setView(coords, 30);
            }
        }
    }, [zoomedLocation])


    return (
        <div className='map-container'>
            <MapContainer  ref={mapRef} style={{ width: "100%", height: "100%" }}  center={zoomedLocation.id !== "" ? [zoomedLocation.location.lat, zoomedLocation.location.lon] : [busStops[0].location.lat, busStops[0].location.lon]} zoom={zoom} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={currentPosition} icon={customIcon}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
            { busStops.length > 0 && busStops.map(bus => (
                <Marker key={bus.id} position={[bus.location.lat, bus.location.lon]} icon={customBusIcon}>
                </Marker>
            ))
            }
            </MapContainer>
        </div>
    )
}

export default MapComponent;