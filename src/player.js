import {
  playlists,
  currentPlaylist,
  currentSongIndex,
  setCurrentSongIndex,
  setModalTarget,
} from "./state.js";
import { audioPlayer, progressBar, seekBar, timeDisplay } from "./dom.js";
import { playToggleButton } from "./dom.js";
import { openAddingSongsModal, updateFooter } from "./ui.js";

export let isPlaying = false;

// let song = playlists[currentPlaylist][currentSongIndex];
// let firstSong = false;
let song = null;

// let firstSong = true;

export function playCurrent() {
  song = playlists[currentPlaylist][currentSongIndex];
  audioPlayer.src = song.filepath;
  audioPlayer.play();
  isPlaying = true;
  updatePlayButton();
  updateFooter(song);
  const total = formatTime(audioPlayer.duration || 0);
  timeDisplay.textContent = `0:00 / ${total}`;
}

// export function playSong(index) {
//   const song = playlists[currentPlaylist][index];
//   audioPlayer.src = song.filepath;
//   audioPlayer.play();
//   isPlaying = true;
//   updatePlayButton();
//   updateFooter(song);
//   const total = formatTime(audioPlayer.duration || 0);
//   timeDisplay.textContent = `0:00 / ${total}`;
// }

export function playSong() {
    if(song==null){
      console.log("Iam here")
      playCurrent();
    } else{
          console.log("Song is not null hahahah", song);
  
          audioPlayer.play();
          isPlaying = true;
          updatePlayButton();
          updateFooter(song);
          const total = formatTime(audioPlayer.duration || 0);
          timeDisplay.textContent = `0:00 / ${total}`;
    }
}

export function pauseSong() {
  audioPlayer.pause();
  isPlaying = false;
  updatePlayButton();
}

export function togglePlay() {
  if (isPlaying) pauseSong();
  else playSong;
}

export function nextSong() {
  const length = playlists[currentPlaylist].length;
  setCurrentSongIndex((currentSongIndex + 1) % length);
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

footerMenu.addEventListener("click", () => {
    if (!currentSongIndex) return;
    setModalTarget(currentSongIndex);
    openAddingSongsModal();
});



// TIMER FUNCTIONS
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" + s : s}`;
}

progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    audioPlayer.currentTime = audioPlayer.duration * percent;
});


audioPlayer.ontimeupdate = () => {
  if (!audioPlayer.duration) return;

  const current = formatTime(audioPlayer.currentTime);
  const total = formatTime(audioPlayer.duration);

  const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    seekBar.style.width = `${percent}%`;

  

  timeDisplay.textContent = `${current} / ${total}`;
};

audioPlayer.onloadedmetadata = () => {
    timeDisplay.textContent = `0:00 / ${formatTime(audioPlayer.duration)}`;
    seekBar.style.width = "0%";
};

audioPlayer.onended = () => {
  nextSong();
};
