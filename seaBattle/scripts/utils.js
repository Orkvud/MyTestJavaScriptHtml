"use strict";

function determiningCoordinatesCell(bf, event) {
    let row = Math.floor(event.layerY / bf.rowHeight);
    let column = Math.floor(event.layerX / bf.columnWidth);

    return {row: row, column: column};
}

function simpleCompare(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}