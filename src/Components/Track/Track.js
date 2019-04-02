import React from 'react';
import './Track.css';

class Track extends React.Component {

renderAction() {
  const class = 'Track-action';
  if (isRemoval) {
    <a className={class}>-</a>
  } else {
    <a className={class}>+</a>
  }
}

  render() {
    return (<div className="Track">
      <div className="Track-information">
        <h3><!-- track name will go here --></h3>
        <p><!-- track artist will go here--> | <!-- track album will go here --></p>
      </div>
      {this.renderAction}
    </div>);
  }
}

export default Track;
