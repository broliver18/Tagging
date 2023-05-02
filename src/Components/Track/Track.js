import React from 'react';
import './Track.css';

import Tags from '../Tags/Tags';

function Track(props) {
    function renderAction() {
        if (props.isRemoval) {
            return <button className="Track-action">-</button>
        } else {
            return <button className="Track-action">+</button>
        }
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
                    isMulti={true} />
            </div>
            {renderAction()}
        </div>
    )
}

export default Track;