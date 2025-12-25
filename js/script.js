let songs = [
  {
    title:"Bollywood Vibes",
    artist:"DaMusic",
    genre:"Bollywood",
    src:"https://res.cloudinary.com/dy1lgie9q/video/upload/v1766681825/bollywood_dj4wje.mp3",
    thumb:"assets/thumbnails/bollywood.png"
  },
  {
    title:"Pop Energy",
    artist:"DaMusic",
    genre:"Pop",
    src:"https://res.cloudinary.com/dy1lgie9q/video/upload/v1766681822/pop_mskplx.mp3",
    thumb:"assets/thumbnails/pop.png"
  },
  {
    title:"Midnight Chill",
    artist:"DaMusic",
    genre:"Chill",
    src:"https://res.cloudinary.com/dy1lgie9q/video/upload/v1766681826/chill_rndubx.mp3",
    thumb:"assets/thumbnails/chill.png"
  },
  {
    title:"Neon Pulse",
    artist:"DaMusic",
    genre:"EDM",
    src:"https://res.cloudinary.com/dy1lgie9q/video/upload/v1766681822/edm_jjvylc.mp3",
    thumb:"assets/thumbnails/edm.png"
  },
  {
    title:"Smooth Lounge",
    artist:"DaMusic",
    genre:"Jazz",
    src:"https://res.cloudinary.com/dy1lgie9q/video/upload/v1766681820/jazz_bqhtji.mp3",
    thumb:"assets/thumbnails/jazz.png"
  },
  {
    title:"Calm Piano",
    artist:"DaMusic",
    genre:"Classical",
    src:"https://res.cloudinary.com/dy1lgie9q/video/upload/v1766681827/classical_rbamxd.mp3",
    thumb:"assets/thumbnails/classical.png"
  }
];


let currentPlaylist = songs;
let currentIndex = 0;

let audio = document.getElementById("audio");
let progressBar = document.getElementById("progressBar");
let currentTimeEl = document.getElementById("currentTime");
let durationEl = document.getElementById("duration");

audio.addEventListener("loadedmetadata", ()=>{
  durationEl.innerText = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", ()=>{
  let percent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = percent;
  currentTimeEl.innerText = formatTime(audio.currentTime);

  progressBar.style.background = `linear-gradient(
    to right,
    #ffde59 ${percent}%,
    #333 ${percent}%
  )`;
});

