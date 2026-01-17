import { playSong } from "./player.js";
import { playButton, nextButton, prevButton } from "./dom.js";

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
