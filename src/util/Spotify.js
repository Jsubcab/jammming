const url = 'https://accounts.spotify.com/authorize';
const client_id = 'f43a05807c8d427a824bf67715ac6634';
const response_type= 'token';
const redirect_uri = 'http://localhost:3000/';
const state = '123';
const scope = 'playlist-modify-public';
let accessToken= '';

const Spotify = {

  getAccessToken() {
    const pars_accesstoken = '/access_token=([^&]*)/';
    const pars_expires = '/expires_in=([^&]*)/';
    let expiresIn = '';

    if (accessToken != null) {
      return accessToken;
    }
      else if ((window.location.href.match(pars_accesstoken)) && (window.location.href.match(pars_expires))) {
        accessToken = window.location.href.match(pars_accesstoken)[1];
        expiresIn = window.location.href.match(pars_expires)[1];

        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');

        return accessToken;

      } else {
        window.location = `${url}?client_id=${client_id}&response_type=${response_type}&scope=${scope}&redirect_uri=${redirect_uri}`;
      }

  }
}

export default Spotify;
