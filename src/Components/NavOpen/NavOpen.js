import React from 'react';
import './NavOpen.css';

import Playlist from '../Playlist/Playlist';

function NavOpen(props) {
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
                <div className="Profile-name-mobile">
                    <h3>{props.name}</h3>
                </div>
            )
        } else {
            return (
                <div className="NavOpen-login">
                    <h3 onClick={login}>Login</h3>
                </div>
            )
        }
    };


    return (
        <div className="NavOpen">
            <div className="Button-close" onClick={() => {
                props.toggleOpen();
                props.toggleClass();
            }}>
                <div></div>
            </div>
            {renderAction()}
            <div className="Playlist-container">
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

export default NavOpen;