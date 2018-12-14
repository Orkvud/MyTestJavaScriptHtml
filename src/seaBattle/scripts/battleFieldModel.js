"use strict";

const CELL_DATA = {cellHeight: 40, cellWidth: 40};

function BattleField(id, idBackground, idFogOfWar, idBlocked, isMyTurn = false) {
    this.id = id;

    this.targetCell = null;
    this.selectedCell = null;

    this.idBackground = idBackground;
    this.idFogOfWar = idFogOfWar;
    this.idBlocked = idBlocked;

    this.fillShowFogOfWarCellColor = "rgb(160, 160, 160)";
    this.fillHideFogOfWarCellColor = "rgba(160, 160, 160, 0.0)";
    this.fillShowTargetFogOfWarCellColor = "rgb(130, 130, 130, 1.0)";
    this.fillHideTargetFogOfWarCellColor = "rgb(130, 130, 130, 0.2)";
    this.borderColorCell = "rgb(0, 0, 0)";
    this.seaColor = "rgb(136, 185, 255)";
    this.shipColor = "rgb(0, 0, 0, 0.4)";
    this.strickenShipColor = "rgb(255, 164, 103)";
    this.bombColor = "rgb(255, 25, 25)";
    this.usedBombColor = "rgb(255, 145, 175)";

    this.battleFieldBackground = retrieveFromStorage(this.idBackground) || duplicateObject(defaultBattleFieldBackground);
    this.battleFieldFogOfWar = retrieveFromStorage(this.idFogOfWar) || duplicateObject(defaultBattleFieldFogOfWar);

    this.rows = defaultBattleFieldBackground.length;
    this.columns = defaultBattleFieldBackground[0].length;

    this.isMyTurn = initMuTurn(isMyTurn, this.idBlocked);
}

function initMuTurn(isMyTurn, id) {
    document.getElementById(id).style.visibility = isMyTurn ? "hidden" : "visible";
    return isMyTurn;
}

BattleField.prototype.drawBattleFieldBackground = function (src) {
    drawBattleFieldBackground.call(this, [src, this.idBackground, this.battleFieldBackground, CELL_DATA,
        this.columns, this.rows, this.seaColor, this.borderColorCell, this.determiningColorObject])
    // let canvas = document.getElementById(this.idBackground);
    //
    // if (canvas.getContext) {
    //     let columnWidth = CELL_DATA.cellWidth;
    //     let rowHeight = CELL_DATA.cellHeight;
    //
    //     canvas.width = this.columns * columnWidth;
    //     canvas.height = this.rows * rowHeight;
    //     let ctx = canvas.getContext("2d");
    //
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     if (src) {
    //         let img = new Image;
    //         img.onload = function () {
    //             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //         };
    //
    //         img.src = src;
    //
    //         // img.src = "https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg";
    //         // img.src = "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
    //         // img.src = "http://hd.wallpaperswide.com/thumbs/beautiful_autumn_landscape_6-t2.jpg"
    //     } else {
    //         ctx.fillStyle = this.seaColor;
    //         ctx.fillRect (0, 0, canvas.width, canvas.height);
    //
    //         ctx.strokeStyle = this.borderColorCell;
    //         ctx.strokeRect (0, 0, canvas.width, canvas.height);
    //     }
    //
    //     for (let row = 0; row < this.rows; row++) {
    //         for (let column = 0; column < this.columns; column++) {
    //             if (this.battleFieldBackground[row][column] !== stateBG.EMPTY) {
    //                 ctx.fillStyle = this.determiningColorObject(this.battleFieldBackground[row][column]);
    //                 ctx.beginPath();
    //                 ctx.arc ((column * columnWidth + (columnWidth/2)), (row * rowHeight + (rowHeight/2)),
    //                     columnWidth/4, 0, 360);
    //                 ctx.fill();
    //             }
    //         }
    //     }
    // }
};

BattleField.prototype.drawBattleFieldFogOfWar = function () {
    let canvas = document.getElementById(this.idFogOfWar);

    if (canvas.getContext) {
        let columnWidth = CELL_DATA.cellWidth;
        let rowHeight = CELL_DATA.cellHeight;

        canvas.width = this.columns * columnWidth;
        canvas.height = this.rows * rowHeight;
        let ctx = canvas.getContext("2d");

        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                ctx.clearRect(column * columnWidth, row * rowHeight, rowHeight, columnWidth);

                ctx.fillStyle = this.determiningColorFogOfWar(this.battleFieldFogOfWar[row][column]);
                ctx.fillRect (column * columnWidth, row * rowHeight, rowHeight, columnWidth);

                ctx.strokeStyle = this.borderColorCell;
                ctx.strokeRect (column * columnWidth, row * rowHeight, rowHeight, columnWidth);
            }
        }
    }
};

