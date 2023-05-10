import React from 'react';
import './Track.css';

import Tags from '../Tags/Tags';
function Track(props) { 
    const selectTrack = () => props.selectTrack(props.track);
    const removeTrack = () => props.removeTrack(props.track);
    
    function renderAction() {
        if (props.track.selected) {
            return <button className="Remove-button" onClick={removeTrack}>&#10003;</button>
        } else  {
            return <button className="Add-button" onClick={selectTrack}>+</button>
        };
    };

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            <div className="Tags-container">
                <Tags placeHolder="Tags" tagOptions={props.tagOptions} 
                    onCreate={props.onCreate} onOptionRemove={props.onOptionRemove}
                    addTag={props.addTag} removeTag={props.removeTag} track={props.track} />
            </div>
            {renderAction()}
        </div>
    )
}

export default Track;