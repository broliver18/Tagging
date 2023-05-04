import React, { useState } from 'react';
import './Track.css';

import Tags from '../Tags/Tags';

function CheckMarkIcon() {
    return (
        <svg width="24" height="24">
            <path d="M24 4.685l-16.327 17.315-7.673-9.054.761-.648 6.95 8.203 15.561-16.501.728.685z"/>
        </svg>
    ); 
};  

function Track(props) {
    const [isRemoval, setIsRemoval] = useState(false);

    function renderAction() {
        if (isRemoval) {
            return <button className="Track-action-remove" onClick={removeTrack}>&#10003;</button>
        } else {
            return <button className="Track-action-add" onClick={selectTrack}>+</button>
        }
    };

    function selectTrack() {
        props.selectTrack(props.track);
        setIsRemoval(true);
    }

    function removeTrack() {
        props.removeTrack(props.track);
        setIsRemoval(false);
    }

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