progressBar.addEventListener("input", ()=>{
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

function formatTime(time){
  let min = Math.floor(time/60);
  let sec = Math.floor(time%60);
  return min + ":" + (sec < 10 ? "0" + sec : sec);
}

let isPlaying = false;
let recent = [];

function togglePlay(){
  let btn = document.querySelector(".play-btn");

  if(isPlaying){
    audio.pause();
    btn.classList.remove("playing");
  } else {
    audio.play();
    btn.classList.add("playing");
  }

  isPlaying = !isPlaying;
}


function loadSong(index) {
  let song = songs[index];
  if (!song) return;

  audio.src = song.src;
  audio.play();
  isPlaying = true;

  document.getElementById("songTitle").innerText = song.title;
  document.getElementById("songArtist").innerText = song.artist;

  document.querySelector(".song-thumb").style.background =
    `url(${song.thumb}) center/cover no-repeat`;

  addToRecent(song);
}

function updateRecent(){
  let box = document.getElementById("recentSongs");
  box.innerHTML = "";

  recent.forEach(song=>{
    let div = document.createElement("div");
    div.className = "recent-item";
    div.innerText = song.title;
    div.onclick = () => loadSong(songs.findIndex(s => s.title === song.title));
    box.appendChild(div);
  });
}


function seekForward(){ audio.currentTime+=10; }
function seekBackward(){ audio.currentTime-=10; }

function openPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function togglePlay(){
  let btn = document.querySelector(".play-btn");
  if(isPlaying){
    audio.pause();
    btn.innerText = "▶";
    btn.classList.remove("playing");
  } else {
    audio.play();
    btn.innerText = "⏸";
    btn.classList.add("playing");
  }
  isPlaying = !isPlaying;
}

function updatePlayBtn(){
  let btn = document.querySelector(".play-btn");
  btn.innerText = "⏸";
  btn.classList.add("playing");
}


audio.addEventListener("timeupdate", () => {
  let percent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = percent;
  currentTime.innerText = formatTime(audio.currentTime);

  progressBar.style.background = `linear-gradient(
    to right,
    #ffde59 ${percent}%,
    #333 ${percent}%
  )`;
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

function formatTime(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

let library = [];

function addToLibrary() {
  let title = document.getElementById("songTitle").innerText;
  let artist = document.getElementById("songArtist").innerText;

  if (title === "Select a song") return;

  if (!library.some(s => s.title === title)) {
    library.push({ title, artist });
    updateLibrary();
  }
}

function updateLibrary() {
  let box = document.getElementById("libraryList");
  box.innerHTML = "";

  library.forEach(song => {
    let div = document.createElement("div");
    div.className = "song-item";
    div.innerText = song.title + " - " + song.artist;
    div.onclick = () => loadSong(songs.findIndex(s => s.title === song.title));
    box.appendChild(div);
  });
}


function nextSong(){
  if(queue.length > 0){
    playNextFromQueue();
  } else {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
  }
}


function prevSong() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = songs.length - 1;
  }
  loadSong(currentIndex);
}

function filterGenre(g){
  currentPlaylist = songs.filter(s=>s.genre===g);
  currentIndex = 0;

  let box = document.getElementById("genreSongs");
  box.innerHTML="";

  currentPlaylist.forEach((song,i)=>{
    let div=document.createElement("div");
    div.className="song-item";
    div.innerHTML = `<img src="${song.thumb}"><span>${song.title}</span>`;
    div.onclick=()=> loadSong(i);
    box.appendChild(div);
  });
}


function playNextFromQueue(){
  if(queue.length > 0){
    let song = queue.shift();
    loadSong(songs.indexOf(song));
  }
}

function renderSongs(){
  let box = document.getElementById("songList");
  box.innerHTML = "";

  songs.forEach((song,index)=>{
    let div = document.createElement("div");
    div.className = "song-item";
    div.innerHTML = `<img src="${song.thumb}"><span>${song.title}</span>`;
    div.onclick = ()=>{
    currentPlaylist = songs;
    currentIndex = index;
  loadSong(currentIndex);
}

    box.appendChild(div);
  });
}

renderSongs();

function loadSong(index){
  let song = currentPlaylist[index];
  if(!song) return;

  currentIndex = index;
  audio.src = song.src;
  audio.play();
  isPlaying = true;

  document.getElementById("songTitle").innerText = song.title;
  document.getElementById("songArtist").innerText = song.artist;
  document.querySelector(".song-thumb").style.background = `url(${song.thumb}) center/cover`;

  addToRecent(song);
  updatePlayBtn();
  updateQueue();
}

function nextSong(){
  if(currentPlaylist.length === 0) return;
  currentIndex = (currentIndex + 1) % currentPlaylist.length;
  loadSong(currentIndex);
}

function prevSong(){
  if(currentPlaylist.length === 0) return;
  currentIndex = (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  loadSong(currentIndex);
}


function addToRecent(song){
  document.getElementById("noRecent").style.display = "none";

  recent = recent.filter(s => s.title !== song.title);
  recent.unshift(song);
  recent = recent.slice(0,6);

  let box = document.getElementById("recentSongs");
  box.innerHTML = "";

  recent.forEach(s=>{
    let div = document.createElement("div");
    div.className="song-item";
    div.innerHTML = `<img src="${s.thumb}"><span>${s.title}</span>`;
    div.onclick = ()=> playFromRecent(s);
    box.appendChild(div);
  });
}

function playFromRecent(song){
  currentPlaylist = recent;
  currentIndex = currentPlaylist.indexOf(song);
  loadSong(currentIndex);
}

function addToLibrary(){
  let song = currentPlaylist[currentIndex];
  let btn = document.querySelector(".player-right button");

  let index = library.findIndex(s => s.title === song.title);

  if(index === -1){
    library.push(song);
    btn.innerText = "✓";
    showAlert("Song added to library");
  } else {
    library.splice(index,1);
    btn.innerText = "+";
    showAlert("Song removed from library");
  }

  updateLibrary();
}

function updateLibrary(){
  let box = document.getElementById("libraryList");
  box.innerHTML="";
  library.forEach(s=>{
    let div=document.createElement("div");
    div.className="song-item";
    div.innerText=s.title;
    div.onclick=()=> loadSong(songs.indexOf(s));
    box.appendChild(div);
  });
}

function showAlert(msg){
  let alert = document.createElement("div");
  alert.className="alert";
  alert.innerText=msg;
  document.body.appendChild(alert);
  setTimeout(()=>alert.remove(),2000);
}
function updateQueue(){
  let q=document.getElementById("queueList");
  if(!q) return;
  q.innerHTML="";
  currentPlaylist.slice(currentIndex+1).forEach(s=>{
    let div=document.createElement("div");
    div.innerText=s.title;
    q.appendChild(div);
  });
}

function toggleSettings(){
  document.getElementById("settingsPanel").classList.toggle("active");
}

function searchSongs(){
  let q = document.getElementById("searchInput").value.toLowerCase();
  let results = songs.filter(s => s.title.toLowerCase().includes(q));

  let box = document.getElementById("songList");
  box.innerHTML = "";

  currentPlaylist = results;
  currentIndex = 0;

  results.forEach((song,index)=>{
    let div = document.createElement("div");
    div.className="song-item";
    div.innerHTML = `<img src="${song.thumb}"><span>${song.title}</span>`;
    div.onclick = ()=> loadSong(index);
    box.appendChild(div);
  });
}
function liveSearch(){
  let q = document.getElementById("searchInput").value.toLowerCase();
  let box = document.getElementById("searchResults");
  box.innerHTML = "";

  if(q === ""){
    return;
  }

  let results = songs.filter(s => s.title.toLowerCase().includes(q));

  currentPlaylist = results;
  currentIndex = 0;

  results.forEach((song,index)=>{
    let div = document.createElement("div");
    div.className="song-item";
    div.innerHTML = `<img src="${song.thumb}"><span>${song.title}</span>`;
    div.onclick = ()=> loadSong(index);
    box.appendChild(div);
  });
}