BattleField.prototype.drawCell = function (idCanvas, cell, color, borderColorCell) {
    let canvas = document.getElementById(idCanvas);

    if (canvas.getContext) {
        let columnWidth = CELL_DATA.cellWidth;
        let rowHeight = CELL_DATA.cellHeight;

        let ctx = canvas.getContext("2d");

        ctx.clearRect(cell.column * columnWidth, cell.row * rowHeight, rowHeight, columnWidth);

        ctx.fillStyle = color;
        ctx.fillRect (cell.column * columnWidth, cell.row * rowHeight, rowHeight, columnWidth);

        ctx.strokeStyle = borderColorCell;
        ctx.strokeRect (cell.column * columnWidth, cell.row * rowHeight, rowHeight, columnWidth);
    }
};

BattleField.prototype.drawGameObject = function (idCanvas, cell, color) {
    let canvas = document.getElementById(idCanvas);

    if (canvas.getContext) {
        let columnWidth = CELL_DATA.cellWidth;
        let rowHeight = CELL_DATA.cellHeight;

        let ctx = canvas.getContext("2d");

        ctx.clearRect(cell.column * columnWidth, cell.row * rowHeight, columnWidth, rowHeight);

        ctx.fillStyle = this.seaColor;
        ctx.fillRect (cell.column * columnWidth, cell.row * rowHeight, columnWidth, rowHeight);

        ctx.fillStyle = color || this.determiningColorObject(this.battleFieldBackground[cell.row][cell.column]);
        ctx.beginPath();
        ctx.arc ((cell.column * columnWidth + (columnWidth/2)), (cell.row * rowHeight + (rowHeight/2)),
            columnWidth/4, 0, 360);
        ctx.fill();
    }
};

BattleField.prototype.drawChangeTargetCellView = function (oldTargetCell, targetCell) {
    let canvas = document.getElementById(this.idFogOfWar);

    if (canvas.getContext) {
        let columnWidth = CELL_DATA.cellWidth;
        let rowHeight = CELL_DATA.cellHeight;

        let ctx = canvas.getContext("2d");

        if (oldTargetCell) {
            ctx.clearRect(oldTargetCell.column * columnWidth, oldTargetCell.row * rowHeight, rowHeight, columnWidth);

            ctx.fillStyle = this.determiningColorFogOfWar(this.battleFieldFogOfWar[oldTargetCell.row][oldTargetCell.column]);
            ctx.fillRect (oldTargetCell.column * columnWidth, oldTargetCell.row * rowHeight, rowHeight, columnWidth);

            ctx.strokeStyle = this.borderColorCell;
            ctx.strokeRect (oldTargetCell.column * columnWidth, oldTargetCell.row * rowHeight, rowHeight, columnWidth);
        }

        if (targetCell) {
            ctx.clearRect(targetCell.column * columnWidth, targetCell.row * rowHeight, rowHeight, columnWidth);

            ctx.fillStyle = this.determiningColorTargetFogOfWar(this.battleFieldFogOfWar[targetCell.row][targetCell.column]);
            ctx.fillRect (targetCell.column * columnWidth, targetCell.row * rowHeight, rowHeight, columnWidth);

            ctx.strokeStyle = this.borderColorCell;
            ctx.strokeRect (targetCell.column * columnWidth, targetCell.row * rowHeight, rowHeight, columnWidth);
        }
    }
};

