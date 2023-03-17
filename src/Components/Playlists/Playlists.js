import React from 'react';
import './Playlists.css';

import Playlist from '../Playlist/Playlist';

function Playlists(props) {
    return (
        <div className="Playlists">
            playlists={props.playlists.map(playlist => {
                return <Playlist playlist={playlist}
                    key={playlist.id} /> 
            })} 
        </div>
    )
}

export default Playlists;