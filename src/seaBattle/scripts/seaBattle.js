"use strict";

let playerOneBattleField = null;
let playerTwoBattleField = null;

let playerOneFogOfWar = document.getElementById("playerOneFogOfWar");
let playerTwoFogOfWar = document.getElementById("playerTwoFogOfWar");

"mouseenter mousemove mouseleave click".split(" ").forEach(event => {
    playerOneFogOfWar.addEventListener(event, handlerMouseEvent);
    playerTwoFogOfWar.addEventListener(event, handlerMouseEvent);
});

document.getElementById("clearBtn").addEventListener("click", () => {
    clearStorage();
    playerOneBattleField.resetBattleField();
    playerTwoBattleField.resetBattleField();
});

window.addEventListener("beforeunload", () => {
    playerOneBattleField.saveBattleField();
    playerTwoBattleField.saveBattleField();
});

initBattleFields();

function initBattleFields() {
    let whoseTurn = retrieveFromStorage(WHOSE_TURN) || PLAYER_ONE;

    playerOneBattleField = new BattleField(PLAYER_ONE, "playerOneBackground", "playerOneFogOfWar",
        "playerOneBlocked", whoseTurn === PLAYER_ONE);
    playerTwoBattleField = new BattleField(PLAYER_TWO, "playerTwoBackground", "playerTwoFogOfWar",
        "playerTwoBlocked", whoseTurn === PLAYER_TWO);

    playerOneBattleField.drawBattleFieldBackground();
    playerOneBattleField.drawBattleFieldFogOfWar();

    playerTwoBattleField.drawBattleFieldBackground();
    playerTwoBattleField.drawBattleFieldFogOfWar();
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
            playerTwoBattleField.updateTurn();
            playerOneBattleField.updateTurn();
            break;
        default:
            break;
    }
}

function findTargetBattleField(event) {
    switch (event.target.id) {
        case playerOneBattleField.idFogOfWar:
            return playerOneBattleField;
        case playerTwoBattleField.idFogOfWar:
            return playerTwoBattleField;
        default:
            return null;
    }
}