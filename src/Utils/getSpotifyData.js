const getSpotifyData = async token => {
  const url = "https://api.spotify.com/v1/me/player/currently-playing";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.json();
  } catch (err) {
    console.error(`Error fetching spotify data: ${err}`);
  }
};

export default getSpotifyData;