const url = 'https://accounts.spotify.com/authorize';
const client_id = 'f43a05807c8d427a824bf67715ac6634';
const response_type= 'token';
let redirect_uri = 'http://localhost:3000/';
const scope = 'playlist-modify-public';
let accessToken;

const Spotify = {

    getAccessToken() {

      if (accessToken) {
        return accessToken;
      }
        else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
          accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
          let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');

          return accessToken;

        } else {
          window.location = `${url}?client_id=${client_id}&response_type=${response_type}&scope=${scope}&redirect_uri=${redirect_uri}`;
        }

    },

  search(searchItem) {
    accessToken = this.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchItem}`,
      {
    headers: {Authorization: `Bearer ${accessToken}`}
  }).then(
    response => {return response.json()}
  ).then(
    jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map( track => ({
          id : track.id,
          name : track.name,
          artist : track.artists[0].name,
          album : track.album.name,
          uri : track.uri,
        }));

        }
       else {
        return [];
      }
    });


  },

  savePlaylist(name, tracks) {
    if (!name || !tracks) {
      return;
    }

    let userID;
    const accessToken = this.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};

    return fetch(`https://api.spotify.com/v1/me`,
    {
      headers: headers
    }
  ).then(
    response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Request Failed!');
    }, networkError => console.log(networkError.message)
  ).then(
      jsonResponse => {
        userID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers : headers,
          method: 'POST',
          body: JSON.stringify({name: name}),
        });
      }
    ).then(response=> {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Request Failed!');
    }, networkError => console.log(networkError.message)
  ).then(
      jsonResponse => {
        const playlistID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
        {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: tracks}),
        });
      }
    );

  }


}

export default Spotify;
