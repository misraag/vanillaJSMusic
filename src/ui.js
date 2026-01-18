import { playlists, currentPlaylist, userPlaylists } from "./state.js";
import { songGrid } from "./dom.js";
import { switchPlaylist } from "./events.js";

export function renderSongs() {
  console.log("Playlist is " + currentPlaylist);
  const songs = playlists[currentPlaylist];

  songGrid.innerHTML = "";

  if(songs.length!=0) {
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
  })} else {
    const col = document.createElement("div");
    col.className = "m-auto";
    col.innerText="There are no songs in this list"
    songGrid.appendChild(col);
  }
}


export function renderPlaylists() {
    dynamicPlaylist.innerHTML = "";

    userPlaylists.forEach(name => {
        const div = document.createElement("div");
        div.className = "dynamicTile";
        div.innerHTML = `
            <span class="dynamicPlaylistName">${name}</span>
            <span class="dynamicPlaylistCategory">${name === "Liked" ? "Default" : "Custom"}</span>
        `;
        div.onclick = () => switchPlaylist(name);
        dynamicPlaylist.appendChild(div);
    });
}

