import React from 'react';
import './PlaylistMod.css';

import Playlist from '../Playlist/Playlist';
import NewPlaylist from '../NewPlaylist/NewPlaylist';

function PlaylistMod(props) {
    const remainingPlaylists = props.playlists.filter(playlist => playlist !== props.selectedPlaylist);

    return (
        <div className="PlaylistMod">
            <h2>Add To Playlist</h2>
            <div className="Mod-container">
                {props.playlists.length > 0 && <NewPlaylist onCreate={props.onCreate} />}
                {remainingPlaylists.map((playlist) => {
                    return <Playlist playlist={playlist}
                            key={playlist.id}
                            isAddition={true} 
                            onAdd={props.onAdd} />
                })}
            </div>
        </div>
    )
}

export default PlaylistMod;