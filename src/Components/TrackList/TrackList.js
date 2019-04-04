import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="TrackList">
        {this.props.tracks.map(
          track => (
            <Track key={track.id}/>
          )
        )
            }
    </div>
  );
  }
}

export default TrackList;
