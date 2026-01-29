import { currentPlaylist, setModalTarget, addSongToPlaylist, modalTargetSong, createPlaylist, setCurrentSongIndex, setView, currentView, selectedArtist, setSelectedArtist, currentSongIndex, setCurrentSongId, currentSongId, setPlayQueue, renamePlaylist, deletePlaylist, removeSongFromPlaylist } from "./state.js";
import { songGrid, footerSongTitle, footerSongDescription, footerSongImage, playlistModal, modalList, modalCreate, addingSongsModal, homeLibrary, cancelAddingSongs, backBtn, songCard} from "./dom.js";
import { switchPlaylist } from "./events.js";
import { playCurrent, playSong } from "./player.js";
import { playlists, userPlaylists } from "./playlists.js";

const gradientPresets = [
  "linear-gradient(135deg, #9929ea, #f037d7)",
  "linear-gradient(135deg, #1db954, #1ed760)",
  "linear-gradient(135deg, #ff512f, #dd2476)",
  "linear-gradient(135deg, #00c6ff, #0072ff)",
  "linear-gradient(135deg, #f7971e, #ffd200)"
];


export function renderView() {
  if (currentView === "HOME") {
    renderSongs();
    // updateBackButtonVisibility();
  }

  if (currentView === "LIBRARY") {
    renderLibraryView();
  }

  if (currentView === "EXPLORE") {
    renderExploreView();
  }

  updateBackButtonVisibility();
  
}

