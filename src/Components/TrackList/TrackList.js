import React from 'react';
import './TrackList.css';

import Track from '../Track/Track';

function TrackList(props) {
    return (
        <div className="TrackList">
            <h2>Songs</h2>
            <div className="Tracks">
                {props.tracklist.map((track) => {
                    return <Track track={track} 
                            key={track.key} />
                })}
            </div>
            <div className="buttons">
                <button className="select-button">Select All</button>
                <button className="delete-button">Delete From Playlist</button>
            </div>
        </div>
    )
}

export default TrackList;