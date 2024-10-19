const SONG_LIST = [
  {
    songName: 'Hamna Ankho Sa Dekha Nhi Hai ',
    music: 'naat/Humne Ankhoon Sa Dekha Nahi Hai Magar Naat MP3 Download.mp3',
    album: 'img/hamna-ankho.jpg',
    background: 'img/ankho.jpg',
  },
  {
    songName: 'Wo Mera Nabi Hai',
    music: 'naat/woh-mera-nabi.mp3',
    album: 'img/nabi.jpg',
    background: 'img/mera-nabi.jpg',
  },
  {
    songName: 'Hasbi Rabi Jalallah',
    music: 'naat/hasbi-rabbi-jallallah.mp3',
    album: 'img/Hasbi.jpg',
    background: 'img/Rabi.jpg',
  },
  {
    songName: 'faslon ko takalluf hai humse agar',
    music: 'naat/faslon-ko-takalluf-hai-irulz.com.mp3',
    album: 'img/Kafalo.jpg',
    background: 'img/Takalluf.jpg',
  },
  {
    songName: 'Mera Aqa Mera Maula',
    music: 'naat/Mere-Aaqa-Mere-Mola-Hafiz-Abdul-Qadir.mp3',
    album: 'img/mera-Maula.jpg',
    background: 'img/mera-aqa.jpg',
  },
  {
    songName: 'Aagaya Mustafa',
    music: 'naat/aa-gaye-mustafa.mp3',
    album: 'img/AAgaya.jpg',
    background: 'img/marhaba.jpg',
  },
];
let updateTrack;
let isMixBtnClick,
  isRepeatBtnClick = false;
let mixModeTxt = 'Mix all';
let repeatModeTxt = 'Repeat';
let arrayCount = 0;
let changeWarningText = document.getElementById('change-warning');
let currentMusic = document.getElementById('currentMusic');
let volumeSlider = document.getElementById('volume-slider');
let trackSlider = document.getElementById('track-slider');
const music = document.getElementById('music');
const albumImg = document.getElementById('album-img');
const currentSongName = document.getElementById('current-song-name');
const backgroundImg = document.getElementById('container');
const play = document.getElementById('play');
const rightBtn = document.getElementById('right');
const leftBtn = document.getElementById('left');
const mixBtn = document.getElementById('mix');
const repeatBtn = document.getElementById('repeat');
const menuIcon = document.getElementById('menu-icon');
const menuCancelIcon = document.getElementById('cancel-icon');
const menu = document.querySelector('nav');
const allSongsParent = document.getElementById('all-songs');
const allSongContainer = document.getElementById('all-songs-container');
const addBtn = document.getElementById('add-song-btn');
const newSongContainer = document.getElementById('new-song-container');
const file = document.getElementById('file-picker');

// Event listeners

rightBtn.addEventListener('click', changeSong);
leftBtn.addEventListener('click', changeSong);
play.addEventListener('click', audioPlay);

function changeSong(e) {
  let way = e.target;
  swapBtn(way);
  changeSwapStyle();
  playState();
  mixSongs();
  console.log(arrayCount);
}

function swapBtn(way) {
  if (way === rightBtn) {
    arrayCount++;
  } else if (way === leftBtn) {
    arrayCount--;
  }
  disableSwap();
}

function disableSwap() {
  if (arrayCount >= SONG_LIST.length) {
    return (arrayCount = 0);
  } else if (arrayCount < 0) {
    return (arrayCount = Number(`${SONG_LIST.length - 1}`));
  }
}

function playState() {
  if (play.textContent === '❚ ❚') {
    music.play();
  }
}

function mixSongs() {
  if (isMixBtnClick) {
    arrayCount = Math.floor(Math.random() * SONG_LIST.length);
  }
}

function changeSwapStyle() {
  albumImg.style.background = `url(${SONG_LIST[arrayCount].album}) no-repeat  center center`;
  albumImg.style.backgroundSize = 'cover';
  backgroundImg.style.background = `url(${SONG_LIST[arrayCount].background}) no-repeat  center center`;
  backgroundImg.style.backgroundSize = 'cover';
  currentSongName.innerHTML = `${SONG_LIST[arrayCount].songName}`;
  music.src = `${SONG_LIST[arrayCount].music}`;
}

function audioPlay() {
  const icon = music.paused ? '❚ ❚' : '►';
  play.textContent = icon;
  music.paused ? music.play() : music.pause();
  updateTrack = setInterval(seekUpdate, 1000);
}

//Slider events

