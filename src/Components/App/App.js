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
  const [trackList, setTrackList] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
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
  };

  function dynamicSearch() {
    return trackList.filter(track =>
      track.name.toLowerCase().includes(searchTerm.toLowerCase())
      || track.artist.toLowerCase().includes(searchTerm.toLowerCase())
      || track.album.toLowerCase().includes(searchTerm.toLowerCase())
      || track.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))); 
  };

  function addTag(track, tag) {
    const trackListCopy = [...trackList];
    const trackCopy = trackListCopy.find(o => o.id === track.id);
    const index = trackListCopy.findIndex(o => o.id === track.id);
    if (!trackCopy.tags.includes(tag)) {
      trackCopy.tags.push(tag.label);
      trackListCopy[index] = trackCopy;
      setTrackList(trackListCopy);
    } 
  };

  function removeTag(track, tag) {
    const trackListCopy = [...trackList];
    const trackCopy = trackListCopy.find(o => o.id === track.id);
    const index = trackListCopy.findIndex(o => o.id === track.id);
    const filteredTags = trackCopy.tags.filter(o => o !== tag.value);
    trackCopy.tags = filteredTags;
    trackListCopy[index] = trackCopy;
    setTrackList(trackListCopy);
  };

  function selectTrack(track) {
    if (selectedTracks.find(savedTrack => savedTrack.id === track.id)) return;
    setSelectedTracks(prevState => [...prevState, track]);
  };

  function removeTrack(track) {
    const newTracks = selectedTracks.filter(currentTrack => currentTrack.id !== track.id);
    setSelectedTracks(newTracks);
  };

  async function loadPlaylists() {
    const playlists = await Spotify.getPlaylists();
    setPlaylists(playlists);
  };

  async function selectPlaylist(playlist) {
    setIsSelected(playlist);
    const endpoint = playlist.tracks.href;
    const playlistTracks = await Spotify.getPlaylistTracks(endpoint);
    setTrackList(playlistTracks);
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
            <TrackList trackList={dynamicSearch()} addTag={addTag} removeTag={removeTag} 
            selectTrack={selectTrack} removeTrack={removeTrack} />
            <PlaylistMod playlists={playlists} isSelected={isSelected} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
