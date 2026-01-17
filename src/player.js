import { playlists, currentPlaylist, currentSongIndex } from "./state.js";
import { audioPlayer, footerSongTitle, footerSongDescription, footerSongImage } from "./dom.js";

export function playSong(index) {
    const song = playlists[currentPlaylist][index];

    audioPlayer.src = song.file;
    audioPlayer.play();

    footerSongTitle.textContent = song.title;
    footerSongDescription.textContent = song.artist;
    footerSongImage.src = song.cover;
}
