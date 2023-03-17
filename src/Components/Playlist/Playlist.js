import React from 'react';
import './Playlist.css';

function Playlist(props) {
    return (
        <h2>{props.playlist.name}</h2>
    )
}

export default Playlist