import { playlists, currentPlaylist, userPlaylists, setModalTarget, addSongToPlaylist, modalTargetSong, createPlaylist, setCurrentSongIndex } from "./state.js";
import { songGrid, footerSongTitle, footerSongDescription, footerSongImage, playlistModal, modalList, modalCreate, addingSongsModal, homeLibrary, cancelAddingSongs} from "./dom.js";
import { switchPlaylist } from "./events.js";
import { playCurrent, playSong } from "./player.js";

export function renderSongs(filterText = "") {
  console.log("Playlist is " + currentPlaylist);

  const allSongs = playlists[currentPlaylist] || [];
  const search = filterText.toLowerCase();

  const songs = allSongs.filter(song =>
    song.songName.toLowerCase().includes(search)
  );

  songGrid.innerHTML = "";

  if (songs.length !== 0) {
    songs.forEach((song) => {
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

      col.addEventListener("click", () => {
        const originalIndex = allSongs.findIndex(
          s => s.id === song.id
        );
        setCurrentSongIndex(originalIndex);
        playCurrent();
      });

      songGrid.appendChild(col);
    });
  } else {
    const col = document.createElement("div");
    col.className = "m-auto";
    col.innerText = "No matching songs found";
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

    homeLibrary.onclick = () => switchPlaylist("Home");
}

export function updateFooter(song) {
    footerSongTitle.textContent = song.songName;
    footerSongDescription.textContent = song.songName;
    footerSongImage.src = song.coverPath;
}

export function openAddingSongsModal() {
    modalList.innerHTML = "";

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

cancelAddingSongs.addEventListener("click", ()=> {
    addingSongsModal.classList.add("hidden")
})



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
    addSongToPlaylist(modalTargetSong, name); // auto add
    renderPlaylists();
    closeAddingSongsModal(); 
});






