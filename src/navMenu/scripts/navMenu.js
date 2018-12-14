
"use strict";

let isNawMenuShown;

let containerMenu = document.getElementById("containerMenu");
console.log(containerMenu);

let navMenu = document.getElementById("navMenu");
navMenu.addEventListener("click", (evt) =>{
   console.log(evt)
});

let date = document.getElementById("date");
date.value = "2018-01-02";

let button = document.getElementById("button");
button.addEventListener("click", () => {
    date.style.display = "block";
    let d = date.value;
    console.log(d);
    if (d) {
        alert("Your date is " + date.value);
    } else {
        alert("You didn't choose a date");
    };
});

document.getElementById("closeOpenBtn").addEventListener("click", () => {
    if (isNawMenuShown) {
        showNavMenu(false);
    } else {
        showNavMenu(true);
    }
});

function showNavMenu(show) {
    let containerMenu = document.getElementById("containerMenu");
    let closeOpenBtn = document.getElementById("closeOpenBtn");
    let navMenu = document.getElementById("navMenu");

    console.log(containerMenu);
    if (show){
        containerMenu.style.width = "20vw";
        closeOpenBtn.style.left = "20vw";
        navMenu.style.opacity = "1.0"
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        isNawMenuShown = true;
    } else {
        containerMenu.style.width = "0vw";
        closeOpenBtn.style.left = "0vw";
        navMenu.style.opacity = "0.0"
        document.body.style.backgroundColor = "rgba(220, 220, 220, 1.0)";
        isNawMenuShown = false;
    }
}

showNavMenu(false);

