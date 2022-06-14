console.log('Spotify Clone');

let songIndex = 0;
let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById("masterPlay");
let gif = document.getElementById("gif");
let myProgressBar = document.getElementById("progressBar");
let songItems = Array.from(document.getElementsByClassName("songItems"));
let masterSongName = document.getElementById("masterSongName");

let songs = [
    { songName: "Salame Ishq1", filePath: "1.mp3", songCover: "1.jpg" },
    { songName: "Salame Ishq2", filePath: "2.mp3", songCover: "2.jpg" },
    { songName: "Salame Ishq3", filePath: "3.mp3", songCover: "3.jpg" },
    { songName: "Salame Ishq4", filePath: "4.mp3", songCover: "4.jpg" },
    { songName: "Salame Ishq5", filePath: "5.mp3", songCover: "5.jpg" },
    { songName: "Salame Ishq6", filePath: "5.mp3", songCover: "6.jpg" },
    { songName: "Salame Ishq7", filePath: "7.mp3", songCover: "7.jpg" },
    { songName: "Salame Ishq8", filePath: "8.mp3", songCover: "8.jpg" },
    { songName: "Salame Ishq9", filePath: "9.mp3", songCover: "9.jpg" },
    { songName: "Salame Ishq10", filePath: "10.mp3", songCover: "10.jpg" }
];

songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].songCover;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("playItemsSong")).forEach((element) => {
        element.classList.add("fa-circle-play");
    })
}

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        document.getElementById(songIndex.toString()).classList.replace('fa-circle-play', 'fa-circle-pause');

    } else {
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0;
        makeAllPlays();
    }
})


audioElement.addEventListener('timeupdate', () => {
    // console.log('timeUpdate');
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress);
    myProgressBar.value = progress

    let timeSpan = Array.from(document.getElementsByClassName("timeSpan"));
    timeSpan[songIndex].innerHTML = String(Math.floor(parseInt(audioElement.currentTime) / 60)).padStart(2, "0") + ":" + String(parseInt(audioElement.currentTime) % 60).padStart(2, "0");

    if (progress === 100) {
        makeAllPlays();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0;
    }
})

const makeAllTimeSpanZero = () => {
    Array.from(document.getElementsByClassName("timeSpan")).forEach((element) => {
        element.innerHTML = "00:00";
    })
}

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;

})




Array.from(document.getElementsByClassName("playItemsSong")).forEach((element) => {
    element.addEventListener("click", (e) => {
        console.log(e.target);
        makeAllPlays();

        songIndex = parseInt(e.target.id);


        // let z = e.currentTarget;
        // z.clicks = (z.clicks || 0) + 1;
        // console.log(z.clicks + " " + songIndex);

        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");

        audioElement.src = `${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        masterSongName.innerHTML = songs[songIndex].songName;

        makeAllTimeSpanZero();

    })

})


document.getElementById("next").addEventListener("click", () => {

    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerHTML = songs[songIndex].songName;
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(songIndex.toString()).classList.replace('fa-circle-play', 'fa-circle-pause');

    makeAllTimeSpanZero();
})

document.getElementById("previous").addEventListener("click", () => {

    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerHTML = songs[songIndex].songName;
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(songIndex.toString()).classList.replace('fa-circle-play', 'fa-circle-pause');

    makeAllTimeSpanZero();
})
