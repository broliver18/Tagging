import React from 'react';
import './Navigation.css';

import Playlist from '../Playlist/Playlist';

function Navigation(props) {
    return (
        <div className="Navigation">
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

export default Navigation;