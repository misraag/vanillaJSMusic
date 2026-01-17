import { playlists, currentPlaylist, currentSongIndex } from "./state.js";
import { audioPlayer, footerSongTitle, footerSongDescription, footerSongImage } from "./dom.js";

export function playSong(index) {
    const song = playlists[currentPlaylist][index];
    
    console.log("Inside player js " + song);
    audioPlayer.src = song.filepath;
    audioPlayer.play();

    footerSongTitle.textContent = song.songName;
    footerSongDescription.textContent = song.songName;
    footerSongImage.src = song.coverPath;
}
