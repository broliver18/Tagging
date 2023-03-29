import React from 'react';
import './TrackList.css';

import Track from '../Track/Track';

function TrackList(props) {
    return (
        <div className="TrackList">
            <h2>Songs</h2>
            {props.tracklist.map((track) => {
                return <Track track={track} 
                        key={track.key} />
            })}
        </div>
    )
}

export default TrackList;