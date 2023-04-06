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
  
  const [playlists, setPlaylists] = useState([{
    id: 0,
    name: 'Chill'
  },
  {
    id: 1,
    name: 'Summer'
  }]);

  const [tracklist, setTracklist] = useState([]);
  const [open, setOpen] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isSelected, setIsSelected] = useState({});

  function toggleOpen() {
    setOpen(!open);
  }

  function toggleClass() {
    setActive(!isActive)
  }

  function selectPlaylist({ target }) {
    setIsSelected(target.value);
  }

  async function login() {
    Spotify.login();
    const accessToken = await Spotify.getAccessToken();
    await Spotify.getProfile(accessToken);
  }
  
  return (
    <div>
      <div className="Container">
        <Navigation playlists={playlists} selectPlaylist={selectPlaylist}
                login={login} /> 
        <NavMobile toggleOpen={toggleOpen} open={open}
                toggleClass={toggleClass} isActive={isActive}>
          <NavOpen playlists={playlists} toggleOpen={toggleOpen} 
                toggleClass={toggleClass} isActive={isActive}
                selectPlaylist={selectPlaylist} login={login} />
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
