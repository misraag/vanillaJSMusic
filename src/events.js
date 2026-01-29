import {  pauseSong, isPlaying, nextSong, prevSong, playCurrent, playSong, setVolume } from "./player.js";
import {
  playToggleButton,
  nextButton,
  prevButton,
  createPlaylistBtn,
  savePlaylistBtn,
  cancelPlaylistBtn,
  footerMenu,
  volumeSlider,
  volumeIcon,
  audioPlayer,
  repeatButton,
  searchBar,
  homeLibrary,
  exploreBtn,
  libraryBtn,
  backBtn,
} from "./dom.js";
import { openAddingSongsModal, renderPlaylists, renderSongs, renderView } from "./ui.js";
import { createPlaylist, currentView, isRepeatOn, setCurrentPlaylist, setModalTarget, setView, toggleRepeat, userPlaylists } from "./state.js";

import {
  playlists,
  currentPlaylist,
  currentSongIndex,
  setCurrentSongIndex,
} from "./state.js";

let lastVolume = 50;

export function initEvents() {
  playToggleButton.onclick = () => isPlaying ? pauseSong() : playSong();

  nextButton.onclick = () => nextSong();

  prevButton.onclick = () => prevSong();

  console.log(lastVolume)
  setVolume(lastVolume);
}

export function switchPlaylist(name) {
  setCurrentPlaylist(name);
  searchBar.value="";
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
    renderSongs();
  };
}


volumeSlider.addEventListener("input", ()=> {
  setVolume(volumeSlider.value);
})



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

repeatButton.addEventListener("click", ()=>{
  toggleRepeat();

  repeatButton.classList.toggle("active-repeat", isRepeatOn);
})

searchBar.addEventListener('input', ()=>{
  const value = searchBar.value.trim();
  renderSongs(value);
})

// exploreButton.addEventListener('click', ()=>{

// })

homeLibrary.addEventListener("click", () => {
  setView("HOME");
  renderView();
});

exploreBtn.addEventListener("click", () => {
  setView("EXPLORE");
  renderView();
});

libraryBtn.addEventListener("click", () => {
  setView("LIBRARY");
  renderView();
});

backBtn.addEventListener("click", ()=> {
  setView("EXPLORE");
  renderView();
});
