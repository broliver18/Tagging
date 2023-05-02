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
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isSelected, setIsSelected] = useState();

  function toggleOpen() {
    setOpen(!open);
  };

  function toggleClass() {
    setActive(!isActive);
  };

  function editSearchTerm(e) {
    setSearchTerm(e.target.value);
  };

  function closeNav() {
    setOpen(false);
    setActive(false);
  }

  function dynamicSearch() {
    return tracklist.filter(track =>
      track.name.toLowerCase().includes(searchTerm.toLowerCase())
      || track.artist.toLowerCase().includes(searchTerm.toLowerCase())
      || track.album.toLowerCase().includes(searchTerm.toLowerCase())); 
  }

  async function selectPlaylist(playlist) {
    setIsSelected(playlist);
    const endpoint = playlist.tracks.href;
    const playlistTracks = await Spotify.getPlaylistTracks(endpoint);
    setTracklist(playlistTracks);
  };

  async function loadPlaylists() {
    const playlists = await Spotify.getPlaylists();
    setPlaylists(playlists);
  };
 
  return (
    <div>
      <div className="Container">
        <Navigation playlists={playlists} onSelect={selectPlaylist}
                onLogin={loadPlaylists} /> 
        <NavMobile toggleOpen={toggleOpen} open={open}
                toggleClass={toggleClass} isActive={isActive}
                closeNav={closeNav} >
          <NavOpen playlists={playlists} toggleOpen={toggleOpen} 
                toggleClass={toggleClass} isActive={isActive}
                onSelect={selectPlaylist} onLogin={loadPlaylists} />
        </NavMobile>  
        <div className="App">
          <SearchBar searchTerm={searchTerm} onSearch={editSearchTerm} />
          <div className="App-playlist">
            <TrackList tracklist={dynamicSearch()} />
            <PlaylistMod playlists={playlists} isSelected={isSelected} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
