const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const menuButton = document.getElementById('menu');
const songList = document.querySelector('.song-list');
const songListContainer = document.getElementById('song-list');

let songs = [
    {
        title: "After Hours",
        artist: "Charlieonnafriday",
        src: "./song/afterhours.mp3"
    },
    {
        title: "Gir U My Plug",
        artist: "Charlieonnafriday",
        src: "./song/girlumyplug.mp3"
    },
    {
        title: "I'm Not Crazy",
        artist: "Charlieonnafriday",
        src: "./song/i'mnotcrazy.mp3"
    },
    {
        title: "Enough",
        artist: "Charlieonnafriday",
        src: "./song/enough.mp3"
    },
    {
        title: "That's What I Get",
        artist: "Charlieonnafriday",
        src: "./song/that'swhatiget.mp3"
    }
];

let currentSongIndex = 0;

function loadSong(song) {
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    audio.src = song.src;
}

function playSong() {
    audio.play();
    playPauseButton.textContent = "Pause";
}

function pauseSong() {
    audio.pause();
    playPauseButton.textContent = "Play";
}

function playPause() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function updateProgress() {
    const { duration, currentTime } = audio;
    progress.value = (currentTime / duration) * 100;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Event Listeners
playPauseButton.addEventListener('click', playPause);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

// Load the first song
loadSong(songs[currentSongIndex]);

// Toggle song list on menu button click
menuButton.addEventListener('click', () => {
    songList.classList.toggle('active');
});

// Populate song list
songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title}`;
    li.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(songs[currentSongIndex]);
        playSong();
    });
    songListContainer.appendChild(li);
});
