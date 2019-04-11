const url = 'https://accounts.spotify.com/authorize';
const client_id = 'f43a05807c8d427a824bf67715ac6634';
const response_type= 'token';
const redirect_uri = 'http://jammingv1.surge.sh';
const scope = 'playlist-modify-public';
let accessToken= '';

const Spotify = {

  getAccessToken() {

    if (accessToken) {
      return accessToken;
    }
      else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
        let accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
        let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');

        return accessToken;

      } else {
        window.location = `${url}?client_id=${client_id}&response_type=${response_type}&scope=${scope}&redirect_uri=${redirect_uri}`;
      }

  },

  search(searchItem) {
    let accessToken = this.getAccessToken();

    if(!accessToken){
    console.log('No access token');
    return [];
}

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchItem}&type=artist,track`,
      {
    headers: {Authorization: `Bearer ${accessToken}`}
  })
    .then(
    response => {return response.json()}
  )
    .then(
    jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map( track => ({
          id : track.id,
          name : track.name,
          artist : track.artist[0].name,
          album : track.album.name,
          uri : track.uri,
        }));

        }
       else {
        return [];
      }
    });


  },

  savePlaylist(playlistName, tracks) {
    let userID = '';
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};

    if ((!playlistName) || (!tracks)) {
      return;
    }

    return fetch(`https://api.spotify.com/v1/me`,
    {
      headers
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
          body: JSON.stringify({name: playlistName}),
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
        return fetch(`https://api.spotify.com/v1/${userID}/playlists/${playlistID}/tracks`,
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
