
import { useEffect, useState } from 'react';
import MapComponent from '../components/MapComponent';
import SearchBar from '../components/SearchBar';
import '../styles/MapView.css';
import axios from 'axios';
import { Place } from '../types';
import BusLoader from '../components/BusLoader';

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
    const [busStops, setBusStops] = useState<Place[]>([]);
    const [loading, setLoading] = useState(false);
    const [zoomedLocation, setZoomedLocation] = useState<Place>(busStopTemplate);

    useEffect(() => {
        
        const getCurrentPosition = async () => {
            
          try {
            setLoading(true)

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude
    
                    const response = await axios.get<GeocodeResponse>('https://maps.googleapis.com/maps/api/geocode/json', {
                        params: {
                          latlng: `${latitude}, ${longitude}` ,
                          key: process.env.REACT_APP_GOOGLE_KEY,
                        },
                      });           
                      
                      if (response.data && response.data.results.length > 0) {

                          const cityName = response.data.results[0].address_components[2].long_name;
                          fetchLocations(cityName.toLowerCase())
                      }
    
                    setCurrentPosition([ latitude, longitude ])
                    setLoading(false)
                  },
                  (error) => {
                    console.error(error.message);
                    fetchLocations("helsinki")
                }
                );
    
              } else {
                alert("Geolocation is not supported by this browser.");
                setLoading(false)
              }
          }
          catch(e) {
            setLoading(false)
          }
        }

        getCurrentPosition()
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    const fetchLocations = async(cityName: string) => {
      console.log(cityName)
        const options = {
            method: 'GET',
            url: 'https://flixbus2.p.rapidapi.com/autocomplete',
            params: {query: cityName},
            headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_KEY,
            'X-RapidAPI-Host': 'flixbus2.p.rapidapi.com'
            }
        };

        try {     
          const response = await axios.request(options);
          console.log(response)
            const matchingCities = response.data.filter((item: Place) => item.city.name.toLowerCase() === cityName)
            setBusStops(matchingCities)
        } catch (error) {
            console.error(error);
            alert("Oopps! Something went wrong. Please try again!")
        }
        finally {
          setLoading(false)
        }
    }

    const searchBusStops = (cityName: string) => {
      setLoading(true) 

      setTimeout(() => console.log(loading), 1000)

      const lowerCaseCity = cityName.toLowerCase()
      fetchLocations(lowerCaseCity)
      
    }

    const viewLocation = (location: Place) => {
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
                loading = {loading}
                />
            {
                loading ? 
                <BusLoader />
                :
                <MapComponent 
                currentPosition = {currentPosition}
                busStops = { busStops }
                zoomedLocation = { zoomedLocation }
                loading = {loading}
                />
            }
        </div>
    
    )
}

export default MapView;