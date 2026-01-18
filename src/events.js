import { playSong } from "./player.js";
import { playButton, nextButton, prevButton, createPlaylistBtn, savePlaylistBtn, cancelPlaylistBtn } from "./dom.js";
import { renderPlaylists, renderSongs } from "./ui.js";
import { setCurrentPlaylist, userPlaylists } from "./state.js";

import { playlists, currentPlaylist, currentSongIndex, setCurrentSongIndex } from "./state.js";

export function initEvents() {
    playButton.onclick = () => playSong(currentSongIndex);

    nextButton.onclick = () => {
        let songIndex = (currentSongIndex + 1) % playlists[currentPlaylist].length;
        setCurrentSongIndex(songIndex);
        playSong(currentSongIndex)
    };

    prevButton.onclick = () => {
        let songIndex = (currentSongIndex - 1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length;
        setCurrentSongIndex(songIndex);
        playSong(currentSongIndex);
    };
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

