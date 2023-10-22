
import { useEffect, useState } from 'react';
import MapComponent from '../components/MapComponent';
import SearchBar from '../components/SearchBar';
import '../styles/MapView.css';
import axios from 'axios';
import { Place } from '../types';

interface GeocodeResponse {
    results: {
      address_components: {
        long_name: string;
        short_name: string;
        types: string[];
      }[];
    }[];
    status: string;
  }

const busStopTemplate ={
    zipcode: "",
    score: 0,
    country: { code: "", name: "" },
    address: "",
    city: { name: "", legacy_id: 0, id: "", slug: "" },
    name: "",
    legacy_id: 0,
    location: { lat: 0, lon: 0 },
    id: "",
    importance_order: 0,
    slug: "",
  };
  
const MapView = () => {

    const [currentPosition, setCurrentPosition] = useState<[number, number]>([0,0]);
    const [busStops, setBusStops] = useState<Place[]>([
        {
          "zipcode": "00101",
          "score": 19.206926,
          "country": {
            "code": "fi",
            "name": "Finland"
          },
          "address": "Urho Kekkosen katu 1",
          "city": {
            "name": "Helsinki",
            "legacy_id": 59991,
            "id": "f074ccfa-b588-45d2-a838-cf2a30cf3597",
            "slug": "helsinki"
          },
          "name": "Helsinki Bus Station (Kamppi)",
          "legacy_id": 101553,
          "location": {
            "lon": 24.933535,
            "lat": 60.169405
          },
          "id": "9b6b38dd-3ecb-11ea-8017-02437075395e",
          "importance_order": 0,
          "slug": "helsinki-bus-station-kamppi"
        },
        {
          "zipcode": "220",
          "score": 15.4288025,
          "country": {
            "code": "fi",
            "name": "Finland"
          },
          "address": "Tyynenmerenkatu 14",
          "city": {
            "name": "Helsinki",
            "legacy_id": 59991,
            "id": "f074ccfa-b588-45d2-a838-cf2a30cf3597",
            "slug": "helsinki"
          },
          "name": "Helsinki Terminal 2",
          "legacy_id": 99193,
          "location": {
            "lon": 24.91488572083544,
            "lat": 60.150021645355416
          },
          "id": "f11061e0-b4b4-4a2c-8337-519d3eeca976",
          "importance_order": 0,
          "slug": "helsinki-terminal-2"
        }
      ]);
    const [city, setCity] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [zoomedLocation, setZoomedLocation] = useState<Place>(busStopTemplate);

    useEffect(() => {
        
        // const getCurrentPosition = async () => {
            
        //     setLoading(true)

        //     if (navigator.geolocation) {
        //         navigator.geolocation.getCurrentPosition(async (position) => {
        //             const latitude = position.coords.latitude;
        //             const longitude = position.coords.longitude
    
        //             const response = await axios.get<GeocodeResponse>('https://maps.googleapis.com/maps/api/geocode/json', {
        //                 params: {
        //                   latlng: `${currentPosition[0]}, ${currentPosition[1]}` ,
        //                   key: "AIzaSyCSVYmoBS5Pe_a_HCIgUVj25tCRFO_hnBI",
        //                 },
        //               });           
                      
        //               if (response.data && response.data.results.length > 0) {
        //                 const cityName = response.data.results[0].address_components[2].long_name;
                            fetchLocations(city)
        //                   setCity(cityName)
        //                   // const response = await axios.request(options);

        //               }
    
        //             setCurrentPosition([ latitude, longitude ])
        //             setLoading(false)
        //         });
    
        //       } else {
        //         alert("Geolocation is not supported by this browser.");
        //         setLoading(false)
        //       }
        // }

        // getCurrentPosition()
    }, [])

    const fetchLocations = async(cityName: string) => {
        const options = {
            method: 'GET',
            url: 'https://flixbus2.p.rapidapi.com/autocomplete',
            params: {query: cityName},
            headers: {
            'X-RapidAPI-Key': '7df617f766msh5869de7f40e70cap1f8f50jsnd1ba6a221d9e',
            'X-RapidAPI-Host': 'flixbus2.p.rapidapi.com'
            }
        };

        try {     
            // const response = await axios.request(options);
            // console.log(response.data);
            //setBusStops(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    const searchBusStops = (cityName: string) => {
        const lowerCaseCity = cityName.toLowerCase()
        fetchLocations(lowerCaseCity)
    }

    const viewLocation = (location: Place) => {
        console.log(location)
        setZoomedLocation(location)
    }

    const reset = () => {
      setZoomedLocation(busStopTemplate)
    }

    return (
        <div className="map-view-container">
            <SearchBar 
                searchBusStops={searchBusStops}
                busStops = { busStops }
                viewLocation={ viewLocation }
                reset = {reset}
                />
            {
                loading ? <p>Loading</p>
                :
                <MapComponent 
                currentPosition = {currentPosition}
                busStops = { busStops }
                zoomedLocation = { zoomedLocation }
                />
            }
        </div>
    
    )
}

export default MapView;