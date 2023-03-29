import React from 'react';
import './NavMobile.css';

import Playlist from '../Playlist/Playlist';

function NavMobile(props) {
    return (
        <div className="PlaylistNav">
            <h1>Ta<span className="highlight">ggg</span>ing</h1>
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

export default NavMobile