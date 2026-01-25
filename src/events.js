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
} from "./dom.js";
import { renderPlaylists, renderSongs } from "./ui.js";
import { isRepeatOn, setCurrentPlaylist, setModalTarget, toggleRepeat, userPlaylists } from "./state.js";

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

    playlists[name] = [];
    userPlaylists.push(name);

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




