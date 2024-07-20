let sidebar = document.querySelector(".sidebar img");
let side1 = document.querySelector(".side1");
let closebar = document.querySelector(".close img");
let upnexticon = document.querySelector(".upnexticon");
let upnextbar = document.querySelector(".upnext");
let closeupnext = document.querySelector(".closeupnext");
const mediaquery = window.matchMedia("(max-width:450px)");
let playbar = document.querySelector(".playbar");

sidebar.addEventListener("click", () => {
    side1.style.width = "80svw";
    side1.style.visibility = "visible";
});

closebar.addEventListener("click", () => {
    side1.style.width = "0svw";
    side1.style.visibility = "hidden";
});
if (mediaquery.matches) {
    playbar.addEventListener("click", () => {
        if (upnextbar.style.visibility === "hidden") {
            upnextbar.style.height = "79svh";
            upnextbar.style.visibility = "visible";
        } else {
            upnextbar.style.height = "0";
            upnextbar.style.visibility = "hidden";
        }
    });
    closeupnext.addEventListener("click", () => {
        upnextbar.style.height = "0";
        upnextbar.style.visibility = "hidden";
    });
} else {
    upnexticon.addEventListener("click", () => {
        if (upnextbar.classList.contains("upnextopen")) {
            upnextbar.classList.remove("upnextopen");
        } else {
            upnextbar.classList.add("upnextopen");
        }
    });

    closeupnext.addEventListener("click", () => {
        upnextbar.classList.remove("upnextopen");
    });
}


if (mediaquery.matches) {
    let artists = document.querySelectorAll(".artist")
    artists.forEach((e) => {
        e.addEventListener("click", () => {
            side1.style.width = "0svw";
            side1.style.visibility = "hidden";
        })

    })
    let home = document.querySelector(".home");
    home.addEventListener("click", () => {
        side1.style.width = "0svw";
        side1.style.visibility = "hidden";
    })
    
}
