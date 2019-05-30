const skipSong = async token => {
  const url =
    "https://api.spotify.com/v1/me/player/next";
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    console.log("Skipped Song");
  } catch (err4) {
    console.warn(`Error Skiping Song: ${err4}`);
  }
};

export default skipSong;
