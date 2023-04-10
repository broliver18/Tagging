import React, { useState } from 'react';
import './App.css';

import Navigation from '../Navigation/Navigation';
import NavMobile from '../NavMobile/NavMobile';
import TrackList from '../TrackList/TrackList';
import SearchBar from '../SearchBar/SearchBar';
import PlaylistMod from '../PlaylistMod/PlaylistMod';
import NavOpen from '../NavOpen/NavOpen';

import Spotify from '../../util/Spotify';

function App() {
  
  const [playlists, setPlaylists] = useState([]);
  const [tracklist, setTracklist] = useState([]);
  const [open, setOpen] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isSelected, setIsSelected] = useState();

  function toggleOpen() {
    setOpen(!open);
  }

  function toggleClass() {
    setActive(!isActive);
  }

  async function selectPlaylist(playlist) {
    setIsSelected(playlist);
    const endpoint = playlist.tracks.href;
    const playlistTracks = await Spotify.getPlaylistTracks(endpoint);
    setTracklist(playlistTracks);
  }

  async function loadPlaylists() {
    const playlists = await Spotify.getPlaylists();
    setPlaylists(playlists);
  }
 
  return (
    <div>
      <div className="Container">
        <Navigation playlists={playlists} onSelect={selectPlaylist}
                onLogin={loadPlaylists} /> 
        <NavMobile toggleOpen={toggleOpen} open={open}
                toggleClass={toggleClass} isActive={isActive}>
          <NavOpen playlists={playlists} toggleOpen={toggleOpen} 
                toggleClass={toggleClass} isActive={isActive}
                onSelect={selectPlaylist} onLogin={loadPlaylists} />
        </NavMobile>  
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <TrackList tracklist={tracklist} />
            <PlaylistMod playlists={playlists} isSelected={isSelected} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
