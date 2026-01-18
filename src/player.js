import { playlists, currentPlaylist, currentSongIndex, setCurrentSongIndex } from "./state.js";
import { audioPlayer } from "./dom.js";
import { playToggleButton } from "./dom.js";
import { updateFooter } from "./ui.js";

export let isPlaying = false;

export function playCurrent() {
    const song = playlists[currentPlaylist][currentSongIndex];
    audioPlayer.src = song.filepath;
    audioPlayer.play();
    isPlaying = true;
    updatePlayButton();
    updateFooter(song);
}

export function playSong(index) {
    audioPlayer.play();
    isPlaying = true;
    updatePlayButton();
    updateFooter(song);
}

export function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayButton();
}

export function togglePlay() {
    if(isPlaying) pauseSong();
    else playSong;
}

export function nextSong(){
    const length = playlists[currentPlaylist].length;
    setCurrentSongIndex((currentSongIndex + 1)%length);
    playCurrent();
}

export function prevSong() {
    const length = playlists[currentPlaylist].length;
    setCurrentSongIndex((currentSongIndex - 1 + length) % length);
    playCurrent();
}

function updatePlayButton() {
    if (isPlaying) {
        playToggleButton.classList.remove("fa-play");
        playToggleButton.classList.add("fa-pause");
    } else {
        playToggleButton.classList.remove("fa-pause");
        playToggleButton.classList.add("fa-play");
    }
}

audioPlayer.onended = () => {
    nextSong();
};