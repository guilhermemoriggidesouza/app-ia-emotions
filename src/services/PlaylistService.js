export async function getPlaylistByIdUser(userId) {
  return await fetch(`https://api-ia-emotions.herokuapp.com/playlist/${userId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => err);
}

export async function insertIntoPlaylistMusics(playlist, musicsFile) {
  return await fetch(`https://api-ia-emotions.herokuapp.com/playlist/${playlist}`, {
    method: "POST",
    body: musicsFile,
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => err);
}

export async function insertIntoPlaylistMusicOtherSite(playlist, infoMusic) {
  return await fetch(`https://api-ia-emotions.herokuapp.com/playlist/url/${playlist}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: infoMusic.url, title: infoMusic.title }),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => err);
}

export async function getTitleVideo(title) {
  const json =
    title.split("watch?")[1]?.replace(/&/g, '","')?.replace(/=/g, '":"') ?? "";
  const uri = decodeURI(json);
  const url = JSON.parse('{"' + uri + '"}');
  return await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${url.v}&part=snippet&key=AIzaSyB6RIhy9OAPqssx7A1wIc1FQwhLuif7mQw`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => err);
}

export async function modifyPlaylistMusics(playlist, musicsFile) {
  return await fetch(`https://api-ia-emotions.herokuapp.com/playlist/${playlist}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      files: [...musicsFile],
    }),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => err);
}

export async function removeMusic(id, idplaylist) {
  return await fetch(`https://api-ia-emotions.herokuapp.com/music/${id}?idPlaylist=${idplaylist}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => { 
        console.log(err);
    });
}

export async function getLastMusicByPlaylist(playlist) {
  return await fetch(
    `https://api-ia-emotions.herokuapp.com/ul1imaMusica/playlist/${playlist._id}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => err);
}
