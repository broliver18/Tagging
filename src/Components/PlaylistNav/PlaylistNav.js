import React from 'react';
import './PlaylistNav.css';

import Playlist from '../Playlist/Playlist';

function PlaylistNav(props) {
    return (
        <div className="PlaylistNav">
            <h1>Ta<span className="highlight">ggg</span>ing</h1>
            {
                props.playlists.map((playlist) => {
                    return <Playlist playlist={playlist}
                            key={playlist.key}
                            isAddition={false}/>
                })
            }
        </div>
    )
}

export default PlaylistNav;