import React from 'react';
import './Navigation.css';

import Playlist from '../Playlist/Playlist';

function Navigation(props) {
    function toggleClass(playlist) {
        if (!props.selectedPlaylist) {
            return;
        } else {
            if (playlist.id === props.selectedPlaylist.id) {
            return "Selected";
            } else {
            return "Not-selected";
            };
        };
    };

    function login() {
        props.onLogin();
        props.getProfile();
    };

    function renderAction() {
        if (props.name) {
            return (
                <div className="Profile-name">
                    <h3>{props.name}</h3>
                </div>
            )
        } else {
            return (
                <div className="Navigation-login">
                    <h3 onClick={login}>Login</h3>
                </div>
            )
        }
    };

    return (
        <div className="Navigation">
            <h1>Ta<span className="highlight">ggg</span>ing</h1>
            {renderAction()}
            <div className="Playlists">
            {
                props.playlists.map((playlist) => {
                    return <Playlist playlist={playlist}              
                            key={playlist.id}
                            isAddition={false} 
                            onSelect={props.onSelect} 
                            toggleClass={toggleClass(playlist)} />
                })
            }
            </div>
        </div>
    )
}

export default Navigation;