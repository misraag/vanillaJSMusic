import {
  setModalTarget,
  isRepeatOn,
  getCurrentSong,
  setCurrentSongId,
  currentSongId,
  playQueue,
} from "./state.js";

import {
  audioPlayer,
  progressBar,
  seekBar,
  timeDisplay,
  volumeIcon,
  volumeSlider,
  playToggleButton,
} from "./dom.js";

import {
  openAddingSongsModal,
  updateActiveSongUI,
  updateFooter,
} from "./ui.js";

const CLASS_PLAY = "fa-play";
const CLASS_PAUSE = "fa-pause";
const CLASS_VOLUME_HIGH = "fa-volume-high";
const CLASS_VOLUME_LOW = "fa-volume-low";
const CLASS_VOLUME_MUTE = "fa-volume-xmark";

export let isPlaying = false;
let song = null;

export function playCurrent() {
  song = getCurrentSong();
  if (!song) return;

  audioPlayer.src = song.filepath;
  audioPlayer.play();
  isPlaying = true;
  updateUIAfterPlay();
}

export function togglePlay() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

export function playSong() {
  if (!song) {
    setCurrentSongId(1); 
    playCurrent();
  } else {
    audioPlayer.play();
    isPlaying = true;
    updateUIAfterPlay();
  }
}

export function pauseSong() {
  audioPlayer.pause();
  isPlaying = false;
  updatePlayButton();
}

export function nextSong() {
  if (!playQueue.length || !currentSongId) return;

  const index = playQueue.findIndex((s) => s.id === currentSongId);
  const next = playQueue[(index + 1) % playQueue.length];

  setCurrentSongId(next.id);
  playCurrent();
}

export function prevSong() {
  if (!playQueue.length || !currentSongId) return;

  const index = playQueue.findIndex((s) => s.id === currentSongId);
  const prev = playQueue[(index - 1 + playQueue.length) % playQueue.length];

  setCurrentSongId(prev.id);
  playCurrent();
}

function updatePlayButton() {
  playToggleButton.classList.toggle(CLASS_PLAY, !isPlaying);
  playToggleButton.classList.toggle(CLASS_PAUSE, isPlaying);
}

function updateVolumeIcon(vol) {
  volumeIcon.classList.remove(
    CLASS_VOLUME_HIGH,
    CLASS_VOLUME_LOW,
    CLASS_VOLUME_MUTE
  );

  if (vol === 0) {
    volumeIcon.classList.add(CLASS_VOLUME_MUTE);
  } else if (vol < 0.5) {
    volumeIcon.classList.add(CLASS_VOLUME_LOW);
  } else {
    volumeIcon.classList.add(CLASS_VOLUME_HIGH);
  }
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" + s : s}`;
}

function initPlayerEvents() {
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
    if (isRepeatOn) {
      audioPlayer.currentTime = 0;
      audioPlayer.play();
    } else {
      nextSong();
    }
  };
}

function updateUIAfterPlay() {
  updatePlayButton();
  updateFooter(song);
  updateActiveSongUI();
  const total = formatTime(audioPlayer.duration || 0);
  timeDisplay.textContent = `0:00 / ${total}`;
}

export function setVolume(value) {
  audioPlayer.volume = value / 100;
  updateVolumeIcon(audioPlayer.volume);
  volumeSlider.value = value;
}

initPlayerEvents();