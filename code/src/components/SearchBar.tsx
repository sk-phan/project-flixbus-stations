import "../styles/SearchBar.css"

const SearchBar = () => {
    return (
        <div className="search-container">
            <input 
            className="search-input"
            placeholder="Search city"
            type="text" />
        </div>
    )
}

export default SearchBar;