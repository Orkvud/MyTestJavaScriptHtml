"use strict";

const stateBG = Object.freeze({
    EMPTY: "empty",
    SHIP: "ship",
    STRICKEN_SHIP: "stricken_ship",
    BOMB: "bomb",
    USED_BOMB: "used_bomb"
});

const stateFW = Object.freeze({
    SHOW: "show",
    HIDE: "hide"
})

const defaultBattleField = [
    [stateBG.EMPTY, stateBG.SHIP,  stateBG.SHIP,  stateBG.SHIP,  stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.BOMB,  stateBG.EMPTY],
    [stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY],
    [stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP],
    [stateBG.SHIP,  stateBG.EMPTY, stateBG.SHIP,  stateBG.SHIP,  stateBG.SHIP,  stateBG.EMPTY, stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP],
    [stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY],
    [stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY],
    [stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.BOMB,  stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP,  stateBG.EMPTY],
    [stateBG.EMPTY, stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY],
    [stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY],
    [stateBG.BOMB,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP]
];

const defaultFogOfWar = [
    [stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW, stateFW.SHOW, stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW],
    [stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW, stateFW.SHOW, stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW],
    [stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW, stateFW.SHOW, stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW],
    [stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW, stateFW.SHOW, stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW],
    [stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW, stateFW.SHOW, stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW],
    [stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW, stateFW.SHOW, stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW],
    [stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW, stateFW.SHOW, stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW],
    [stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW, stateFW.SHOW, stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW],
    [stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW, stateFW.SHOW, stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW],
    [stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW,  stateFW.SHOW, stateFW.SHOW, stateFW.SHOW, stateFW.SHOW,  stateFW.SHOW]
];

function BattleField(idBattleField, idBattleFieldBackground, battleFieldData = {rowHeight: 40, columnWidth: 40}) {
    this.targetCell = null;
    this.selectedCell = null;
    this.battleFieldData = battleFieldData;

    this.idBattleField = idBattleField;
    this.idBattleFieldBackground = idBattleFieldBackground;

    this.selectedColorCell = "rgba(160, 160, 160, 0.0)";
    this.unSelectedColorCell = "rgb(160, 160, 160)";
    this.selectedColorCell40 = "rgba(160, 160, 160, 0.4)";
    this.unSelectedColorCell40 = "rgb(130, 130, 130, 1.0)";
    this.borderColorCell = "rgb(0, 0, 0)";
    this.seaColor = "rgb(136, 185, 255)";
    this.shipColor = "rgb(0, 0, 0, 0.4)";
    this.strickenShipColor = "rgb(255, 164, 103)";
    this.bombColor = "rgb(255, 25, 25)";
    this.usedBombColor = "rgb(255, 145, 175)";

    this.battleField = retrieveFromLocalStorage(this.idBattleFieldBackground) || defaultBattleField;
    this.fogOfWar = retrieveFromLocalStorage(this.idBattleField) || defaultFogOfWar;

    this.rows = defaultBattleField.length;
    this.columns = defaultBattleField[0].length;
}

BattleField.prototype.drawBattleFieldBackground = function (src) {
    let canvas = document.getElementById(this.idBattleFieldBackground);

    if (canvas.getContext) {
        let columnWidth = this.battleFieldData.columnWidth;
        let rowHeight = this.battleFieldData.rowHeight;

        canvas.width = this.columns * columnWidth;
        canvas.height = this.rows * rowHeight;
        let ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (src) {
            let img = new Image;
            img.onload = function () {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };

            img.src = src;
        } else {
            ctx.fillStyle = this.seaColor;
            ctx.fillRect (0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = this.borderColorCell;
            ctx.strokeRect (0, 0, canvas.width, canvas.height);
        }

        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                if (this.battleField[row][column] !== stateBG.EMPTY) {
                    ctx.fillStyle = this.determiningColorObject(this.battleField[row][column]);
                    let x0 = column * columnWidth;
                    let y0 = row * rowHeight;
                    ctx.beginPath();
                    ctx.arc ((x0 + (columnWidth/2)), (y0 + (rowHeight/2)), columnWidth/4, 0, 360);
                    ctx.fill();
                }
            }
        }
        // img.src = "https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg";
        // img.src = "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
        // img.src = "http://hd.wallpaperswide.com/thumbs/beautiful_autumn_landscape_6-t2.jpg"
    }
};

BattleField.prototype.drawBattleField = function () {
    let canvas = document.getElementById(this.idBattleField);

    if (canvas.getContext) {
        let columnWidth = this.battleFieldData.columnWidth;
        let rowHeight = this.battleFieldData.rowHeight;

        canvas.width = this.columns * columnWidth;
        canvas.height = this.rows * rowHeight;
        let ctx = canvas.getContext("2d");

        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                ctx.clearRect(column * columnWidth, row * rowHeight, rowHeight, columnWidth);

                ctx.fillStyle = this.determiningColorFogOfWar(stateFW[row][column]);
                ctx.fillRect (column * columnWidth, row * rowHeight, rowHeight, columnWidth);

                ctx.strokeStyle = this.borderColorCell;
                ctx.strokeRect (column * columnWidth, row * rowHeight, rowHeight, columnWidth);
            }
        }
    }
};

