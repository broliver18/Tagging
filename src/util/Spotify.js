const clientId = 'e6f7e1974bff404e890c8fdb91c6e93b';
const redirectUri = 'http://localhost:3003/';

function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  
  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
  
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
  
    return base64encode(digest);
  }

const Spotify = {
    login() {
        let codeVerifier = generateRandomString(128);

        generateCodeChallenge(codeVerifier).then(codeChallenge => {
          let state = generateRandomString(16);
          let scope = 'user-read-private user-read-email';

          localStorage.setItem('code-verifier', codeVerifier);

          let args = new URLSearchParams({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge
          });

          window.location = 'https://accounts.spotify.com/authorize?' + args;
        })
    },
    
    getAccessToken() {
      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get('code');

      let codeVerifier = localStorage.getItem('code_verifier');

      let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: codeVerifier
      });

      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
          },
        body: body
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          localStorage.setItem('access-token', data.access_token);
        })
        .catch(error => {
          console.error('Error:', error);
        });      
    },

   async getPlaylists() {
    let accessToken = localStorage.getItem('access_token');
    const headers = {Authorization: 'Bearer ' + accessToken};

    const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=20&offset=0', {headers: headers});
    const data = await response.json();
    const playlists = data.items;

    return playlists;
   },

   getCode() {
      let codeVerifier = generateRandomString(128);
      let codeChallenge = generateCodeChallenge(codeVerifier);
      console.log(codeChallenge);
      console.log(codeVerifier);  
   }
}

export default Spotify;