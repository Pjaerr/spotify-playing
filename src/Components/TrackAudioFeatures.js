import React from "react";

const TrackAudioFeatures = ({ danceability, loudness, valence, tempo }) => {
  danceability = range(danceability, 0.0, 1.0, 0, 100);
  valence = range(valence, 0.0, 1.0, 0, 100);

  return (
    <div className="audio-features-container">
      <div className="audio-features-danceability">
        Danceability: 
        <span className="audio-features-value">
          {parseFloat(danceability).toFixed(2)}
        </span>
        {danceability > 65 ? <span aria-role="icon"> 🤸</span> : null}
        {danceability > 35 && danceability < 65 ? (
          <span aria-role="icon"> 🕺</span>
        ) : null}
        {danceability < 35 ? <span aria-role="icon"> 🙍</span> : null}
      </div>
      <div className="audio-features-loudness">
        Loudness: 
        <span className="audio-features-value">
          {parseFloat(loudness).toFixed(2)} db
        </span>
        {loudness > -5 ? <span aria-role="icon"> 🔊</span> : null}
        {loudness > -20 && loudness < -5 ? (
          <span aria-role="icon"> 🔉</span>
        ) : null}
        {loudness < -20 ? <span aria-role="icon"> 🔈</span> : null}
      </div>
      <div className="audio-features-valence">
        Positivity: 
        <span className="audio-features-value">
          {parseFloat(valence).toFixed(2)}
        </span>
        {valence > 70 ? <span aria-role="icon"> 😊</span> : null}
        {valence > 20 && valence < 70 ? (
          <span aria-role="icon"> 😐</span>
        ) : null}
        {valence < 20 ? <span aria-role="icon"> 😢</span> : null}
      </div>
      <div className="audio-features-tempo">
        Tempo: 
        <span className="audio-features-value">
          {parseFloat(tempo).toFixed(2)} BPM
        </span>
        {tempo > 120 ? <span aria-role="icon"> 🚅</span> : null}
        {tempo > 60 && tempo < 120 ? <span aria-role="icon"> 🤔</span> : null}
        {tempo < 60 ? <span aria-role="icon"> 💤</span> : null}
      </div>
    </div>
  );
};

const range = (
  value,
  minRangeActual,
  maxRangeActual,
  minRangeMapped,
  maxRangeMapped
) => {
  return (
    ((value - minRangeActual) / (maxRangeActual - minRangeActual)) *
      (maxRangeMapped - minRangeMapped) +
    minRangeMapped
  );
};

export default TrackAudioFeatures;
