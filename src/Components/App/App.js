import React, {useState} from 'react';
import './App.css';

import Navigation from '../Navigation/Navigation';
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

  const [open, setOpen] = useState(true);

  function toggleOpen() {
    setOpen(!open);
  }
  
  return (
    <div>
      <div className="Container">
        <button className="Nav-button" onClick={toggleOpen}>
          <div></div>
          <div></div>
          <div></div>
        </button>
        {open ? <Navigation playlists={playlists}/> : 
        <div className="Open-nav"></div>}
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <TrackList tracklist={tracklist}/>
            <PlaylistMod playlists={playlists}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
