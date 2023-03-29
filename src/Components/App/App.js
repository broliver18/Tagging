import React, { useState } from 'react';
import './App.css';

import Navigation from '../Navigation/Navigation';
import NavMobile from '../NavMobile/NavMobile';
import TrackList from '../TrackList/TrackList';
import SearchBar from '../SearchBar/SearchBar';
import PlaylistMod from '../PlaylistMod/PlaylistMod';

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
  
  return (
    <div>
      <div className="Container">
        <Navigation playlists={playlists} /> 
        <NavMobile playlists={playlists} /> 
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <TrackList tracklist={tracklist} />
            <PlaylistMod playlists={playlists} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
