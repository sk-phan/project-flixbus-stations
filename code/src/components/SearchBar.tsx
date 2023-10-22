import { FormEvent, useState } from "react";
import "../styles/SearchBar.css";
import { Place } from "../types";

interface Props {
    searchBusStops: (city: string) => void;
    busStops: Place[];
    viewLocation: (Location : Place) => void;
    reset: () => void;
    loading: boolean;
}

const SearchBar = ({ searchBusStops, busStops, viewLocation, reset, loading }: Props) => {
    const [ searchedCity, setSearchedCity ] = useState("")
    const [ selectedCard, setSelectedCard ] = useState("")

    
    const onSubmitCity = (e: FormEvent) => {
        e.preventDefault();
        searchBusStops(searchedCity)
    }

    const selectCard = (location: Place) => {
        if (location.id === selectedCard) {
            setSelectedCard("")
            reset()
        }
        else {
            setSelectedCard(location.id)
            viewLocation(location)
        }
    }
     

    return (
        <div className="map-side-container">
            <form onSubmit={onSubmitCity} className="form">
                <input 
                className="search-input"
                placeholder="Search city"
                type="text"
                value={searchedCity} 
                onChange={e => setSearchedCity(e.target.value)}/>
                {
                    loading 
                    ?   <button className="login-button dark-bg">
                        <div className="loader"></div>
                        </button>
                    :   <button type="submit">Search</button>
                }
            </form>

            <ul className="list">
                {
                    busStops.length > 0 ?
                        busStops.map(location => (
                            <li key={location.id} onClick={() => selectCard(location)} style={{ backgroundColor: selectedCard === location.id ? "#eee" : "#fff" }}> 
                                <img className="bus-icon" src="/busStop.png" width="50" height="50" alt="bus stop" />
                                <div className="address">
                                    <h4>{location.name}</h4>
                                    <span>{location.address}, {location.zipcode} {location.city.name}</span>
                                </div>
                            </li>
                        ))
                    : <p>No bus stop found</p>
                }
            </ul>

            <div className="copyright">
                <span>All rights reserved by FlixBus & RapidAPI</span>
            </div>
        </div>
    )
}

export default SearchBar;