import React, { useState } from 'react';
import './TrackList.css';

import Track from '../Track/Track';

function TrackList(props) {
    const [tagOptions, setTagOptions] = useState([]);

    function createTagOptions(tag) {
        if (!tagOptions.some(option => option.toLowerCase() === tag.toLowerCase()))
        setTagOptions(prevState => [...prevState, tag]);
    };

    function removeOption(tag) {
        return tagOptions.filter(o => o !== tag);
    };

    function onOptionRemove(e, tag) {
        e.stopPropagation();
        setTagOptions(removeOption(tag));
    };

    function renderAction() {
        if (props.isSelectAll) {
            return <button className="select-button" onClick={props.selectAll}>Deselect All</button>
        } else {
            return <button className="select-button" onClick={props.selectAll}>Select All</button>
        }
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
                            removeTrack={props.removeTrack} />
                })}
            </div>
            <div className="buttons">
                {renderAction()}
                <button className="delete-button">Delete From Playlist</button>
            </div>
        </div>
    )
}

export default TrackList;