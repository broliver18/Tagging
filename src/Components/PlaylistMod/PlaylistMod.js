import React from 'react';
import './PlaylistMod.css';

import Playlist from '../Playlist/Playlist';
import NewPlaylist from '../NewPlaylist/NewPlaylist';

function PlaylistMod(props) {
    return (
        <div className="PlaylistMod">
            <h2>Add To Playlist</h2>
            <NewPlaylist />
            {props.playlists.map((playlist) => {
                return <Playlist playlist={playlist}
                        key={playlist.key}
                        isAddition={true} />
            })}
        </div>
    )
}

export default PlaylistMod;