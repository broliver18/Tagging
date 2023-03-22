import React from 'react';
import './NewPlaylist.css';

function NewPlaylist(props) {
    return (
        <div className="NewPlaylist">
            <div className="NewPlaylist-information">
                <h3>New Playlist</h3>
            </div>
            <button className="NewPlaylist-action">+</button>
        </div>
    )
}

export default NewPlaylist;