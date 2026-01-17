const songs = [
  {
    songName: "Darkhaast",
    filepath: "songs/Darkhaast Shivaay.mp3",
    coverPath: "covers/Darkhaast.jpg",
    id: 1,
  },
  {
    songName: "Kyon",
    filepath: "songs/Kyon Barfi.mp3",
    coverPath: "covers/Kyon.jpg",
    id: 2,
  },
  {
    songName: "No Love",
    filepath: "songs/No Love Shubh.mp3",
    coverPath: "covers/No Love.jpg",
    id: 3,
  },
  {
    songName: "Tere Hawaale",
    filepath: "songs/Tere Hawaale Laal Singh Chaddha.mp3",
    coverPath: "covers/Tere Hawale.jpg",
    id: 3,
  },
  {
    songName: "Aye Khuda",
    filepath: "songs/Aye Khuda - Murder 2.mp3",
    coverPath: "covers/Aye Khuda.jpg",
    id: 4,
  },
  {
    songName: "Cheques",
    filepath: "songs/Cheques.mp3",
    coverPath: "covers/Cheques.jpg",
    id: 6,
  },
  {
    songName: "Kasoor",
    filepath: "songs/Kasoor (Prateek Kuhad).mp3",
    coverPath: "covers/Kasoor.jpg",
    id: 5,
  },
  {
    songName: "Nadaan Parindey",
    filepath: "songs/Nadaan Parindey Rockstar.mp3",
    coverPath: "covers/Nadaan Parindey.jpg",
    id: 6,
  },
  {
    songName: "Tere Naina",
    filepath: "songs/Tere Naina.mp3",
    coverPath: "covers/Tere Naina.jpg",
    id: 7,
  },
  {
    songName: "Aaya Na Tu",
    filepath: "songs/Aaya Na Tu.mp3",
    coverPath: "covers/Aaya Na Tu.jpg",
    id: 8,
  },
  {
    songName: "Bezubaan",
    filepath: "songs/Bezubaan Kab Se Street Dancer.mp3",
    coverPath: "covers/Bezubaan.jpg",
    id: 9,
  },
  {
    songName: "Kaise Hua",
    filepath: "songs/Kaise Hua - Kabir Singh.mp3",
    coverPath: "covers/Kaise Hua.jpg",
    id: 10,
  },
  {
    songName: "Mitwa",
    filepath: "songs/Mitwa Kabhi Alvida Naa Kehna.mp3",
    coverPath: "covers/Mitwa.jpg",
    id: 11,
  },
  {
    songName: "Roobaroo",
    filepath: "songs/Roobaroo - Rang De Basanti.mp3",
    coverPath: "covers/Roobaroo.jpg",
    id: 12,
  },
  {
    songName: "Banjaara",
    filepath: "songs/Banjaara Ek Villain.mp3",
    coverPath: "covers/Banjaara.jpg",
    id: 13,
  },
  {
    songName: "Dildaara",
    filepath: "songs/Dildaara Stand By Me Ra One.mp3",
    coverPath: "covers/Dildaara.jpg",
    id: 14,
  },
  {
    songName: "Left-Right",
    filepath: "songs/Left Right Song Ali Sethi.mp3",
    coverPath: "covers/LeftRight.jpg",
    id: 15,
  },
  {
    songName: "Phir Mohabbat",
    filepath: "songs/Phir Mohabbat - Murder 2.mp3",
    coverPath: "covers/Phir Mohabbat.jpg",
    id: 16,
  },
  {
    songName: "Bekhayali",
    filepath: "songs/Bekhayali - Kabir Singh.mp3",
    coverPath: "covers/Bekhayali.jpg",
    id: 17,
  },
  {
    songName: "Beete Lamhein",
    filepath: "songs/Beete Lamhein The Train.mp3",
    coverPath: "covers/Beete Lamhein.jpg",
    id: 18,
  },
  {
    songName: "Gul",
    filepath: "songs/Gul.mp3",
    coverPath: "covers/Gul.jpg",
    id: 19,
  },
  {
    songName: "Mann Mera",
    filepath: "songs/Mann Mera - Table No. 21.mp3",
    coverPath: "covers/Mann Mera.jpg",
    id: 20,
  },
  {
    songName: "Ranjha",
    filepath: "songs/Ranjha - Shershaah.mp3",
    coverPath: "covers/Ranjha.jpg",
    id: 21,
  },
  {
    songName: "Zaroorat",
    filepath: "songs/Zaroorat.mp3",
    coverPath: "covers/Zaroorat.jpg",
    id: 22,
  },
];


const songGrid = document.getElementById("songGrid");
const audio = document.getElementById("audioPlayer");

songs.forEach(song => {
  const col = document.createElement("div");

  // BOOTSTRAP RESPONSIVE COLUMNS
  col.className = "col-6 col-md-4 col-lg-2 songGridCol";

  col.innerHTML = `
    <div class="song-card" data-id="${song.id}">
      <img src="${song.coverPath}" alt="${song.songName}">
      <div class="song-title">${song.songName}</div>
      <div class="song-sub">Song</div>
    </div>
  `;

  col.addEventListener("click", () => playSong(song, col));
  songGrid.appendChild(col);
});

function playSong(song, col) {
  document.querySelectorAll(".song-card").forEach(c =>
    c.classList.remove("active")
  );

  col.querySelector(".song-card").classList.add("active");

  audio.src = song.filepath;
  audio.play();
}


