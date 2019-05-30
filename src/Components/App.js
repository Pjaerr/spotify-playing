import React from "react";

//Styles
import "../Styles/App.css";

//Utility Functions
import getSpotifyData from "../Utils/getSpotifyData";
import skipSong from "../Utils/skipSong";
import refreshSpotifyToken from "../Utils/refreshSpotifyToken";
import getAudioFeatures from "../Utils/getAudioFeatures";

//Components
import Spotify from "./Spotify";
import TrackAudioFeatures from "./TrackAudioFeatures";

//Constants
const MAX_SONG_LENGTH = 360000;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      song: "No Song",
      artist: "No Artist",
      none: "none",
      onehundred: "100px",
      imageUrl: "/MMT-Loading.gif",
      explicit: "",
      access_token: "",
      skipSongsLongerThanSixMins: true,
      bannedArtists: ["Michael Jackson", "The Jacksons"],
      audioFeatures: {}
    };
  }

  populateSpotifyData = async () => {
    //Inital refresh token and setting up spotify data
    try {
      const tok = await refreshSpotifyToken();
      this.setState({ access_token: tok.access_token });

      this.updateSpotifyComponent(tok.access_token);
    } catch (err) {
      console.warn(`Error getting refresh token from spotify: ${err}`);
    }

    //Recurrent setting up spotify data
    setInterval(async () => {
      this.updateSpotifyComponent(this.state.access_token);
    }, 3000);
  };

  updateSpotifyComponent = async access_token => {
    try {
      const data = await getSpotifyData(access_token);
      const audioFeatures = await getAudioFeatures(data.item.id, access_token);

      this.setState({ audioFeatures });

      if (this.songNeedsSkipping(data.item)) {
        skipSong(access_token);
      } else {
        this.setSpotifyData(data);
      }
    } catch (err) {
      console.warn(`Error getting spotify now playing: ${err}`);
    }
  };

  songNeedsSkipping = ({ explicit, duration_ms, artists }) => {
    if (explicit) return true;
    if (this.state.skipSongsLongerThanSixMins && duration_ms > MAX_SONG_LENGTH)
      return true;
    if (
      artists.filter(artist => this.state.bannedArtists.includes(artist.name))
        .length > 0
    )
      return true;
  };

  async componentDidMount() {
    this.populateSpotifyData();

    // Refresh the access token every 45 mins
    setInterval(async () => {
      try {
        const { access_token } = await refreshSpotifyToken();
        this.setState({ access_token });
      } catch (err) {
        console.warn(`Error getting refresh token from spotify: ${err}`);
      }
    }, 2700000);
  }

  setSpotifyData = data => {
    const [song, artist, imageUrl, length, currentlength, explicit] = [
      data.item.name,
      data.item.artists[0].name,
      data.item.album.images[0].url,
      data.item.duration_ms,
      data.progress_ms,
      data.item.explicit
    ];

    const songlength = (length / 60000).toFixed(2);
    const currentposition = (currentlength / 60000).toFixed(2);
    const onehundred = "";
    const none = "";
    const barstate = (currentposition / songlength) * 100 + "%";

    this.setState({
      song,
      artist,
      imageUrl,
      barstate,
      onehundred,
      none,
      explicit
    });
  };

  render() {
    return (
      <div className="App wrapper">
        <Spotify
          song={this.state.song}
          artist={this.state.artist}
          imageUrl={this.state.imageUrl}
          barstate={this.state.barstate}
          none={this.state.none}
          onehundred={this.state.onehundred}
        />
        <div className="options-container">
          <div className="options-checkbox">
            <label htmlFor="options-max-length-checkbox">
              Restrict songs to 6 mins or under?
            </label>
            <input
              type="checkbox"
              id="options-max-length-checkbox"
              checked={this.state.skipSongsLongerThanSixMins}
              onChange={e => {
                this.setState({ skipSongsLongerThanSixMins: e.target.checked });
              }}
            />
          </div>
        </div>
        <TrackAudioFeatures
          danceability={this.state.audioFeatures.danceability}
          loudness={this.state.audioFeatures.loudness}
          valence={this.state.audioFeatures.valence}
          tempo={this.state.audioFeatures.tempo}
        />
      </div>
    );
  }
}

export default App;
