import React, { useState } from 'react';
import './Playlist.css';

function Playlist(props) {
    const [isSelected, setIsSelected] = useState(false);

    function toggleSelect() {
        setIsSelected(true);
        setTimeout(() => {
            setIsSelected(false);
        }, 500)
    };

    function renderAction() {
        if (props.isAddition) {
            if (isSelected) {
                return <button className="no-hover">&#10003;</button>
            } else {
            return <button className="Add-button" onClick={toggleSelect}>+</button>
            }
        };
    };

    function selectPlaylist() {
        if (!props.isAddition) props.onSelect(props.playlist);
    };

    return (
        <div className="Playlist">
            <div className={props.isAddition ? "Playlist-to-add" : "Playlist-information"}>
                <h3 onClick={selectPlaylist}>{props.playlist.name}</h3>
            </div>
            {renderAction()}
        </div>
    )
}

export default Playlist