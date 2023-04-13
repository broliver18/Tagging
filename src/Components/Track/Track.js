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

    const options = [
        { value: "green", label: "Green" },
        { value: "blue", label: "Blue" }
    ]

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            <div className="Tags-container">
                <Tags placeHolder="Tags" options={options} isMulti={true}/>
            </div>
            {renderAction()}
        </div>
    )
}

export default Track;