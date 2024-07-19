let currentsong = new Audio();
let curralbum;
let albumnaam;
let gaanaz = [];




// getting all songs from api
let getallsongs = async (albums)=>{
    let songs = await fetch(`${albums}`);
    let response = await songs.text();
    let div = document.createElement("div");
    div.innerHTML=response;
    let as = div.getElementsByTagName("a");
    let allsongs =[];
    // gaanaz = []
    for (let index = 0; index < as.length; index++) {
        const e = as[index];
        
    if(e.href.endsWith(".mp3")){
        allsongs.push(e.href)
        // gaanaz.push(e.href)
    }
}
return allsongs;
    
}
let displayupnext = async (albums) => {
    curralbum = albums;
    let allsong = await getallsongs(`${albums}`);


// changing album name in upnext
let albumname = document.querySelector(".albumname");
    for (let song of allsong) {
         albumnaam = song.split("/").slice(4)[0].replaceAll("%20"," ");
    }
    albumname.innerHTML = "";
    albumname.innerHTML = albumname.innerHTML + `<img src="./songs/${albumnaam}/cover.jpg" alt="">
      <h4>${albumnaam}</h4>`
      // changing songs name in up next
      let nextsongs = document.querySelector(".nextsongs");
      nextsongs.innerHTML ="";
      gaanaz =[];
      for (let song of allsong) {
          
           song = song.split("/").slice(5)[0].split("-").slice(0)[0].replaceAll("%20"," ").replaceAll(".mp3","");
              if(song.endsWith(".mp3")){
                   song = song.split(" ").splice(0,2).toString().replaceAll(","," ")
                }
                gaanaz.push(song);
              nextsongs.innerHTML = nextsongs.innerHTML + `<div class="nextsong">
                <img src="./songs/${albumnaam}/cover.jpg" alt="">
                <p>${song}</p>
                </div>`
      }
      let g = document.querySelectorAll(".nextsong").forEach((e)=>{
        e.addEventListener("click",()=>{
            playmusic(e.querySelector(".nextsong p").innerHTML + ".mp3")
        })
      })
      return allsong;
    }
    

// display all album in the songs folder:-
let albumcards = document.querySelector(".albumcards")
let displayalbums = async ()=>{
    let f  = await fetch(`./songs`);
    let response = await f.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    for (let index = 0; index < as.length; index++) {
        const e = as[index];
        if(e.href.includes("/songs/")){
            let albums = e.href.split("/").slice(4)[0].replaceAll("%20"," ");
            let i = await fetch(`./songs/${albums}/info.json`);
            let inf = await i.json();

            albumcards.innerHTML = albumcards.innerHTML + `<div data-name ="${albums}" class="card">
            <img class="playsvg" src="./svgs/cardplay.svg" alt="">
            <div class="cardimg">
              <img src="./songs/${albums}/cover.jpg" alt="">
            </div>
              <h3>${inf.album}</h3>
              <p>${inf.artist}</p>
          </div>`
        }
        
    }
    let cards = document.querySelectorAll(".card");
    cards.forEach((e)=>{
        e.addEventListener("click",async item=>{
           let  g =  await displayupnext(`./songs/${item.currentTarget.dataset.name}`);
           if(mediaquery.matches){
            upnextbar.style.height = "79svh";
            upnextbar.style.visibility = "visible";
           }else{
               upnextbar.classList.add("upnextopen")
            }

        })
    })
}
displayalbums();

  // playmusic fucntion
  let playmusic = (gaana)=>{
    // duration.innerHTML = ""
    currentsong.src = `./${curralbum}/` + gaana;
    currentsong.play();
    play.src = "./svgs/pause.svg";
    currentsong.volume = 100 / 100;
    volume.value = 100;
}

// play pause button
let play = document.querySelector("#play");
play.addEventListener("click",(e)=>{
    // e.stopPropagation();
    if(currentsong.paused){
        currentsong.play();
        play.src = "./svgs/pause.svg"
    }else{
        currentsong.pause();
         play.src = "./svgs/play.svg"
    }
})

// volume setting

let volume = document.querySelector(".volume input");
let volumeimg = document.querySelector(".volume img")
volume.addEventListener("change",()=>{
    currentsong.volume =volume.value / 100;
    if(volume.value == 0){
        volumeimg.src = "./svgs/mute.svg";
    }else{
        volumeimg.src = "./svgs/volume.svg";
    }
})

