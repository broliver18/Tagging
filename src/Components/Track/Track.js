import React from 'react';
import './Track.css';

import Tags from '../Tags/Tags';
function Track(props) {   
    function renderAction() {
        if (props.track.selected) {
            return <button className="Track-action-remove" onClick={removeTrack}>&#10003;</button>
        } else  {
            return <button className="Track-action-add" onClick={selectTrack}>+</button>
        };
    };

    function selectTrack() {
        props.selectTrack(props.track);
    };

    function removeTrack() {
        props.removeTrack(props.track);
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
                    addTag={props.addTag} removeTag={props.removeTag} track={props.track} isMulti={true} />
            </div>
            {renderAction()}
        </div>
    )
}

export default Track;