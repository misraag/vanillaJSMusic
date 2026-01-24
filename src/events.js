import {  pauseSong, isPlaying, nextSong, prevSong, playCurrent, playSong } from "./player.js";
import {
  playToggleButton,
  nextButton,
  prevButton,
  createPlaylistBtn,
  savePlaylistBtn,
  cancelPlaylistBtn,
  footerMenu,
} from "./dom.js";
import { renderPlaylists, renderSongs } from "./ui.js";
import { setCurrentPlaylist, setModalTarget, userPlaylists } from "./state.js";

import {
  playlists,
  currentPlaylist,
  currentSongIndex,
  setCurrentSongIndex,
} from "./state.js";

export function initEvents() {
  playToggleButton.onclick = () => isPlaying ? pauseSong() : playSong();

  nextButton.onclick = () => nextSong();

  prevButton.onclick = () => prevSong();
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





