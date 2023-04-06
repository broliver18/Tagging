import React from 'react';
import './NavOpen.css';

import Playlist from '../Playlist/Playlist';

function NavOpen(props) {
    return (
        <div className="NavOpen">
            <div className="Button-close" onClick={() => {
                props.toggleOpen();
                props.toggleClass();
            }}>
                <div></div>
            </div>
            <div className="NavOpen-login">
                <h3 onClick={props.login}>Login</h3>
            </div>
            <div className="Playlist-container">
                {
                props.playlists.map((playlist) => {
                    return <Playlist playlist={playlist}
                            key={playlist.key}
                            isAddition={false}
                            onClick={props.selectPlaylist} />   
                    })
                }
            </div>
        </div>
    )
}

export default NavOpen;