// mute song
let vol;
volumeimg.addEventListener("click",()=>{
    if(volumeimg.src.includes("/volume.svg")){
        volumeimg.src = "./svgs/mute.svg";
        vol = currentsong.volume 
        currentsong.volume = 0;
        volume.value = 0
    }else{
        volumeimg.src = "./svgs/volume.svg";
        currentsong.volume = vol
        volume.value = vol*100;
    }
})

// seekbar 
let seekbar = document.querySelector(".seekbar input")
seekbar.addEventListener("change",(e)={
    
})

// next button
let nextbtn = document.querySelector("#next");
nextbtn.addEventListener("click",(e)=>{
    e.stopPropagation();
    let a=gaanaz;
    let i = a.indexOf(currentsong.src.split("/").slice(5)[0].replaceAll("%20"," ").replaceAll(".mp3",""))
    if((i+1) <a.length){
        playmusic(a[i+1] + ".mp3");
    }
})

// previous button
let prevbtn  = document.querySelector("#previous");
prevbtn.addEventListener("click",(e)=>{
    e.stopPropagation();
    let a1 = gaanaz;
    let idx = a1.indexOf(currentsong.src.split("/").slice(5)[0].replaceAll("%20"," ").replaceAll(".mp3",""));
    if((idx-1)>=0){
        playmusic(a1[idx-1] + ".mp3");
    }
})


// edit duration of the song
function secondsToMinutesAndSeconds(seconds) {
    if(isNaN(seconds) || seconds <0){
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Pad with leading zeros if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedMinutes}:${formattedSeconds}`;
}
// updating time and changing seekbar in playbar
let songtime = document.querySelector(".runsongtime");
let duration = document.querySelector(".duration");
currentsong.addEventListener("timeupdate",()=>{
    songtime.innerHTML = `${secondsToMinutesAndSeconds(currentsong.currentTime)}`;
    duration.innerHTML = `${secondsToMinutesAndSeconds(currentsong.duration)}`;
    seekbar.value = Math.floor((currentsong.currentTime / currentsong.duration) * 500);
})


// loop on album
currentsong.onended = ()=>{
    let a=gaanaz;
    let i = a.indexOf(currentsong.src.split("/").slice(5)[0].replaceAll("%20"," ").replaceAll(".mp3",""))
    if((i+1) <a.length){
        playmusic(a[i+1] + ".mp3");
    }
}

document.addEventListener("keydown",(e)=>{
    if (e.code === 'space' || e.key === " "){
        console.log("dabb gya")
        if(currentsong.paused){
            currentsong.play();
            play.src = "./svgs/pause.svg"
        }else{
            currentsong.pause();
             play.src = "./svgs/play.svg"
        } 
    }
})


























































// let getalbumkanaam = async()=>{
//     let naam = await fetch ("./songs/Moosetape");
//     let response = await naam.text();
//     // console.log(response);
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     // console.log(div)
//     let as = div.getElementsByTagName("a");
//     let arrays = Array.from(as);
//     // console.log(arrays);
//    for (let index =0; index < arrays.length; index++) {
//      let a = arrays[index];
//     if(a.href.endsWith(".mp3")){
//         // console.log(e);
//         let albumnaam = a.href.split("/").slice(4)[0].replaceAll("%20"," ");
//         // console.log(albumnaam);
//         albumname.innerText =  `${albumnaam}`
//     }   
//    }
// }
// getalbumkanaam();




// let getsongs = async()=>{
// let s = await fetch ("./songs/Four ME");
// let response = await s.text();
// // console.log(response)
// let div = document.createElement("div");
// div.innerHTML = response;
// // console.log(div)
// let as = div.getElementsByTagName("a");
// // console.log(as)
// let songarray = Array.from(as);
// for (let index = 0; index < songarray.length; index++) {
//     const a = songarray[index];
//     if(a.href.endsWith(".mp3")){
//          songnaam = a.href.split("/").slice(5)[0].split("-").slice(0)[0].replaceAll("%20"," ");
//         if(songnaam.endsWith(".mp3")){
//              songnaam = songnaam.split(" ").splice(0,2).toString().replaceAll(","," ")
//         }
//         upnext.innerHTML = upnext.innerHTML + `<div class="nextsongs">
//           <img src="./images/karanaujla.jpg" alt="">
//           <p>${songnaam}</p>
//           </div>`
//     }
    
//     // console.log(songnaam)
// }
// }
// getsongs()