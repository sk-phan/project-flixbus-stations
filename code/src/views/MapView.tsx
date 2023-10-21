
import MapComponent from '../components/MapComponent';
import SearchBar from '../components/SearchBar';
import '../styles/MapView.css';

const MapView = () => {
   

    return (
        <div className="map-view-container">
            <SearchBar />
            <MapComponent/>
        </div>
    
    )
}

export default MapView;