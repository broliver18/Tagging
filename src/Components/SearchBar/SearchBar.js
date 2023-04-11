import React from 'react';
import './SearchBar.css';

function SearchBar(props) {
    return(
        <div className="SearchBar">
            <input 
            value={props.searchTerm}
            onChange={props.onSearch}
            placeholder="Enter a Song, Artist, Album or Tag" />
            <button className="SearchButton">SEARCH</button>
        </div>
    )
}

export default SearchBar;