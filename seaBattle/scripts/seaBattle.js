"use strict";

let yourBattleField = null;
let opponentBattleField = null;

document.getElementById("yourBattleFieldFogOfWar").addEventListener("mouseenter", (e) => {
    handlerMouseEvent(e);
});

document.getElementById("opponentBattleFieldFogOfWar").addEventListener("mouseenter", (e) => {
    handlerMouseEvent(e);
});

document.getElementById("yourBattleFieldFogOfWar").addEventListener("mousemove", (e) => {
    handlerMouseEvent(e);
});

document.getElementById("opponentBattleFieldFogOfWar").addEventListener("mousemove", (e) => {
    handlerMouseEvent(e);
});

document.getElementById("yourBattleFieldFogOfWar").addEventListener("mouseleave", (e) => {
    handlerMouseEvent(e);
});

document.getElementById("opponentBattleFieldFogOfWar").addEventListener("mouseleave", (e) => {
    handlerMouseEvent(e);
});

document.getElementById("yourBattleFieldFogOfWar").addEventListener("click", (e) => {
    handlerMouseEvent(e);
});


document.getElementById("opponentBattleFieldFogOfWar").addEventListener("click", (e) => {
    handlerMouseEvent(e);
});

document.getElementById("clearBtn").addEventListener("click", () => {
    localStorage.clear();
    yourBattleField.resetBattleField();
    opponentBattleField.resetBattleField();
});

window.addEventListener("beforeunload", () => {
    saveToLocalStorage("yourBattleFieldBackground", yourBattleField.battleFieldBackground);
    saveToLocalStorage("opponentBattleFieldBackground", opponentBattleField.battleFieldBackground);
    saveToLocalStorage("yourBattleFieldFogOfWar", yourBattleField.battleFieldFogOfWar);
    saveToLocalStorage("opponentBattleFieldFogOfWar", opponentBattleField.battleFieldFogOfWar);
    saveToLocalStorage("whoseTurn", yourBattleField.isTurn ? "myTurn" : "opponentTurn")
});

initBattleFields();

function initBattleFields() {
    let whoseTurn = retrieveFromLocalStorage("whoseTurn");

    yourBattleField = new BattleField("yourBattleFieldBackground", "yourBattleFieldFogOfWar",
        "yourSideCover", whoseTurn === "myTurn");
    opponentBattleField = new BattleField("opponentBattleFieldBackground", "opponentBattleFieldFogOfWar",
        "opponentSideCover", whoseTurn === "opponentTurn");

    yourBattleField.drawBattleFieldBackground();
    yourBattleField.drawBattleFieldFogOfWar();

    opponentBattleField.drawBattleFieldBackground();
    opponentBattleField.drawBattleFieldFogOfWar();
}

function handlerMouseEvent(event) {
    let battleField = findTargetBattleField(event);
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
            opponentBattleField.updateTurn();
            yourBattleField.updateTurn();
            break;
        default:
            break;
    }
}

function findTargetBattleField(event) {
    switch (event.target.id) {
        case "yourBattleFieldFogOfWar":
            return yourBattleField;
        case "opponentBattleFieldFogOfWar":
            return opponentBattleField;
        default:
            return null;
    }
}