BattleField.prototype.mouseEnter = function (layerX, layerY) {
    this.targetCell = determiningCoordinatesCell(CELL_DATA, layerX, layerY);

    this.drawChangeTargetCellView(null, this.targetCell);
};

BattleField.prototype.mousemove = function (layerX, layerY) {
    let currentCell = determiningCoordinatesCell(CELL_DATA, layerX, layerY);
    if (!simpleCompare(this.targetCell, currentCell)) {
        this.drawChangeTargetCellView(this.targetCell, currentCell);
        this.targetCell = currentCell;
    }
};

BattleField.prototype.mouseleave = function () {
    this.drawChangeTargetCellView(this.targetCell, null);
    this.targetCell = null;
};

BattleField.prototype.onClick = function (layerX, layerY) {
    this.selectedCell = determiningCoordinatesCell(CELL_DATA, layerX, layerY);

    switch (this.battleFieldBackground[this.selectedCell.row][this.selectedCell.column]) {
        case stateBG.SHIP:
            this.battleFieldBackground[this.selectedCell.row][this.selectedCell.column] = stateBG.STRICKEN_SHIP;
            this.drawGameObject(this.idBackground, this.selectedCell);
            break;
        case stateBG.STRICKEN_SHIP:
            break;
        case stateBG.BOMB:
            this.battleFieldBackground[this.selectedCell.row][this.selectedCell.column] = stateBG.USED_BOMB;
            this.drawGameObject(this.idBackground, this.selectedCell);
            break;
        case stateBG.USED_BOMB:
            break;
    }

    switch (this.battleFieldFogOfWar[this.selectedCell.row][this.selectedCell.column]) {
        case stateFW.FOG_HIDDEN:
            break;
        case stateFW.FOG_SHOWN:
            this.battleFieldFogOfWar[this.selectedCell.row][this.selectedCell.column] = stateFW.FOG_HIDDEN;
            this.drawCell(this.idFogOfWar, this.selectedCell, this.fillHideTargetFogOfWarCellColor, this.borderColorCell);
            break;
    }
};

BattleField.prototype.resetBattleField = function (){
    this.battleFieldFogOfWar = duplicateObject(defaultBattleFieldFogOfWar);
    saveToStorage(this.idFogOfWar, this.battleFieldFogOfWar);
    this.drawBattleFieldFogOfWar();

    this.battleFieldBackground = duplicateObject(defaultBattleFieldBackground);
    saveToStorage(this.idBackground, this.battleFieldBackground);
    this.drawBattleFieldBackground();
};

BattleField.prototype.saveBattleField = function () {
    saveToStorage(this.idBackground, this.battleFieldBackground);
    saveToStorage(this.idFogOfWar, this.battleFieldFogOfWar);
    if (this.isMyTurn) saveToStorage(WHOSE_TURN, this.id)
};

BattleField.prototype.determiningColorObject = function (cellState) {
    switch (cellState) {
        case stateBG.SHIP:
            return this.shipColor;
        case stateBG.STRICKEN_SHIP:
            return this.strickenShipColor;
        case stateBG.BOMB:
            return this.bombColor;
        case stateBG.USED_BOMB:
            return this.usedBombColor;
    }
};

BattleField.prototype.determiningColorFogOfWar = function (cellState) {
    switch (cellState) {
        case stateFW.FOG_SHOWN:
            return this.fillShowFogOfWarCellColor;
        case stateFW.FOG_HIDDEN:
            return this.fillHideFogOfWarCellColor;
    }
};

BattleField.prototype.determiningColorTargetFogOfWar = function (cellState) {
    switch (cellState) {
        case stateFW.FOG_SHOWN:
            return this.fillShowTargetFogOfWarCellColor;
        case stateFW.FOG_HIDDEN:
            return this.fillHideTargetFogOfWarCellColor;
    }
};

BattleField.prototype.updateTurn = function () {
    this.isMyTurn = !this.isMyTurn;
    document.getElementById(this.idBlocked).style.visibility = this.isMyTurn ? "hidden" : "visible"
};