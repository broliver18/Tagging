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
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState();
 

  const toggleOpen = () => setIsOpen(!isOpen);
  const toggleClass = () => setActive(!isActive);
  const editSearchTerm = e => setSearchTerm(e.target.value);

  function closeNav() {
    setIsOpen(false);
    setActive(false);
  };

  function dynamicSearch() {
    const filteredTracks = trackList.filter(track =>
      track.name.toLowerCase().includes(searchTerm.toLowerCase())
      || track.artist.toLowerCase().includes(searchTerm.toLowerCase())
      || track.album.toLowerCase().includes(searchTerm.toLowerCase())
      || track.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))); 

      const filteredSelected = filteredTracks.filter(currentTrack => currentTrack.selected === true);
      if (isSelectAll && filteredTracks.length > filteredSelected.length) setIsSelectAll(false);
      else if (!isSelectAll && filteredTracks.length <= filteredSelected.length) setIsSelectAll(true);
      
      return filteredTracks;
  };

  function addTag(track, tag) {
    const trackListCopy = [...trackList];
    const trackCopy = trackListCopy.find(o => o.id === track.id);
    const index = trackListCopy.findIndex(o => o.id === track.id);
    if (!trackCopy.tags.includes(tag)) {
      trackCopy.tags.push(tag);
      trackListCopy[index] = trackCopy;
      setTrackList(trackListCopy);
    };
  };

  function removeTag(track, tag) {
    const trackListCopy = [...trackList];
    const trackCopy = trackListCopy.find(o => o.id === track.id);
    const index = trackListCopy.findIndex(o => o.id === track.id);
    const filteredTags = trackCopy.tags.filter(o => o !== tag);
    trackCopy.tags = filteredTags;
    trackListCopy[index] = trackCopy;
    setTrackList(trackListCopy);
  };

  function selectTrack(track) {
    if (selectedTracks.find(currentTrack => currentTrack.id === track.id)) return;
    const trackListCopy = [...trackList];
    const trackCopy = trackListCopy.find(o => o.id === track.id);
    const index = trackListCopy.findIndex(o => o.id === track.id);
    trackCopy.selected = true;
    trackListCopy[index] = trackCopy;
    setTrackList(trackListCopy);
    setSelectedTracks(prevState => [...prevState, trackCopy]);
  };

  function removeTrack(track) {
    const trackListCopy = [...trackList];
    const trackCopy = trackListCopy.find(o => o.id === track.id);
    const index = trackListCopy.findIndex(o => o.id === track.id);
    trackCopy.selected = false;
    trackListCopy[index] = trackCopy;
    setTrackList(trackListCopy);
    setIsSelectAll(false);
    if (selectedTracks.find(currentTrack => currentTrack.id === track.id)) {
      const newTracks = selectedTracks.filter(currentTrack => currentTrack.id !== track.id);
      setSelectedTracks(newTracks);
    }  
  };

  function selectAllTracks() {
    const trackListCopy = [...trackList];
    const filteredTracks = [...dynamicSearch()];
    if (!isSelectAll) {
      trackListCopy.map(currentTrack => {
        if (filteredTracks.includes(currentTrack)) currentTrack.selected = true;
        return trackListCopy;
      })
      setIsSelectAll(true);
    } else {
      trackListCopy.map(currentTrack => {
        if (filteredTracks.includes(currentTrack)) currentTrack.selected = false;
        return trackListCopy;
      })
      setIsSelectAll(false);
    };
    const selected = trackListCopy.filter(currentTrack => currentTrack.selected === true); 
    setSelectedTracks(selected); 
    setTrackList(trackListCopy);
  };

  async function getProfile() {
    const profile = await Spotify.getProfile();
    const displayName = profile.displayName;
    setName(displayName);
  }

  async function loadPlaylists() {
    const playlists = await Spotify.getPlaylists();
    setPlaylists(playlists);
  };

  async function selectPlaylist(playlist) {
    setSelectedPlaylist(playlist);
    const endpoint = playlist.tracks.href;
    const playlistTracks = await Spotify.getPlaylistTracks(endpoint);
    setTrackList(playlistTracks);
  };
 
  return (
    <div>
      <div className="Container">
        <Navigation playlists={playlists} onSelect={selectPlaylist}
                onLogin={loadPlaylists} getProfile={getProfile} name={name} /> 
        <NavMobile toggleOpen={toggleOpen} isOpen={isOpen}
                toggleClass={toggleClass} isActive={isActive}
                closeNav={closeNav} >
          <NavOpen playlists={playlists} toggleOpen={toggleOpen} 
                toggleClass={toggleClass} isActive={isActive}
                onSelect={selectPlaylist} onLogin={loadPlaylists} 
                getProfile={getProfile} name={name} />
        </NavMobile>  
        <div className="App">
          <SearchBar searchTerm={searchTerm} onSearch={editSearchTerm} />
          <div className="App-playlist">
            <TrackList trackList={dynamicSearch()} addTag={addTag} 
            removeTag={removeTag} selectTrack={selectTrack} 
            removeTrack={removeTrack} selectAll={selectAllTracks} 
            isSelectAll={isSelectAll} />
            <PlaylistMod playlists={playlists} selectedPlaylist={selectedPlaylist} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
