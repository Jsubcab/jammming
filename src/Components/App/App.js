import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

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
    playlistName : [],
    playlistTracks : [{
      name : 'Welcome to Japan',
      artist: 'The Strokes',
      album: 'RBA',
      id: '2',
    }],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack =>
      savedTrack.id === track.id)) {
        return;
      }
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(removedTrack =>
    removedTrack.id === track.id)) {
        return;
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
          <SearchResults
          searchResults={this.state.searchResults}
          onAdd={this.addTrack}
          />
          <Playlist
          playlistName={this.state.playlistName}
          playlistTracks={this.state.playlistTracks}
          onRemove={this.state.removeTrack}
          />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
