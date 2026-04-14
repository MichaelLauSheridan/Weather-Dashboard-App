function SearchBar({ city, setCity, onSearch }) {
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            onSearch()
        }
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={onSearch}>Search</button>
        </div>
    )
}

export default SearchBar