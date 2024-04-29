console.log("Welcome to spotify");

//VARIABLE INITIALIZATION

let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let audioElement = new Audio('songs/1.mp3');
let Playing = document.getElementById('playingGif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName : "All Around Me", filePath: "songs/1.mp3", coverpath: "covers/1.jpg"},
    {songName : "Intentions", filePath: "songs/2.mp3", coverpath: "covers/2.jpg"},
    {songName : "Yummy", filePath: "songs/3.mp3", coverpath: "covers/3.jpg"},
    {songName : "My Eyes", filePath: "songs/4.mp3", coverpath: "covers/4.jpg"},
    {songName : "Levels - ft.AVICII", filePath: "songs/5.mp3", coverpath: "covers/5.jpg"},
    {songName : "Here", filePath: "songs/6.mp3", coverpath: "covers/6.jpg"},
    {songName : "GooseBumps", filePath: "songs/7.mp3", coverpath: "covers/7.jpg"},
    {songName : "THE SCOTTS - ft.Travis Scott", filePath: "songs/8.mp3", coverpath: "covers/8.jpg"},
    {songName : "The Nights - ft.AVICII", filePath: "songs/9.mp3", coverpath: "covers/9.jpg"},
    {songName : "Stay", filePath: "songs/10.mp3", coverpath: "covers/10.jpg"},
]


songItems.forEach((element, i) => {
    // Access the img element within the current songItem
    let imgElement = element.querySelector('img');
    // Check if imgElement exists before trying to set its src attribute
    imgElement.src = songs[i].coverpath;

    //SETTING THE SONG NAME
    element.querySelector('.SongName').innerText = songs[i].songName;

    //SETTING THE DURATION
    let audio = new Audio(songs[i].filePath);
    audio.addEventListener('loadedmetadata', function() {
        let duration = audio.duration;
        // Convert duration from seconds to minutes:seconds format
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration % 60);
        // Display duration in "mm:ss" format
        element.querySelector('.duration').innerText = `${minutes}:${seconds}`;
    });

});


//PlayButton

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('SongItemPlay')).forEach( (element)=>{
    element.addEventListener('click', (e)=>{
        // console.log(e.target);
        makeAllPlays();
        Playing.style.opacity = 1;
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex].songName;
    })
})


//HANDLE PLAY/PAUSE CLICK
masterPlay.addEventListener('click', ()=>{
     if(audioElement.paused || audioElement.currentTime<=0){
        
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        Playing.style.opacity = 1;
     }
     else{
        audioElement.pause();
        Playing.style.opacity = 0;
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        makeAllPlays();
     }
})


//LISTEN TO EVENTS

audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate');

    //update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})  

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})



 //PREVIOUS SONG

 document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 8;
    }
    else{
        songIndex--;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    // makeAllPlays();
    // let j = document.getElementById(songIndex+1);
    // j.classList.add('fa-pause-circle');
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    Playing.style.opacity = 1;
 })

 document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex++;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    Playing.style.opacity = 1;
 })
