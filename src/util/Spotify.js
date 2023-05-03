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

   async getPlaylists() {
      const accessToken = this.getAccessToken();
      const headers = { Authorization: 'Bearer ' + accessToken };

      const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=20&offset=0', { headers: headers });
      const jsonResponse = await response.json();
      if (!jsonResponse) return [];
      const playlists = jsonResponse.items.map(playlist => ({
        id: playlist.id,
        name: playlist.name,
        tracks: playlist.tracks
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
        tags: []
    }));
      return tracks;
   }
}

export default Spotify;