export function renderSongs(filterText = "") {
  console.log("Playlist is " + currentPlaylist);

  const allSongs = playlists[currentPlaylist] || [];
const search = filterText.toLowerCase();

let songs = allSongs;

// 🔹 Artist filter (from Explore)
if (selectedArtist) {
  console.log("Filtering by artist: ", selectedArtist);
  songs = songs.filter(song => song.artist === selectedArtist);
}

// 🔹 Search filter
songs = songs.filter(song =>
  song.songName.toLowerCase().includes(search) || song.artist.toLowerCase().includes(search) || song.album.toLowerCase().includes(search)
);

setPlayQueue(songs);

  songGrid.innerHTML = "";

  if (songs.length !== 0) {
    songs.forEach((song) => {
      // console.log("Logging songs, ", song);
      const col = document.createElement("div");
      col.className = "col-6 col-md-4 col-lg-2 songGridCol";

      col.innerHTML = `
        <div class="song-card" data-id="${song.id}">
          <img src="${song.coverPath}" alt="${song.songName}">
          <div class="song-title">${song.songName}</div>
          <div class="song-sub">${song.artist}</div>
          <i class="fa-solid fa-ellipsis-vertical songMenu"></i>
        </div>
      `;

        const menu = col.querySelector(".songMenu");
            menu.addEventListener("click", (e) => {
        e.stopPropagation();
        setModalTarget(song.id);

        if (currentPlaylist === "Home") {
          openAddingSongsModal();
        } else {
          openSongContextMenu(menu, song.id);
        }
});

      col.addEventListener("click", () => {
        const originalIndex = allSongs.findIndex(
          s => s.id === song.id
        );
        setCurrentSongId(song.id);
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
  // setSelectedArtist(null);
  // updateBackButtonVisibility();
  updateActiveSongUI();

}

let activeSongMenu = null;

function openSongContextMenu(anchorEl, songId) {
  closeSongContextMenu();

  const menu = document.createElement("div");
  menu.className = "songContextMenu";

  menu.innerHTML = `
    <div class="menuItem add">➕ Add to playlist</div>
    <div class="menuItem delete">🗑 Remove from playlist</div>
  `;

  const rect = anchorEl.getBoundingClientRect();
  menu.style.top = `${rect.top - 80 + window.scrollY}px`;
  menu.style.left = `${rect.left - 120}px`;

  document.body.appendChild(menu);
  activeSongMenu = menu;

  // ➕ Add
  menu.querySelector(".add").onclick = () => {
    openAddingSongsModal();
    closeSongContextMenu();
  };

  // 🗑 Remove
  menu.querySelector(".delete").onclick = () => {
    removeSongFromPlaylist(songId, currentPlaylist);
    renderSongs();
    closeSongContextMenu();
  };

  setTimeout(() => {
    document.addEventListener("click", closeSongContextMenu, { once: true });
  }, 0);
}

function closeSongContextMenu() {
  if (activeSongMenu) {
    activeSongMenu.remove();
    activeSongMenu = null;
  }
}

footerMenu.addEventListener("click", (e) => {
  e.stopPropagation();

  if (!currentSongId) return;

  setModalTarget(currentSongId);

  if (currentPlaylist === "Home") {
    openAddingSongsModal();
  } else {
    openFooterContextMenu(footerMenu, currentSongId);
  }
});

let activeFooterMenu = null;

function openFooterContextMenu(anchorEl, songId) {
  closeFooterContextMenu();

  const menu = document.createElement("div");
  menu.className = "songContextMenu";

  menu.innerHTML = `
    <div class="menuItem add">➕ Add to playlist</div>
    <div class="menuItem delete">🗑 Remove from this playlist</div>
  `;

  const rect = anchorEl.getBoundingClientRect();
  menu.style.top = `${rect.top - 90}px`;
  menu.style.left = `${rect.left - 120}px`;

  document.body.appendChild(menu);
  activeFooterMenu = menu;

  // ➕ Add
  menu.querySelector(".add").onclick = () => {
    openAddingSongsModal();
    closeFooterContextMenu();
  };

  // 🗑 Remove
  menu.querySelector(".delete").onclick = () => {
    removeSongFromPlaylist(songId, currentPlaylist);
    renderSongs();
    closeFooterContextMenu();
  };

  setTimeout(() => {
    document.addEventListener("click", closeFooterContextMenu, { once: true });
  }, 0);
}

function closeFooterContextMenu() {
  if (activeFooterMenu) {
    activeFooterMenu.remove();
    activeFooterMenu = null;
  }
}



function renderExploreSection(title, songs) {
  if (!songs.length) return;

  const section = document.createElement("div");
  section.className = "exploreSection";

  const heading = document.createElement("h4");
  heading.innerText = title;

  const row = document.createElement("div");
  row.className = "row exploreRow";

  songs.slice(0, 6).forEach(song => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-2 exploreCol";

    col.innerHTML = `
      <div class="song-explore" data-id="${song.id}">
        <img src="${song.coverPath}">
        <div class="song-title">${song.songName}</div>
        <div class="song-sub">${song.artist}</div>
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
      setPlayQueue(songs);      // the explore section list
      setCurrentSongId(song.id);
      playCurrent();

    });

    row.appendChild(col);
  });
  
  section.appendChild(heading);
  section.appendChild(row);
  songGrid.appendChild(section);
}

function renderLibraryView() {
  songGrid.innerHTML = "";

  Object.keys(playlists).forEach(key => {
    if (key === "Home") return;

    const div = document.createElement("div");
    div.className = "libraryCard";
    div.style.background = gradientPresets[key.length % gradientPresets.length];
    // div.innerText = key;
    div.innerHTML = `
      <div class="libraryTile">${key}</div>
    `;

    div.onclick = () => {
      // switch to that playlist
      // setCurrentSongIndex(key);
      // setView("HOME");
      // renderView();
      switchPlaylist(key);
    };

    songGrid.appendChild(div);
  });
}

function renderExploreView() {
  songGrid.innerHTML = "";

  // const backButton = document.createElement("div");
  // backButton.className = "backBtn";
  // backButton.innerHTML = `<i id="backArrow" class="fa-solid fa-arrow-left"></i>`;

  // songGrid.appendChild(backButton);

  renderExploreSection("Trending  Now....", getTrendingSongs());

  renderArtistSection(); 

  renderExploreSection("Just Vibes....", filterByMood("Chill"));
  renderExploreSection("Romance Unplugged....", filterByMood("Love"));
  renderExploreSection("Heavy Hearts....", filterByMood("Sad"))
}


function renderArtistSection() {
  const artists = getUniqueArtists();

  if (!artists.length) return;

  const section = document.createElement("div");
  section.className = "exploreSection";

  section.innerHTML = `
    <h4>🎤 Artists You May Like</h4>
    <div class="artistRow"></div>
  `;

  const row = section.querySelector(".artistRow");

  artists.forEach(artist => {
    const div = document.createElement("div");
    div.className = "artistCard";

    div.innerHTML = `
      <img src="${artist.image}" />
      <div class="artistName truncate">${artist.name}</div>
    `;

    div.onclick = () => {
      console.log("Selected artist: ", artist.name);
      setSelectedArtist(artist.name);
      setView("HOME");
      renderView();
    };

    row.appendChild(div);
  });

  songGrid.appendChild(section);
}


function getUniqueArtists() {
  const map = new Map();

  playlists.Home.forEach(song => {
    if (!song.artist) return;

    if (!map.has(song.artist)) {
      map.set(song.artist, {
        name: song.artist,
        image: song.artistImage ? song.artistImage : song.coverPath
      });
    }
  });

  return Array.from(map.values()).slice(0, 8);
}







function getTrendingSongs() {
  return [...playlists.Home]
    .sort((a, b) => b.popularity - a.popularity);
}

function filterByMood(mood) {
  return playlists.Home.filter(song =>
    song.mood && song.mood.includes(mood)
  );
}





export function renderPlaylists() {
    dynamicPlaylist.innerHTML = "";

    userPlaylists.forEach(name => {
        const div = document.createElement("div");
        div.className = "dynamicTile";
        div.innerHTML = `
            <div class="dynamicTileLeft">
              <span class="dynamicPlaylistName">${name}</span>
              <span class="dynamicPlaylistCategory">${name === "Liked" ? "Default" : "Custom"}</span>
            </div>
            
              ${
              name !== "Liked"
                ? `<i class="fa-solid fa-ellipsis-vertical deletePlaylist"></i>`
                : ""
                }
          `;
        div.onclick = () => switchPlaylist(name);

        div.addEventListener("click", () => switchPlaylist(name));

        
        if(name !== "Liked") {
            const deleteBtn = div.querySelector(".deletePlaylist");
            deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            openPlaylistMenu(e.currentTarget, name);
          });
        }
        

        dynamicPlaylist.appendChild(div);
    });

    homeLibrary.onclick = () => switchPlaylist("Home");
}


let activeMenu = null;

function openPlaylistMenu(button, playlistName) {
  closePlaylistMenu();

  const menu = document.createElement("div");
  menu.className = "playlistContextMenu";

  menu.innerHTML = `
    <div class="menuItem rename">Rename</div>
    <div class="menuItem delete">Delete</div>
  `;

  const rect = button.getBoundingClientRect();
  menu.style.top = `${rect.bottom + window.scrollY}px`;
  menu.style.left = `${rect.left - 120}px`;

  document.body.appendChild(menu);
  activeMenu = menu;

  menu.querySelector(".rename").onclick = () => {
    const newName = prompt("Rename playlist:", playlistName);
    if (!newName) return;

    renamePlaylist(playlistName, newName);
    renderPlaylists();
    closePlaylistMenu();
  };

  menu.querySelector(".delete").onclick = () => {
    if (!confirm(`Delete "${playlistName}"?`)) return;

    deletePlaylist(playlistName);
    renderPlaylists();
    closePlaylistMenu();
  };

  setTimeout(() => {
    document.addEventListener("click", closePlaylistMenu, { once: true });
  }, 0);
}

function closePlaylistMenu() {
  if (activeMenu) {
    activeMenu.remove();
    activeMenu = null;
  }
}


export function updateFooter(song) {
    footerSongTitle.textContent = song.songName;
    footerSongDescription.textContent = `${song.artist} | ${song.album} | ${song.language}`;
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

backBtn.addEventListener("click", () => {
  setSelectedArtist(null);
  setView("EXPLORE");
  renderView();
});



function updateBackButtonVisibility() {
  // if (!backBtn) return;

  // SHOW only when artist is selected and we are in HOME view
  if (currentView === "HOME" && selectedArtist) {
    console.log("Showing back button");
    backBtn.classList.remove("hidden");
  } else {
    backBtn.classList.add("hidden");
  }
}

export function updateActiveSongUI() {
  if (!currentSongId) return;

  document.querySelectorAll(".song-card").forEach(card => {
    card.classList.toggle(
      "active",
      Number(card.dataset.id) === currentSongId
    );
  });
}










