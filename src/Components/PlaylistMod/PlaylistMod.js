import React from 'react';
import './PlaylistMod.css';

import Playlist from '../Playlist/Playlist';
import NewPlaylist from '../NewPlaylist/NewPlaylist';

function PlaylistMod(props) {
   
    const remainingPlaylists = props.playlists.filter(playlist => playlist !== props.isSelected);

    return (
        <div className="PlaylistMod">
            <h2>Add To Playlist</h2>
            <NewPlaylist/>
            {remainingPlaylists.map((playlist) => {
                return <Playlist playlist={playlist}
                        key={playlist.id}
                        isAddition={true} />
            })}
        </div>
    )
}

export default PlaylistMod;