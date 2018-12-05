"use strict";

function determiningCoordinatesCell(bf, layerX, layerY) {
    let row = Math.floor(layerY / bf.rowHeight);
    let column = Math.floor(layerX / bf.columnWidth);

    return {row: row, column: column};
}

function simpleCompare(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function retrieveFromLocalStorage(key) {
    let value = localStorage.getItem(key);
    return value && JSON.parse(value);
}

function isObject(obj) {
    return obj === Object(obj);
}