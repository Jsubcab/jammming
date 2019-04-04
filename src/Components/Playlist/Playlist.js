import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props){
    super(props);
  }

render() {
  return (<div className="Playlist">
    <input defaultValue={"New Playlist"}/>
    <TrackList playtrackList={this.props.playList}/>
    <a href="www.#.com" className="Playlist-save">SAVE TO SPOTIFY</a>
  </div>);
}

}

export default Playlist;
