import React, { useState } from 'react';
import './TrackList.css';

import Track from '../Track/Track';

function TrackList(props) {
    const [tagOptions, setTagOptions] = useState([]);

    function createTagOptions(tag) {
        setTagOptions(prevState => [...prevState, tag]);
    };

    function removeOption(tag) {
        return tagOptions.filter(o => o.value !== tag.value);
    };

    function onOptionRemove(e, tag) {
        e.stopPropagation();
        setTagOptions(removeOption(tag));
    };

    return (
        <div className="TrackList">
            <h2>Songs</h2>
            <div className="Tracks">
                {props.tracklist.map((track) => {
                    return <Track track={track}
                            tagOptions={tagOptions}
                            onCreate={createTagOptions}
                            onOptionRemove={onOptionRemove} 
                            key={track.id} 
                            isRemoval={false} />
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