
"use strict";

let date = document.getElementById("date")
date.value = "2018-01-02"

let button = document.getElementById("button")

button.addEventListener("click", () => {
    let d = date.value
    console.log(d)
    if (d) {
        alert("Your date is " + date.value)
    } else {
        alert("You didn't choose a date")
    }
})