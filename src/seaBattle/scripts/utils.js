"use strict";

function determiningCoordinatesCell(bf, layerX, layerY) {
    let row = Math.floor(layerY / bf.cellHeight);
    let column = Math.floor(layerX / bf.cellWidth);

    return {row: row, column: column};
}

function simpleCompare(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function duplicateObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function isObject(obj) {
    return obj === Object(obj);
}