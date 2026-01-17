import { playSong } from "./player.js";
import { playButton, nextButton, prevButton } from "./dom.js";

import { playlists, currentPlaylist, currentSongIndex } from "./state.js";

export function initEvents() {
    playButton.onclick = () => playSong(currentSongIndex);

    nextButton.onclick = () => {
        currentSongIndex = (currentSongIndex + 1) % playlists[currentPlaylist].length;
        playSong(currentSongIndex);
    };

    prevButton.onclick = () => {
        currentSongIndex = (currentSongIndex - 1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length;
        playSong(currentSongIndex);
    };
}
