import { renderSongs, renderPlaylists } from "./ui.js";
import { initEvents, initPlaylistEvents } from "./events.js";

renderPlaylists();
renderSongs();
initEvents();
initPlaylistEvents();
