import { playlists, userPlaylists } from "./playlists.js";

export let currentSongIndex = 0;
export let currentPlaylist = "Home";



export let currentView = "HOME";
export let previousView = null;

export function setView(view) {
  previousView = currentView;
  currentView = view
}

export let selectedArtist = null;

export function setSelectedArtist(artist) {
  selectedArtist = artist;
}


export let isRepeatOn = false;

export function toggleRepeat() {
  isRepeatOn = !isRepeatOn;
}



export let currentSongId = null;

export function setCurrentSongId(id) {
  currentSongId = id;
}

export let playQueue = [];

export function setPlayQueue(list) {
  playQueue = list;
}

export function getCurrentSong() {
  if (!currentSongId) return null;
  return playQueue.find(song => song.id === currentSongId);
}




export function setCurrentSongIndex(i) {
    currentSongIndex = i;
}

export function setCurrentPlaylist(playlistName) {
  currentPlaylist = playlistName;
}



//ADDING SONGS TO PLAYLIST
export let modalTargetSong = null;

export function setModalTarget(id) {
    modalTargetSong = id;
}

export function getSongById(id) {
    return playlists["Home"].find(s => s.id === id);
}


export function addSongToPlaylist(songId, playlistName) {
    const song = getSongById(songId);
    if (!song) return;

    const list = playlists[playlistName];

    const alreadyExists = list.some(s => s.id === songId);
    if (!alreadyExists) list.push(song);

    saveState();
}

export function createPlaylist(name) {
    if (!name || playlists[name]) return; // avoid duplicates

    // create empty playlist
    playlists[name] = [];

    // update ordering (so it shows in sidebar)
    userPlaylists.push(name);

    saveState();
}



export function saveState() {
    localStorage.setItem("playlists", JSON.stringify(playlists));
    localStorage.setItem("userPlaylists", JSON.stringify(userPlaylists));
}

export function loadState() {
  const storedPlaylists = JSON.parse(localStorage.getItem("playlists"));
  const storedUserPlaylists = JSON.parse(localStorage.getItem("userPlaylists"));

  if (storedPlaylists) {
    Object.keys(storedPlaylists).forEach(key => {
      playlists[key] = storedPlaylists[key];
    });
  }

  if (storedUserPlaylists) {
    userPlaylists.length = 0;
    userPlaylists.push(...storedUserPlaylists);
  }
}

export function deletePlaylist(name) {
  if (name === "Liked" || name === "Home") return;

  delete playlists[name];

  const index = userPlaylists.indexOf(name);
  if (index !== -1) userPlaylists.splice(index, 1);

  saveState();
}

export function renamePlaylist(oldName, newName) {
  const clean = newName.trim();
  if (!clean || playlists[clean]) return;

  playlists[clean] = playlists[oldName];
  delete playlists[oldName];

  const index = userPlaylists.indexOf(oldName);
  if (index !== -1) userPlaylists[index] = clean;

  saveState();
}

export function removeSongFromPlaylist(songId, playlistName) {
  if (playlistName === "Home") return;

  const list = playlists[playlistName];
  if (!list) return;

  const index = list.findIndex(s => s.id === songId);
  if (index !== -1) {
    list.splice(index, 1);
    saveState();
  }
}




