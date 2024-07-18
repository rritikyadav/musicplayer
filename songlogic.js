let currentsong;
let albumnaam;
let curralbum;




// getting all songs from api
let getallsongs = async (albums)=>{
    console.log(albums)
     curralbum = albums;
    let songs = await fetch(`./${albums}`);
    let response = await songs.text();
    let div = document.createElement("div");
    div.innerHTML=response;
    let as = div.getElementsByTagName("a");
    let allsongs =[];
    for (let index = 0; index < as.length; index++) {
        const e = as[index];
        
    if(e.href.endsWith(".mp3")){
        allsongs.push(e.href)
    }
}
return allsongs;
    
}

let displayupnext = async (album) => {
    curralbum = album;
    let allsongs = await getallsongs(`${album}`);


// changing album name in upnext
let albumname = document.querySelector(".albumname");
    for (let song of allsongs) {
         albumnaam = song.split("/").slice(4)[0].replaceAll("%20"," ");
    }
    albumname.innerHTML = "";
    albumname.innerHTML = albumname.innerHTML + `<img src="./songs/${albumnaam}/cover.jpg" alt="">
      <h4>${albumnaam}</h4>`
      // changing songs name in up next
      let nextsongs = document.querySelector(".nextsongs");
      nextsongs.innerHTML =""
      for (let song of allsongs) {
          
           song = song.split("/").slice(5)[0].split("-").slice(0)[0].replaceAll("%20"," ");
              if(song.endsWith(".mp3")){
                   song = song.split(" ").splice(0,2).toString().replaceAll(","," ")
              }
              nextsongs.innerHTML = nextsongs.innerHTML + `<div class="nextsong">
                <img src="./songs/${albumnaam}/cover.jpg" alt="">
                <p>${song}</p>
                </div>`
      }
    
}

// display all album in the songs folder:-
let albumcards = document.querySelector(".albumcards")
let displayalbums = async ()=>{
    let f  = await fetch(`./songs`);
    let response = await f.text();
    console.log(response)
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    for (let index = 0; index < as.length; index++) {
        const e = as[index];
        if(e.href.includes("/songs/")){
            console.log(e.href.split("/"))
            let albums = e.href.split("/").slice(4)[0].replaceAll("%20"," ");
            console.log(albums)
            let i = await fetch(`./songs/${albums}/info.json`);
            let inf = await i.json();

            albumcards.innerHTML = albumcards.innerHTML + `<div data-name ="${albums}" class="card">
            <img class="playsvg" src="./svgs/play.svg" alt="">
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
           allsongs =  await displayupnext(`./songs/${item.currentTarget.dataset.name}`);
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