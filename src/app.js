import { renderSongs, renderPlaylists } from "./ui.js";
import { initEvents, initPlaylistEvents } from "./events.js";
import { loadState } from "./state.js";

loadState();
renderPlaylists();
renderSongs();
initEvents();
initPlaylistEvents();
