import { renderPlaylists, renderView } from "./ui.js";
import { initEvents, initPlaylistEvents } from "./events.js";
import { loadState, setView } from "./state.js";

loadState();
renderPlaylists();
setView("HOME");
renderView();
initEvents();
initPlaylistEvents();
