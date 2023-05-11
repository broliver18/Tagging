const clientId = 'e6f7e1974bff404e890c8fdb91c6e93b';
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = 
      `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async getProfile() {
    const accessToken = this.getAccessToken();
    const headers = { Authorization: 'Bearer ' + accessToken };

    const response = await fetch('https://api.spotify.com/v1/me', { headers: headers });
    const jsonResponse = await response.json();
    
    const profile = {
      displayName: jsonResponse.display_name,
      userId: jsonResponse.id
    }
    return profile
  },

  async getPlaylists() {
    const accessToken = this.getAccessToken();
    const headers = { Authorization: 'Bearer ' + accessToken };

    const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=20&offset=0', { headers: headers });
    const jsonResponse = await response.json();
    if (!jsonResponse) return [];
    const playlists = jsonResponse.items.map(playlist => ({
      id: playlist.id,
      name: playlist.name,
      tracks: playlist.tracks,
      snapshot_id: playlist.snapshot_id
    }));
    return playlists;
  },

  async getPlaylistTracks(endpoint) {
    const accessToken = this.getAccessToken();
    const headers = { Authorization: 'Bearer ' + accessToken };

    const response = await fetch(endpoint, { headers: headers });
    const jsonResponse = await response.json();
    if (!jsonResponse) return [];
    const tracks = jsonResponse.items.map(trackNum => ({
      id: trackNum.track.id,
      name: trackNum.track.name,
      artist: trackNum.track.artists[0].name,
      album: trackNum.track.album.name,
      tags: [],
      selected: false,
      uri: trackNum.track.uri
    }));
    return tracks;
  },

  async addToPlaylist(playlistId, trackUris) {
    const accessToken = this.getAccessToken();
    const headers = { Authorization: 'Bearer ' + accessToken };

    return await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        uris: trackUris,
        position: 0
      })
    });
  },

  async removeFromPlaylist(playlistId, trackUris, snapshot_id) {
    const accessToken = this.getAccessToken();
    const headers = { Authorization: 'Bearer ' + accessToken };

    return await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: headers,
      method: 'DELETE',
      body: JSON.stringify({
        tracks: trackUris,
        snapshot_id
      })
    });
  },

  async createPlaylist(name, trackUris) {
    if (!name) return;

    const accessToken = this.getAccessToken();
    const headers = { Authorization: 'Bearer ' + accessToken };

    const profile = await this.getProfile();
    const userId = profile.userId;

    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        name
      })
    });
    const jsonResponse = response.json();
    const playlistId = jsonResponse.id;

    return await this.addToPlaylist(playlistId, trackUris);
  }
}

export default Spotify;