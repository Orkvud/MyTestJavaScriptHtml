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

window.addEventListener("beforeunload", () => {
    saveToLocalStorage("yourBattleFieldBackground", yourBattleField.battleField);
    saveToLocalStorage("opponentBattleFieldBackground", opponentBattleField.battleField);
    saveToLocalStorage("yourBattleField", yourBattleField.fogOfWar);
    saveToLocalStorage("opponentBattleField", opponentBattleField.fogOfWar);
})

initBattleFields();

function initBattleFields() {
    yourBattleField = new BattleField("yourBattleField", "yourBattleFieldBackground");

    opponentBattleField = new BattleField("opponentBattleField", "opponentBattleFieldBackground");

    yourBattleField.drawBattleFieldBackground();
    yourBattleField.drawBattleField();

    opponentBattleField.drawBattleFieldBackground();
    opponentBattleField.drawBattleField();
}

function handlerMouseEvent(event) {
    let battleField = findTargetObject(event);
    switch (event.type) {
        case "mouseenter":
            battleField.mouseEnter(event.layerX, event.layerY);
            break;
        case "mousemove":
            battleField.mousemove(event.layerX, event.layerY);
            break;
        case "mouseleave":
            battleField.mouseleave();
            break;
        case "click":
            battleField.onClick(event.layerX, event.layerY);
            break;
        default:
            break;
    }
}

function findTargetObject(event) {
    switch (event.target.id) {
        case "yourBattleField":
            return yourBattleField;
        case "opponentBattleField":
            return opponentBattleField;
        default:
            return null;
    }
}