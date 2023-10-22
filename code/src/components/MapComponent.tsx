import { Icon, LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/MapComponent.css";
import { useEffect } from 'react';
import { Place } from '../types';
import L from 'leaflet';

interface Props {
    currentPosition: [number, number];
    busStops: Place[];
    zoomedLocation: Place;
    loading: boolean;
}

const zoom = 13;

const MapComponent = ({ currentPosition, busStops, zoomedLocation, loading }: Props) => {
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
    });

    useEffect(() => {
        console.log("Map Component Mounted");
    }, []);

    const MapComponentView = () => {
        const map = useMap();

        useEffect(() => {
            if (zoomedLocation.id !== "") {
                const coords: LatLngExpression = [zoomedLocation.location.lat, zoomedLocation.location.lon];

                map.setView(coords, 20);

                const zoomedLocationBounds = L.latLngBounds([
                    [zoomedLocation.location.lat, zoomedLocation.location.lon],
                ]);
                const currentPositionBounds = L.latLngBounds([currentPosition]);

                const combinedBounds = zoomedLocationBounds.extend(currentPositionBounds);

                map.fitBounds(combinedBounds, { padding: [50, 50] });
            } 
            else {
                setBounds(map);
            }
        }, [zoomedLocation, busStops, currentPosition]);


        const setBounds = (mapInstance: L.Map) => {
            if (busStops.length > 0) {
                const latitudes = busStops.map((bus) => bus.location.lat);
                const longitudes = busStops.map((bus) => bus.location.lon);

                const minLat = Math.min(...latitudes, currentPosition[0]);
                const maxLat = Math.max(...latitudes, currentPosition[0]);
                const minLon = Math.min(...longitudes, currentPosition[1]);
                const maxLon = Math.max(...longitudes, currentPosition[1]);

                const bound = L.latLngBounds([
                    [minLat, minLon],
                    [maxLat, maxLon],
                ]);
                mapInstance.fitBounds(bound, { padding: [50, 50] });
            }
            else if (busStops.length === 0) {

                if ( JSON.stringify(currentPosition) === "[0,0]") {
                    map.fitBounds([[-90,180], [90,-180]], { padding: [50, 50] });
                }
                else {
                    const bound = L.latLngBounds([
                        currentPosition,
                      ]);
            
                    map.fitBounds(bound, { padding: [50, 50] });
                    map.setView(currentPosition, 30);
                }
            }
        };

        return null; 
    };

    return (
        <div className='map-container'>
            <MapContainer style={{ width: "100%", height: "100%" }} center={[60.1699, 24.9384]} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {JSON.stringify(currentPosition) !== "[0,0]" && <Marker position={currentPosition} icon={customIcon}>
                    <Tooltip direction="bottom" offset={[0, 0]} opacity={1} permanent>
                        You're here
                    </Tooltip>
                </Marker>}
                {busStops.length > 0 &&
                    busStops.map((bus) => (
                        <Marker key={bus.id} position={[bus.location.lat, bus.location.lon]} icon={customBusIcon}>
                            <Tooltip direction="bottom" offset={[0, 0]} opacity={1} permanent>
                                {bus.name}
                            </Tooltip>
                            <Popup>
                                {bus.address}, {bus.zipcode} {bus.city.name}
                            </Popup>
                        </Marker>
                    ))}
                <MapComponentView />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
