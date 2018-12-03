"use strict";

let yourBattleField = null;
let opponentBattleField = null;

document.getElementById("yourBattleField").addEventListener("mouseenter", (e) => {
    handlerMouseEvent(e);
});

document.getElementById("opponentBattleField").addEventListener("mouseenter", (e) => {
    handlerMouseEvent(e);
});

document.getElementById("yourBattleField").addEventListener("mousemove", (e) => {
    handlerMouseEvent(e);
});

document.getElementById("opponentBattleField").addEventListener("mousemove", (e) => {
    handlerMouseEvent(e);
});

document.getElementById("yourBattleField").addEventListener("mouseleave", (e) => {
    handlerMouseEvent(e);
});

document.getElementById("opponentBattleField").addEventListener("mouseleave", (e) => {
    handlerMouseEvent(e);
});

document.getElementById("yourBattleField").addEventListener("click", (e) => {
    handlerMouseEvent(e);
});

document.getElementById("opponentBattleField").addEventListener("click", (e) => {
    handlerMouseEvent(e);
});

initBattleFields(10, 10, 40, 40);

function initBattleFields(rowsCount, columnsCount, rowHeight, columnWidth) {
    yourBattleField = new BattleField({rowsCount: rowsCount, columnsCount: columnsCount,
        rowHeight: rowHeight, columnWidth: columnWidth}, "yourBattleField", "yourBattleFieldBackground");

    opponentBattleField = new BattleField({rowsCount: rowsCount, columnsCount: columnsCount,
        rowHeight: rowHeight, columnWidth: columnWidth}, "opponentBattleField", "opponentBattleFieldBackground");

    yourBattleField.drawBattleFieldBackground("https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg");
    yourBattleField.drawBattleField();

    opponentBattleField.drawBattleFieldBackground("https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
    opponentBattleField.drawBattleField();
}

function handlerMouseEvent(event) {
    switch (event.type) {
        case "mouseenter":
            if (event.target.id === "yourBattleField") {
                yourBattleField.mouseEnter(event);
            } else if (event.target.id === "opponentBattleField") {
                opponentBattleField.mouseEnter(event);
            }
            break;
        case "mousemove":
            if (event.target.id === "yourBattleField") {
                yourBattleField.mousemove(event);
            } else if (event.target.id === "opponentBattleField") {
                opponentBattleField.mousemove(event);
            }
            break;
        case "mouseleave":
            if (event.target.id === "yourBattleField") {
                yourBattleField.mouseleave();
            } else if (event.target.id === "opponentBattleField") {
                opponentBattleField.mouseleave();
            }
            break;
        case "click":
            if (event.target.id === "yourBattleField") {
                yourBattleField.onClick(event);
            } else if (event.target.id === "opponentBattleField") {
                opponentBattleField.onClick(event);
            }
            break;
        default:
            break;
    }
}