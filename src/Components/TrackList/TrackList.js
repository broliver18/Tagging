import React, { useState } from 'react';
import './TrackList.css';

import Track from '../Track/Track';

function TrackList(props) {
    const [tagOptions, setTagOptions] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    function createTagOptions(tag) {
        if (!tagOptions.some(option => option.value.toLowerCase() === tag.value.toLowerCase()))
        setTagOptions(prevState => [...prevState, tag]);
    };

    function removeOption(tag) {
        return tagOptions.filter(o => o.value !== tag.value);
    };

    function onOptionRemove(e, tag) {
        e.stopPropagation();
        setTagOptions(removeOption(tag));
    };

    function toggleSelect() {
        setSelectAll(!selectAll);
    }

    return (
        <div className="TrackList">
            <h2>Songs</h2>
            <div className="Tracks">
                {props.trackList.map((track) => {
                    return <Track track={track}
                            key={track.id}
                            tagOptions={tagOptions}
                            onCreate={createTagOptions}
                            onOptionRemove={onOptionRemove} 
                            addTag={props.addTag}
                            removeTag={props.removeTag}
                            selectTrack={props.selectTrack}
                            selectAll={selectAll}
                            toggleSelect={toggleSelect}
                            removeTrack={props.removeTrack} />
                })}
            </div>
            <div className="buttons">
                <button className="select-button" onClick={() => {
                        props.selectAll();
                        toggleSelect();
                    }}>Select All</button>
                <button className="delete-button">Delete From Playlist</button>
            </div>
        </div>
    )
}

export default TrackList;