const clientId = 'f6cdadb37d074fbb85e8d9b838834419'; // Replace with your Spotify Client ID
const redirectUri = 'http://localhost:3000'; // Replace with your Redirect URI
let accessToken;

const Spotify = {
  async getAccessToken() {
    if (accessToken) {
      console.log('Using existing access token');
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the URL
      console.log('Access token retrieved from URL');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async search(term) {
    const token = await this.getAccessToken();
    if (!token) {
      console.error('No access token available');
      return [];
    }

    console.log(`Searching for ${term} with token ${token}`);
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const jsonResponse = await response.json();
    console.log('Spotify API response:', jsonResponse);
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
      preview_url: track.preview_url
    }));
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const token = await this.getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
    let userId;

    const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });
    const userJson = await userResponse.json();
    userId = userJson.id;

    const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ name })
    });
    const createPlaylistJson = await createPlaylistResponse.json();
    const playlistId = createPlaylistJson.id;

    await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ uris: trackUris })
    });
  }
};

export default Spotify;