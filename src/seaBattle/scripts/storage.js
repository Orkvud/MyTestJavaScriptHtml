"use strict";

const WHOSE_TURN = "whose_turn";
const PLAYER_ONE = "player_one";
const PLAYER_TWO = "player_two";

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function retrieveFromStorage(key) {
    let value = localStorage.getItem(key);
    return value && JSON.parse(value);
}

function clearStorage() {
    localStorage.clear();
}