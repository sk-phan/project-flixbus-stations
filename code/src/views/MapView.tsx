
import { useEffect, useState } from 'react';
import MapComponent from '../components/MapComponent';
import SearchBar from '../components/SearchBar';
import '../styles/MapView.css';

const MapView = () => {

    const [currentPosition, setCurrentPosition] = useState<[number, number]>([0,0]);
    const [loading, setLoading] = useState(true)
   
    useEffect(() => {
        setLoading(true)

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude
                setCurrentPosition([ latitude, longitude ])
                setLoading(false)
            });

          } else {
            alert("Geolocation is not supported by this browser.");
            setLoading(false)
          }
    }, [])

    return (
        <div className="map-view-container">
            <SearchBar />
            {
                loading ? <p>Loading</p>
                :
                <MapComponent currentPosition = {currentPosition}/>
            }
        </div>
    
    )
}

export default MapView;