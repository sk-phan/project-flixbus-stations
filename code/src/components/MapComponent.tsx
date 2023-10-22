import { LatLngExpression, Icon, Map } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Tooltip  } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import "../styles/MapComponent.css";
import { RefObject, useEffect, useRef,  } from 'react';
import { Place } from '../types';
import L from 'leaflet';

interface Props {
    currentPosition: [number, number];
    busStops: Place[];
    zoomedLocation: Place;
}

const zoom = 13

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
        const map = mapRef.current;
        if (zoomedLocation.id !== "") {
            if (map) {
                const coords: LatLngExpression = [ zoomedLocation.location.lat, zoomedLocation.location.lon ]
                const current: LatLngExpression = [60.1699, 24.9384]
                map.setView(coords, 30);

                const bounds = L.latLngBounds([
                    [zoomedLocation.location.lat, zoomedLocation.location.lon],
                    currentPosition
                ]);
        
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
        else {
           setBounds()
        }
    }, [zoomedLocation])

    useEffect(() => {
        setBounds()
    }, [busStops, currentPosition])


    const setBounds = () => {
        const map = mapRef.current;

        if (map) {

            if (busStops.length > 0) {
                const latitudes = busStops.map((bus) => bus.location.lat);
                const longitudes = busStops.map((bus) => bus.location.lon);
          
                const minLat = Math.min(...latitudes);
                const maxLat = Math.max(...latitudes);
                const minLon = Math.min(...longitudes);
                const maxLon = Math.max(...longitudes);
    
                const bound = L.latLngBounds([
                    [minLat, minLon],
                    [maxLat, maxLon],
                  ]);
    
                map.fitBounds(bound, { padding: [50, 50] });
            }
        }
    }

    return (
        <div className='map-container'>
            <MapContainer ref={mapRef} style={{ width: "100%", height: "100%" }}  center={[busStops[0].location.lat, busStops[0].location.lon]} zoom={zoom} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={currentPosition} icon={customIcon}>
            <Tooltip direction="bottom" offset={[0, 0]} opacity={1} permanent>
                You're here
            </Tooltip>
            </Marker>
            { busStops.length > 0 && busStops.map(bus => (
                <Marker key={bus.id} position={[bus.location.lat, bus.location.lon]} icon={customBusIcon}>
                    <Tooltip direction="bottom" offset={[0, 0]} opacity={1} permanent>
                        {bus.name}
                    </Tooltip>
                    <Popup>
                        { bus.address }, { bus.zipcode } {bus.city.name}
                    </Popup>
                </Marker>
            ))
            }
            </MapContainer>
        </div>
    )
}

export default MapComponent;