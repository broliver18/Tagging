import React, { useState } from 'react';
import './NewPlaylist.css';

function NewPlaylist(props) {
    const [isSelected, setIsSelected] = useState(false);

    function toggleSelect() {
        setIsSelected(true);
        setTimeout(() => {
            setIsSelected(false);
        }, 500)
    };

    function renderAction() {
        if (isSelected) {
            return <button className="No-hover">&#10003;</button>
        } else {
            return <button className="Add-button" onClick={toggleSelect}>+</button>
        };
    };

    return (
        <div className="NewPlaylist">
            <div className="NewPlaylist-information">
                <h3>New Playlist</h3>
            </div>
            {renderAction()}
        </div>
    )
}

export default NewPlaylist;