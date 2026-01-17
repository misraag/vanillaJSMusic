import { playlists, currentPlaylist } from "./state.js";
import { songGrid } from "./dom.js";

export function renderSongs() {
  console.log("Playlist is " + currentPlaylist)
  const songs = playlists[currentPlaylist];

  songGrid.innerHTML = "";

  songs.forEach((song, index) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-2 songGridCol";

    col.innerHTML = `
    <div class="song-card" data-id="${song.id}">
      <img src="${song.coverPath}" alt="${song.songName}">
      <div class="song-title">${song.songName}</div>
      <div class="song-sub">Song</div>
    </div>
  `;

    col.addEventListener("click", () => playSongFromUI(index));
    songGrid.appendChild(col);
  });
}
