import { playlists, currentPlaylist, userPlaylists, setModalTarget, addSongToPlaylist, modalTargetSong } from "./state.js";
import { songGrid, footerSongTitle, footerSongDescription, footerSongImage, playlistModal, modalList, modalCreate, addingSongsModal } from "./dom.js";
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
      <i class="fa-solid fa-ellipsis-vertical songMenu"></i>
    </div>
  `;

  const menu = col.querySelector(".songMenu");
  menu.addEventListener("click", (e) => {
      e.stopPropagation(); 
      setModalTarget(song.id);
      openAddingSongsModal();
  });


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

export function updateFooter(song) {
    footerSongTitle.textContent = song.songName;
    footerSongDescription.textContent = song.songName;
    footerSongImage.src = song.coverPath;
}

export function openAddingSongsModal() {
    modalList.innerHTML = "";

    // liked first
    modalList.innerHTML += `
        <div class="modalItem" data-key="Liked">Liked Songs</div>
    `;

    // custom playlists next
    userPlaylists.forEach(name => {
        modalList.innerHTML += `
            <div class="modalItem" data-key="${name}">${name}</div>
        `;
    });

    addingSongsModal.classList.remove("hidden");
}

export function closeAddingSongsModal() {
    addingSongsModal.classList.add("hidden");
}

modalList.addEventListener("click", (e) => {
    const key = e.target.dataset.key;
    if (!key) return;
    addSongToPlaylist(modalTargetSong, key);
    closeAddingSongsModal();
});


modalCreate.addEventListener("click", () => {
    const name = prompt("Playlist name:");
    if (!name) return;
    createPlaylist(name);
    renderPlaylists();
    openAddingSongsModal(); 
});






