import {
  pauseSong,
  isPlaying,
  nextSong,
  prevSong,
  playSong,
  setVolume,
} from "./player.js";
import {
  playToggleButton,
  nextButton,
  prevButton,
  createPlaylistBtn,
  savePlaylistBtn,
  cancelPlaylistBtn,
  volumeSlider,
  volumeIcon,
  audioPlayer,
  repeatButton,
  searchBar,
  homeLibrary,
  exploreBtn,
  libraryBtn,
  backBtn,
  logoSection,
} from "./dom.js";
import { renderPlaylists, renderSongs, renderView } from "./ui.js";
import {
  createPlaylist,
  currentView,
  isRepeatOn,
  setCurrentPlaylist,
  setSelectedArtist,
  setView,
  toggleRepeat,
} from "./state.js";
import { playlists } from "./playlists.js";


let lastVolume = 50;

const VIEWS = {
  HOME: "HOME",
  EXPLORE: "EXPLORE",
  LIBRARY: "LIBRARY",
};

export function initEvents() {
  playToggleButton.onclick = () => (isPlaying ? pauseSong() : playSong());

  nextButton.onclick = () => nextSong();

  prevButton.onclick = () => prevSong();

  setVolume(lastVolume);
}

export function switchPlaylist(name) {
  setCurrentPlaylist(name);
  searchBar.value = "";
  renderSongs();
}

export function initPlaylistEvents() {
  createPlaylistBtn.onclick = () => {
    playlistModal.classList.remove("hidden");
    playlistInput.value = "";
    playlistInput.focus();
  };

  cancelPlaylistBtn.onclick = () => {
    playlistModal.classList.add("hidden");
  };

  savePlaylistBtn.onclick = () => {
    const name = playlistInput.value.trim();
    if (!name) return;

    if (playlists[name]) {
      alert("Playlist already exists");
      return;
    }

    createPlaylist(name);

    playlistModal.classList.add("hidden");
    renderPlaylists();
  };
}


// VOLUME CONTROL EVENTS----------------------
volumeSlider.addEventListener("input", () => {
  setVolume(volumeSlider.value);
});

volumeIcon.addEventListener("click", () => {
  if (audioPlayer.volume > 0) {
    lastVolume = audioPlayer.volume;
    setVolume(0);
    volumeSlider.value = 0;
  } else {
    setVolume(lastVolume * 100);
    volumeSlider.value = lastVolume * 100;
  }
});

repeatButton.addEventListener("click", () => {
  toggleRepeat();
  repeatButton.classList.toggle("active-repeat", isRepeatOn);
});


// NAVIGATION EVENTS----------------------
function navigateTo(view) {
  setView(view);
  renderView();
}

homeLibrary.addEventListener("click", () => navigateTo(VIEWS.HOME));
exploreBtn.addEventListener("click", () => navigateTo(VIEWS.EXPLORE));
libraryBtn.addEventListener("click", () => navigateTo(VIEWS.LIBRARY));
backBtn.addEventListener("click", () => navigateTo(VIEWS.EXPLORE));




// NAVBAR EVENTS----------------------------
searchBar.addEventListener("input", () => {
  if(currentView !== VIEWS.HOME){
    setCurrentPlaylist("Home");
    setView(VIEWS.HOME);
    renderView();
  }
  const value = searchBar.value.trim();
  renderSongs(value);
});


logoSection.addEventListener("click", () => {
  setCurrentPlaylist("Home");
  setSelectedArtist(null);
  navigateTo("HOME");
});
