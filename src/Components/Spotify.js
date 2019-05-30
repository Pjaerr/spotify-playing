import React from 'react'
import MMTsvg from '../assets/MMTsvg'

const Spotify = props => {
  return (
    <div className="spotify-holder">
      <div className="spotify-player-wrapper"><MMTsvg /></div>
      <section className="track-info">
        <div className="track-image-frame" style={{background: props.none, boxShadow: props.none, width: props.onehundred, height: props.onehundred}}>
          <img className="track-info--image" src={props.imageUrl} style={{width: props.onehundred}} alt='album artwork'/>
        </div>
        <p className="track-info--artist">{props.artist}</p>
        <h1 className="track-info--title">{props.song}</h1>
        <div className="bar">
          <div className="progress" style={{width: props.barstate}}>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Spotify