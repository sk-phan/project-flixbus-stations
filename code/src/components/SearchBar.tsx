import { FormEvent, useState } from "react";
import "../styles/SearchBar.css";
import { Place } from "../types";

interface Props {
    searchBusStops: (city: string) => void;
    busStops: Place[];
    viewLocation: (Location : Place) => void;
}

const SearchBar = ({ searchBusStops, busStops, viewLocation }: Props) => {
    const [ searchedCity, setSearchedCity ] = useState("")
    
    const onSubmitCity = (e: FormEvent) => {
        e.preventDefault();
        searchBusStops(searchedCity)
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
                <button type="submit">Search</button>
            </form>

            <ul className="list">
                {
                    busStops.length > 0 &&
                    busStops.map(location => (
                        <li key={location.id} onClick={() => viewLocation(location)}> 
                            <img className="bus-icon" src="/busStop.png" width="50" height="50" alt="bus stop" />
                            <div className="address">
                                <h4>{location.name}</h4>
                                <span>{location.address}, {location.zipcode} {location.city.name}</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SearchBar;