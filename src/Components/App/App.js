import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults : [{
              name: 'Doofus',
              artist: 'Hipster',
              album: 'Moustache Life',
              id: '1',
    }],
    playlistName : '',
    playlistTracks : [{
      name : 'Welcome to Japan',
      artist: 'The Strokes',
      album: 'RBA',
      id: '2',
      uri: 'spotify:track:7bfocP7GYoLOutUYpTI8tx',
    }],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    console.log(term);
    Spotify.search(term).then(info =>
      {
        this.setState({searchResults : info});
      }
    );
  }

  savePlaylist() {
    let tracksURIs = this.state.playlistTracks.map(Track=>
    Track.uri);
    console.log(tracksURIs);
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName : name
    });
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack =>
      savedTrack.id === track.id)) {
        return;
      } else {
        let add = this.state.playlistTracks.concat(track);
        this.setState({playlistTracks : add});
      }
  }

  removeTrack(track) {
  let result = this.state.playlistTracks.filter(trackFinder =>
  trackFinder.id !== track.id);

  this.setState({
    playlistTracks : result
  });

  }

  render() {

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          <SearchResults
          searchResults={this.state.searchResults}
          onAdd={this.addTrack}
          />
          <Playlist
          playlistName={this.state.playlistName}
          playlistTracks={this.state.playlistTracks}
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}
          />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
