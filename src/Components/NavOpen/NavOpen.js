import React from 'react';
import './NavOpen.css';

import Playlist from '../Playlist/Playlist';

function NavOpen(props) {
    return (
        <div className="NavOpen">
            <div className="Menu-close" onClick={props.toggleOpen}>
                <div></div>
            </div>
            <div className="Playlist-container">
                {
                props.playlists.map((playlist) => {
                    return <Playlist playlist={playlist}
                            key={playlist.key}
                            isAddition={false} />
                            
                    })
                }
            </div>
        </div>
    )
}

export default NavOpen;