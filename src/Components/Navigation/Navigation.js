import React from 'react';
import './Navigation.css';

import Playlist from '../Playlist/Playlist';

function Navigation(props) {
    return (
        <div className="Navigation">
            <h1>Ta<span className="highlight">ggg</span>ing</h1>
            <div className="Navigation-login">
                <h3 onClick={props.login}>Login</h3>
            </div>
            <div className="Playlists">
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

export default Navigation;