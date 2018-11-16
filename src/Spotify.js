import React from 'react'
import MMTsvg from './MMTsvg'

const Spotify = props => {
  return (
    <div class="spotify-holder">
      <div class="spotify-player-wrapper"><MMTsvg /></div>
      <section class="track-info">
        <div class="track-image-frame" style={{background: props.none, boxShadow: props.none, width: props.onehundred, height: props.onehundred}}>
          <img class="track-info--image" src={props.imageUrl} style={{width: props.onehundred}} alt='album artwork'/>
        </div>
        <p class="track-info--artist">{props.artist}</p>
        <h1 class="track-info--title">{props.song}</h1>
        <div class="bar">
          <div class="progress" style={{width: props.barstate}}>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Spotify