import React, {useState} from 'react';
import './App.css';

import Playlists from '../Playlists/Playlists';

function App() {
  
  const [playlists, setPlaylists] = useState([{
    id: 0,
    name: 'Chill'
  }]);

  return (
    <div>
      <h1>Ta<span className="highlight">ggg</span>ing</h1>
      <div className="App">
        <Playlists playlists={playlists} />
      </div>
    </div>
  )
}

export default App;
