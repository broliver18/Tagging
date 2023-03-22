import React from 'react';
import './Playlists.css';

import Playlist from '../Playlist/Playlist';

function Playlists(props) {
    return (
        <div className="Playlists">
            <h2>Playlists</h2>
            {
                props.playlists.map((playlist) => {
                    return <Playlist playlist={playlist}
                            key={playlist.key}
                            isAddition={false} />
                })
            }
        </div>
    )
}

export default Playlists;