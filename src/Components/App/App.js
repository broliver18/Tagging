import React, {useState} from 'react';
import './App.css';

import Playlists from '../Playlists/Playlists';
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
      <h1>Ta<span className="highlight">ggg</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <Playlists playlists={playlists} />
          <TrackList tracklist={tracklist} />
          <PlaylistMod playlists={playlists} />
        </div>
      </div>
    </div>
  )
}

export default App;