BattleField.prototype.drawCell = function (color, borderColorCell) {
    let canvas = document.getElementById(this.idBattleField);

    if (canvas.getContext) {
        let columnWidth = this.battleFieldData.columnWidth;
        let rowHeight = this.battleFieldData.rowHeight;

        let ctx = canvas.getContext("2d");

        ctx.clearRect(this.targetCell.column * columnWidth, this.targetCell.row * rowHeight, rowHeight, columnWidth);

        ctx.fillStyle = color;
        ctx.fillRect (this.targetCell.column * columnWidth, this.targetCell.row * rowHeight, rowHeight, columnWidth);

        ctx.strokeStyle = borderColorCell;
        ctx.strokeRect (this.targetCell.column * columnWidth, this.targetCell.row * rowHeight, rowHeight, columnWidth);
    }
};

BattleField.prototype.mouseEnter = function (layerX, layerY) {
    this.targetCell = determiningCoordinatesCell(this.battleFieldData, layerX, layerY);
    this.drawCell(simpleCompare(this.targetCell, this.selectedCell)
        ? this.selectedColorCell40 : this.unSelectedColorCell40, this.borderColorCell);
};

BattleField.prototype.mousemove = function (layerX, layerY) {
    let currentCell = determiningCoordinatesCell(this.battleFieldData, layerX, layerY);
    if (this.targetCell && currentCell && simpleCompare(this.targetCell, currentCell)) {

    } else {
        if (this.targetCell) {
            this.drawCell(simpleCompare(this.targetCell, this.selectedCell)
                ? this.selectedColorCell : this.unSelectedColorCell, this.borderColorCell);
        }
        this.targetCell = currentCell;
        this.drawCell(simpleCompare(this.targetCell, this.selectedCell)
            ? this.selectedColorCell40 : this.unSelectedColorCell40, this.borderColorCell);
    }
};

BattleField.prototype.mouseleave = function () {
    this.drawCell(simpleCompare(this.targetCell, this.selectedCell) ?
        this.selectedColorCell : this.unSelectedColorCell);
    this.targetCell = null;
};

BattleField.prototype.onClick = function (layerX, layerY) {
    console.log(event);
    let oldSelectedCell = this.selectedCell;
    this.selectedCell = determiningCoordinatesCell(this.battleFieldData, layerX, layerY);

    if (this.battleField[this.selectedCell.row][this.selectedCell.column]) {
        switch (this.battleField[this.selectedCell.row][this.selectedCell.column]) {
            case stateBG.SHIP:
                this.battleField[this.selectedCell.row][this.selectedCell.column] = stateBG.STRICKEN_SHIP;
                break;
            case stateBG.STRICKEN_SHIP:
                this.battleField[this.selectedCell.row][this.selectedCell.column] = stateBG.SHIP;
                break;
            case stateBG.BOMB:
                this.battleField[this.selectedCell.row][this.selectedCell.column] = stateBG.USED_BOMB;
                break;
            case stateBG.USED_BOMB:
                this.battleField[this.selectedCell.row][this.selectedCell.column] = stateBG.BOMB;
                break;
        }
    }

    this.selectedCell = this.changeColorCells(oldSelectedCell);
};

BattleField.prototype.changeColorCells = function (oldSelectedCell) {
    let canvas = document.getElementById(this.idBattleField);

    if (canvas.getContext) {
        let columnWidth = this.battleFieldData.columnWidth;
        let rowHeight = this.battleFieldData.rowHeight;

        let ctx = canvas.getContext("2d");

        if (oldSelectedCell) {
            ctx.clearRect(oldSelectedCell.column * columnWidth, oldSelectedCell.row * rowHeight, rowHeight, columnWidth);

            ctx.fillStyle = simpleCompare(this.selectedCell, oldSelectedCell)
                ? this.unSelectedColorCell40 : this.unSelectedColorCell;
            ctx.fillRect (oldSelectedCell.column * columnWidth, oldSelectedCell.row * rowHeight, rowHeight, columnWidth);

            ctx.strokeStyle = this.borderColorCell;
            ctx.strokeRect (oldSelectedCell.column * columnWidth, oldSelectedCell.row * rowHeight, rowHeight, columnWidth);
        }

        if (oldSelectedCell && simpleCompare(this.selectedCell, oldSelectedCell)) {
            return null;
        }

        ctx.clearRect(this.selectedCell.column * columnWidth, this.selectedCell.row * rowHeight, rowHeight, columnWidth);

        ctx.fillStyle = this.selectedColorCell40;
        ctx.fillRect (this.selectedCell.column * columnWidth, this.selectedCell.row * rowHeight, rowHeight, columnWidth);

        ctx.strokeStyle = this.borderColorCell;
        ctx.strokeRect (this.selectedCell.column * columnWidth, this.selectedCell.row * rowHeight, rowHeight, columnWidth);
    }

    return this.selectedCell;
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
        case stateFW.SHOW:
            return this.unSelectedColorCell;
        case stateFW.HIDE:
            return this.selectedColorCell;
    }
};