volumeSlider.addEventListener('change', changeVolume);
trackSlider.addEventListener('change', changeTrack);
trackSlider.addEventListener('change', seekUpdate);
music.addEventListener('ended', autoSongChange);

function changeVolume() {
  music.volume = volumeSlider.value / 100;
}
function changeTrack() {
  time = music.duration * (trackSlider.value / 100);
  music.currentTime = time;
}

function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(music.duration)) {
    seekPosition = music.currentTime * (100 / music.duration);
    trackSlider.value = seekPosition;
  }
}

function autoSongChange() {
  updateTrack = setInterval(seekUpdate, 1000);
  mixModeSongChange();
  repeatModeSongChange();
  resetAutoChangeIfEnd(updateTrack);
  playState();
  console.log(arrayCount);
}

//Mix & Repeat mode

mixBtn.addEventListener('click', mixModeActive);
repeatBtn.addEventListener('click', repeatModeActive);

function mixModeSongChange() {
  if (isMixBtnClick) {
    mixSongs();
  } else if (isRepeatBtnClick) {
    return;
  } else {
    arrayCount++;
  }
}

function repeatModeSongChange() {
  isRepeatBtnClick ? clearInterval(updateTrack) : changeSwapStyle();
}

function resetAutoChangeIfEnd(clear) {
  if (arrayCount >= SONG_LIST.length - 1) {
    arrayCount = 0;
    clearInterval(clear);
  }
}

function mixModeActive() {
  if (isRepeatBtnClick) {
    return;
  } else if (!isMixBtnClick) {
    ifModeActive(mixBtn, mixModeTxt);
    isMixBtnClick = true;
  } else if (isMixBtnClick) {
    mixBtn.style.transform = 'scale(1)';
    isMixBtnClick = false;
    changeWarning('');
  }
}

function repeatModeActive() {
  if (isMixBtnClick) {
    return;
  } else if (!isRepeatBtnClick) {
    isRepeatBtnClick = true;
    ifModeActive(repeatBtn, repeatModeTxt);
  } else if (isRepeatBtnClick) {
    isRepeatBtnClick = false;
    repeatBtn.style.transform = 'scale(1)';
    changeWarning('');
  }
}

function ifModeActive(button, text) {
  button.style.transform = 'scale(1.3)';
  changeWarning(text);
}

function changeWarning(text) {
  return (changeWarningText.innerText = text);
}

//Menu

menuIcon.addEventListener('click', openMenu);
menuCancelIcon.addEventListener('click', cancelMenu);

function openMenu() {
  menu.style.left = '0';
}

function cancelMenu() {
  menu.style.left = '-20rem';
}

function styleChange(element) {
  element.style.display === 'block'
    ? (element.style.display = 'none')
    : (element.style.display = 'block');
}

//All song list

window.addEventListener('DOMContentLoaded', getAllSongList);
allSongContainer.addEventListener('click', showAllSongList);

function getAllSongList() {
  for (let i = 0; i < SONG_LIST.length; i++) {
    let li = document.createElement('li');
    li.innerHTML = SONG_LIST[i].songName;
    li.classList.add('allSongsListElements');
    allSongAppend(li);
  }
  let chooseSong = Array.from(
    document.querySelectorAll('.allSongsListElements')
  );
  chooseSong.forEach(function (e) {
    e.addEventListener('click', function () {
      let song = chooseSong.indexOf(e);
      arrayCount = song;
      changeSwapStyle();
      playState();
    });
  });
}
function allSongAppend(li) {
  return allSongsParent.append(li);
}

function showAllSongList() {
  styleChange(allSongsParent);
}

//Add new song (only work locally)

addBtn.addEventListener('click', newSongPage);
file.addEventListener('change', addNewSong, false);
window.addEventListener('DOMContentLoaded', local);

function local() {
  let newSongJson = localStorage.getItem('addedSongs');
  newSongJson = JSON.parse(newSongJson);
  SONG_LIST.push(newSongJson);
}

function newSongPage() {
  styleChange(newSongContainer);
}

function addNewSong() {
  for (let i = 0; i < this.files.length; i++) {
    const newAudio = document.createElement('audio');
    newAudio.src = URL.createObjectURL(this.files[i]);
    newAudio.onload = () => {
      URL.revokeObjectURL(newAudio.src);
    };
    const newSongObj = {
      music: newAudio.src,
      songName: 'deneme',
      background: 'img/sample.jpg',
      album: 'img/album-sample.jpg',
    };
    SONG_LIST.push(newSongObj);
    localStorage.setItem('addedSongs', JSON.stringify(newSongObj));
  }
}
