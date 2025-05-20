const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const loopBtn = document.getElementById('loop');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songListItems = document.querySelectorAll('#song-list li');
//const musicPlayer = document.querySelector('.player-container')

const songs = [
  { title: "Lofi", src: "../music/lofi.mp3", artist: "Artist A" },
  { title: "Rain", src: "../music/rain.wav", artist: "Artist B" },
  { title: "Waves", src: "../music/ocean.mp3", artist: "Artist C" },
  { title: "Delta", src: "../music/delta.mp3", artist: "Artist D" },
  { title: "Forest", src: "../music/forest.mp3", artist: "Artist E" }
];

let currentSong = 0;
let isPlaying = false;
let isLooping = true; // default loop ON

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist || "Unknown";
  audio.loop = isLooping;

  // Highlight selected track
  songListItems.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸';
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = '▶';
}

// Toggle play/pause
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

// Previous track
prevBtn.addEventListener('click', () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
});

// Next track
nextBtn.addEventListener('click', () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
});

// Update progress bar
progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Sync progress bar & time display
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

// Select song from playlist
songListItems.forEach(item => {
  item.addEventListener('click', () => {
    const index = parseInt(item.getAttribute('data-index'));
    currentSong = index;
    loadSong(currentSong);
    playSong();
  });
});

// Loop toggle
loopBtn.addEventListener('click', () => {
  isLooping = !isLooping;
  audio.loop = isLooping;
  loopBtn.classList.toggle('loop-on', isLooping);
});

// Load initial track
loadSong(currentSong);