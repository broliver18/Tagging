import React from 'react';
import './Playlist.css';

function Playlist(props) {
    function renderAction() {
        if (props.isAddition) {
            return <button className="Playlist-action">+</button>
        }
    }

    return (
        <div className="Playlist">
            <div className={props.isAddition ? "Playlist-to-add" : "Playlist-information"}>
                <h3>{props.playlist.name}</h3>
            </div>
            {renderAction()}
        </div>
    )
}

export default Playlist