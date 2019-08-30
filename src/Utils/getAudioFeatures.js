const getAudioFeatures = async (track_id, token) => {
  const url = `https://api.spotify.com/v1/audio-features/${track_id}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export default getAudioFeatures;
