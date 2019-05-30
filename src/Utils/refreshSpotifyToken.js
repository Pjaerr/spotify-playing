const refreshSpotifyToken = async () => {
  const token_url =
    "https://xander-api.herokuapp.com/https://accounts.spotify.com/api/token";
  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const auth =
    "Basic " + new Buffer(client_id + ":" + client_secret).toString("base64");
  const refresh_token = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;

  try {
    const token_res = await fetch(token_url, {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`
    });
    try {
      const token = await token_res.json();
      return token;
    } catch (err6) {
      console.warn(`Error converting token to json: ${err6}`);
    }
  } catch (err4) {
    console.warn(`Error fetching refresh token: ${err4}`);
  }
};

export default refreshSpotifyToken;
