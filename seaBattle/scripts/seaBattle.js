const selectedColorCell = "#ff607c";
const unSelectedColorCell = "#ffcd6d";
const borderColorCell = "#000";

let battleField = {rowsCount: 0, columnsCount: 0, rowHeight: 0, columnWidth: 0};
let selectedCell = null;

document.getElementById("battleField").addEventListener("click", (e) => {
    console.log(e);
    let oldSelectedCell = selectedCell;
    selectedCell = determiningCoordinatesPressedCell(battleField, e);
    selectedCell = changeColorCell(battleField, selectedCell, oldSelectedCell);
});

initBattleField(battleField, 3, 5, 80, 80);
drawBattleField(battleField);

let requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

function initBattleField(bf, rowsCount, columnsCount, rowHeight, columnWidth) {
    bf.rowsCount = rowsCount;
    bf.columnsCount = columnsCount;
    bf.rowHeight = rowHeight;
    bf.columnWidth = columnWidth;
}

function drawBattleField(bf) {
    let canvas = document.getElementById("battleField");

    if (canvas.getContext) {
        canvas.width = bf.columnsCount * bf.columnWidth;
        canvas.height = bf.rowsCount * bf.rowHeight;
        let ctx = canvas.getContext("2d");

        for (let r = 0; r < bf.rowsCount; r++) {
            for (let c = 0; c < bf.columnsCount; c++) {
                ctx.fillStyle = selectedColorCell;
                ctx.fillRect (c * bf.columnWidth, r * bf.rowHeight, bf.rowHeight, bf.columnWidth);

                ctx.strokeStyle = borderColorCell;
                ctx.strokeRect (c * bf.columnWidth, r * bf.rowHeight, bf.rowHeight, bf.columnWidth);
            }
        }
    }
}

function determiningCoordinatesPressedCell(bf, event) {
    let row = Math.floor(event.layerY / bf.rowHeight);
    let column = Math.floor(event.layerX / bf.columnWidth);

    return {row: row, column: column};
}

function changeColorCell(bf, sc, usc) {
    let canvas = document.getElementById("battleField");

    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");

        if (usc) {
            ctx.clearRect(usc.column * bf.columnWidth, usc.row * bf.rowHeight, bf.rowHeight, bf.columnWidth);

            ctx.fillStyle = selectedColorCell;
            ctx.fillRect (usc.column * bf.columnWidth, usc.row * bf.rowHeight, bf.rowHeight, bf.columnWidth);

            ctx.strokeStyle = borderColorCell;
            ctx.strokeRect (usc.column * bf.columnWidth, usc.row * bf.rowHeight, bf.rowHeight, bf.columnWidth);
        }

        if (usc && simpleCompare(sc, usc)) {
            return null;
        }

        ctx.clearRect(sc.column * bf.columnWidth, sc.row * bf.rowHeight, bf.rowHeight, bf.columnWidth);

        ctx.fillStyle = unSelectedColorCell;
        ctx.fillRect (sc.column * bf.columnWidth, sc.row * bf.rowHeight, bf.rowHeight, bf.columnWidth);

        ctx.strokeStyle = borderColorCell;
        ctx.strokeRect (sc.column * bf.columnWidth, sc.row * bf.rowHeight, bf.rowHeight, bf.columnWidth);

        requestAnimationFrame()
    }

    return sc;
}

function simpleCompare(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}