export let currentSongIndex = 0;
export let currentPlaylist = "Home";

export const playlists = {
  Home: [ 
  {
    id: 1,
    songName: "Darkhast",
    artist: "Arijit Singh",
    album: "Shivaay",
    movie: "Shivaay",
    year: 2016,
    language: "Hindi",
    genre: ["Bollywood", "Romantic"],
    mood: ["Emotional"],
    duration: "05:01",
    filepath: "songs/Darkhaast Shivaay.mp3",
    coverPath: "covers/Darkhaast.jpg",
    popularity: 92,
    isLiked: false,
    playCount: 0
  },
  {
    id: 2,
    songName: "Kyon",
    artist: "Pritam, Arijit Singh",
    album: "Barfi!",
    movie: "Barfi!",
    year: 2012,
    language: "Hindi",
    genre: ["Bollywood", "Romantic"],
    mood: ["Melancholic"],
    duration: "05:12",
    filepath: "songs/Kyon Barfi.mp3",
    coverPath: "covers/Kyon.jpg",
    popularity: 89,
    isLiked: false,
    playCount: 0
  },
  {
    id: 3,
    songName: "No Love",
    artist: "Shubh",
    album: "Still Rollin",
    movie: null,
    year: 2023,
    language: "Punjabi",
    genre: ["Punjabi", "Hip-Hop"],
    mood: ["Chill"],
    duration: "02:52",
    filepath: "songs/No Love Shubh.mp3",
    coverPath: "covers/No Love.jpg",
    popularity: 95,
    isLiked: false,
    playCount: 0
  },
  {
    id: 4,
    songName: "Tere Hawaale",
    artist: "Arijit Singh, Shilpa Rao",
    album: "Laal Singh Chaddha",
    movie: "Laal Singh Chaddha",
    year: 2022,
    language: "Hindi",
    genre: ["Bollywood", "Romantic"],
    mood: ["Love"],
    duration: "05:56",
    filepath: "songs/Tere Hawaale Laal Singh Chaddha.mp3",
    coverPath: "covers/Tere Hawale.jpg",
    popularity: 98,
    isLiked: false,
    playCount: 0
  },
  {
    id: 5,
    songName: "Aye Khuda",
    artist: "Salim–Sulaiman",
    album: "Murder 2",
    movie: "Murder 2",
    year: 2011,
    language: "Hindi",
    genre: ["Bollywood"],
    mood: ["Sad", "Prayer"],
    duration: "06:06",
    filepath: "songs/Aye Khuda - Murder 2.mp3",
    coverPath: "covers/Aye Khuda.jpg",
    popularity: 90,
    isLiked: false,
    playCount: 0
  },
  {
    id: 6,
    songName: "Cheques",
    artist: "Shubh",
    album: "Still Rollin",
    movie: null,
    year: 2023,
    language: "Punjabi",
    genre: ["Punjabi", "Hip-Hop"],
    mood: ["Aggressive"],
    duration: "03:08",
    filepath: "songs/Cheques.mp3",
    coverPath: "covers/Cheques.jpg",
    popularity: 93,
    isLiked: false,
    playCount: 0
  },
  {
    id: 7,
    songName: "Kasoor",
    artist: "Prateek Kuhad",
    album: "Kasoor",
    movie: null,
    year: 2020,
    language: "Hindi",
    genre: ["Indie", "Acoustic"],
    mood: ["Soft", "Sad"],
    duration: "03:37",
    filepath: "songs/Kasoor (Prateek Kuhad).mp3",
    coverPath: "covers/Kasoor.jpg",
    popularity: 94,
    isLiked: false,
    playCount: 0
  },
  {
    id: 8,
    songName: "Nadaan Parindey",
    artist: "A.R. Rahman, Mohit Chauhan",
    album: "Rockstar",
    movie: "Rockstar",
    year: 2011,
    language: "Hindi",
    genre: ["Bollywood", "Soul"],
    mood: ["Spiritual"],
    duration: "06:26",
    filepath: "songs/Nadaan Parindey Rockstar.mp3",
    coverPath: "covers/Nadaan Parindey.jpg",
    popularity: 97,
    isLiked: false,
    playCount: 0
  },
  {
    id: 9,
    songName: "Tere Naina",
    artist: "Shankar–Ehsaan–Loy, Shafqat Amanat Ali",
    album: "My Name Is Khan",
    movie: "My Name Is Khan",
    year: 2010,
    language: "Hindi",
    genre: ["Bollywood", "Romantic"],
    mood: ["Love"],
    duration: "04:39",
    filepath: "songs/Tere Naina.mp3",
    coverPath: "covers/Tere Naina.jpg",
    popularity: 91,
    isLiked: false,
    playCount: 0
  },
  {
    id: 10,
    songName: "Aaya Na Tu",
    artist: "Arjun Kanungo, Momina Mustehsan",
    album: "Aaya Na Tu",
    movie: null,
    year: 2018,
    language: "Hindi",
    genre: ["Pop"],
    mood: ["Sad"],
    duration: "03:51",
    filepath: "songs/Aaya Na Tu.mp3",
    coverPath: "covers/Aaya Na Tu.jpg",
    popularity: 91,
    isLiked: false,
    playCount: 0
  },
  {
    id: 11,
    songName: "Bezubaan",
    artist: "Sachin–Jigar",
    album: "Street Dancer 3D",
    movie: "Street Dancer 3D",
    year: 2020,
    language: "Hindi",
    genre: ["Dance", "Bollywood"],
    mood: ["Energetic"],
    duration: "04:01",
    filepath: "songs/Bezubaan Kab Se Street Dancer.mp3",
    coverPath: "covers/Bezubaan.jpg",
    popularity: 88,
    isLiked: false,
    playCount: 0
  },
  {
    id: 12,
    songName: "Kaise Hua",
    artist: "Vishal Mishra",
    album: "Kabir Singh",
    movie: "Kabir Singh",
    year: 2019,
    language: "Hindi",
    genre: ["Bollywood", "Romantic"],
    mood: ["Love"],
    duration: "03:54",
    filepath: "songs/Kaise Hua - Kabir Singh.mp3",
    coverPath: "covers/Kaise Hua.jpg",
    popularity: 96,
    isLiked: false,
    playCount: 0
  },
  {
    id: 13,
    songName: "Mitwa",
    artist: "Shankar–Ehsaan–Loy",
    album: "Kabhi Alvida Naa Kehna",
    movie: "Kabhi Alvida Naa Kehna",
    year: 2006,
    language: "Hindi",
    genre: ["Bollywood"],
    mood: ["Hopeful"],
    duration: "06:22",
    filepath: "songs/Mitwa Kabhi Alvida Naa Kehna.mp3",
    coverPath: "covers/Mitwa.jpg",
    popularity: 90,
    isLiked: false,
    playCount: 0
  },
  {
    id: 14,
    songName: "Roobaroo",
    artist: "A.R. Rahman, Naresh Iyer",
    album: "Rang De Basanti",
    movie: "Rang De Basanti",
    year: 2006,
    language: "Hindi",
    genre: ["Patriotic", "Soul"],
    mood: ["Inspiring"],
    duration: "04:43",
    filepath: "songs/Roobaroo - Rang De Basanti.mp3",
    coverPath: "covers/Roobaroo.jpg",
    popularity: 93,
    isLiked: false,
    playCount: 0
  },
  {
    id: 15,
    songName: "Banjaara",
    artist: "Mohammed Irfan",
    album: "Ek Villain",
    movie: "Ek Villain",
    year: 2014,
    language: "Hindi",
    genre: ["Bollywood", "Romantic"],
    mood: ["Lonely"],
    duration: "05:37",
    filepath: "songs/Banjaara Ek Villain.mp3",
    coverPath: "covers/Banjaara.jpg",
    popularity: 94,
    isLiked: false,
    playCount: 0
  },
  {
    id: 16,
    songName: "Dildaara",
    artist: "Shafqat Amanat Ali",
    album: "Ra.One",
    movie: "Ra.One",
    year: 2011,
    language: "Hindi",
    genre: ["Bollywood"],
    mood: ["Romantic"],
    duration: "04:22",
    filepath: "songs/Dildaara Stand By Me Ra One.mp3",
    coverPath: "covers/Dildaara.jpg",
    popularity: 87,
    isLiked: false,
    playCount: 0
  },
  {
    id: 17,
    songName: "Left Right",
    artist: "Ali Sethi",
    album: "Left Right",
    movie: null,
    year: 2023,
    language: "Urdu",
    genre: ["Indie", "Pop"],
    mood: ["Chill"],
    duration: "03:21",
    filepath: "songs/Left Right Song Ali Sethi.mp3",
    coverPath: "covers/LeftRight.jpg",
    popularity: 85,
    isLiked: false,
    playCount: 0
  },
  {
    id: 18,
    songName: "Phir Mohabbat",
    artist: "Arijit Singh",
    album: "Murder 2",
    movie: "Murder 2",
    year: 2011,
    language: "Hindi",
    genre: ["Bollywood", "Romantic"],
    mood: ["Sad"],
    duration: "05:30",
    filepath: "songs/Phir Mohabbat - Murder 2.mp3",
    coverPath: "covers/Phir Mohabbat.jpg",
    popularity: 95,
    isLiked: false,
    playCount: 0
  },
  {
    id: 19,
    songName: "Bekhayali",
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    movie: "Kabir Singh",
    year: 2019,
    language: "Hindi",
    genre: ["Bollywood"],
    mood: ["Intense"],
    duration: "06:11",
    filepath: "songs/Bekhayali - Kabir Singh.mp3",
    coverPath: "covers/Bekhayali.jpg",
    popularity: 99,
    isLiked: false,
    playCount: 0
  },
  {
    id: 20,
    songName: "Beete Lamhein",
    artist: "KK",
    album: "The Train",
    movie: "The Train",
    year: 2007,
    language: "Hindi",
    genre: ["Bollywood"],
    mood: ["Nostalgic"],
    duration: "05:23",
    filepath: "songs/Beete Lamhein The Train.mp3",
    coverPath: "covers/Beete Lamhein.jpg",
    popularity: 93,
    isLiked: false,
    playCount: 0
  },
  {
    id: 21,
    songName: "Gul",
    artist: "Anuv Jain",
    album: "Gul",
    movie: null,
    year: 2021,
    language: "Hindi",
    genre: ["Indie"],
    mood: ["Soft"],
    duration: "03:37",
    filepath: "songs/Gul.mp3",
    coverPath: "covers/Gul.jpg",
    popularity: 90,
    isLiked: false,
    playCount: 0
  },
  {
    id: 22,
    songName: "Mann Mera",
    artist: "Gajendra Verma",
    album: "Table No. 21",
    movie: "Table No. 21",
    year: 2013,
    language: "Hindi",
    genre: ["Bollywood"],
    mood: ["Romantic"],
    duration: "03:18",
    filepath: "songs/Mann Mera - Table No. 21.mp3",
    coverPath: "covers/Mann Mera.jpg",
    popularity: 92,
    isLiked: false,
    playCount: 0
  },
  {
    id: 23,
    songName: "Ranjha",
    artist: "B Praak",
    album: "Shershaah",
    movie: "Shershaah",
    year: 2021,
    language: "Hindi",
    genre: ["Bollywood", "Romantic"],
    mood: ["Emotional"],
    duration: "03:48",
    filepath: "songs/Ranjha - Shershaah.mp3",
    coverPath: "covers/Ranjha.jpg",
    popularity: 97,
    isLiked: false,
    playCount: 0
  },
  {
    id: 24,
    songName: "Zaroorat",
    artist: "Mustafa Zahid",
    album: "Ek Villain",
    movie: "Ek Villain",
    year: 2014,
    language: "Hindi",
    genre: ["Bollywood"],
    mood: ["Sad"],
    duration: "04:30",
    filepath: "songs/Zaroorat.mp3",
    coverPath: "covers/Zaroorat.jpg",
    popularity: 89,
    isLiked: false,
    playCount: 0
  },
  ],
  Liked: [],
};

export let isRepeatOn = false;

export function toggleRepeat() {
  isRepeatOn = !isRepeatOn;
}

export const userPlaylists = ["Liked"];

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

    if (storedPlaylists) Object.assign(playlists, storedPlaylists);
    if (storedUserPlaylists) userPlaylists.splice(0, userPlaylists.length, ...storedUserPlaylists);
}

