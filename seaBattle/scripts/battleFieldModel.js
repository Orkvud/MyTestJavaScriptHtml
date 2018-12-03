"use strict";

function BattleField(battleField, idBattleField, idBattleFieldBackground) {
    this.battleField = battleField;
    this.targetCell = null;
    this.selectedCell = null;

    this.idBattleField = idBattleField;
    this.idBattleFieldBackground = idBattleFieldBackground;

    this.selectedColorCell = "rgb(255, 205, 109)";
    this.unSelectedColorCell = "rgb(255, 96, 124)";
    this.selectedColorCell40 = "rgba(255, 205, 109, 0.4)";
    this.unSelectedColorCell40 = "rgb(255, 96, 124, 0.4)";
    this.borderColorCell = "#000";
}

BattleField.prototype.drawBattleField = function () {
    let canvas = document.getElementById(this.idBattleField);

    if (canvas.getContext) {
        canvas.width = this.battleField.columnsCount * this.battleField.columnWidth;
        canvas.height = this.battleField.rowsCount * this.battleField.rowHeight;
        let ctx = canvas.getContext("2d");

        for (let row = 0; row < this.battleField.rowsCount; row++) {
            for (let column = 0; column < this.battleField.columnsCount; column++) {
                ctx.clearRect(column * this.battleField.columnWidth, row * this.battleField.rowHeight,
                    this.battleField.rowHeight, this.battleField.columnWidth);

                ctx.fillStyle = this.unSelectedColorCell;
                ctx.fillRect (column * this.battleField.columnWidth, row * this.battleField.rowHeight,
                    this.battleField.rowHeight, this.battleField.columnWidth);

                ctx.strokeStyle = this.borderColorCell;
                ctx.strokeRect (column * this.battleField.columnWidth, row * this.battleField.rowHeight,
                    this.battleField.rowHeight, this.battleField.columnWidth);
            }
        }
    }
};

BattleField.prototype.drawBattleFieldBackground = function (src) {
    let canvas = document.getElementById(this.idBattleFieldBackground);

    if (canvas.getContext) {
        canvas.width = this.battleField.columnsCount * this.battleField.columnWidth;
        canvas.height = this.battleField.rowsCount * this.battleField.rowHeight;
        let ctx = canvas.getContext("2d");

        let img = new Image;
        img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        img.src = src;
        // img.src = "https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg";
        // img.src = "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
        // img.src = "http://hd.wallpaperswide.com/thumbs/beautiful_autumn_landscape_6-t2.jpg"
    }
};

BattleField.prototype.drawCell = function (color, borderColorCell) {
    let canvas = document.getElementById(this.idBattleField);

    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");

        ctx.clearRect(this.targetCell.column * this.battleField.columnWidth,
            this.targetCell.row * this.battleField.rowHeight,
            this.battleField.rowHeight, this.battleField.columnWidth);

        ctx.fillStyle = color;
        ctx.fillRect (this.targetCell.column * this.battleField.columnWidth,
            this.targetCell.row * this.battleField.rowHeight,
            this.battleField.rowHeight, this.battleField.columnWidth);

        ctx.strokeStyle = borderColorCell;
        ctx.strokeRect (this.targetCell.column * this.battleField.columnWidth,
            this.targetCell.row * this.battleField.rowHeight,
            this.battleField.rowHeight, this.battleField.columnWidth);
    }
};

BattleField.prototype.mouseEnter = function (event) {
    this.targetCell = determiningCoordinatesCell(this.battleField, event);
    this.drawCell(simpleCompare(this.targetCell, this.selectedCell)
        ? this.selectedColorCell40 : this.unSelectedColorCell40, this.borderColorCell);
};

BattleField.prototype.mousemove = function (event) {
    let currentCell = determiningCoordinatesCell(this.battleField, event);
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

BattleField.prototype.onClick = function (event) {
    console.log(event);
    let oldSelectedCell = this.selectedCell;
    this.selectedCell = determiningCoordinatesCell(this.battleField, event);
    this.selectedCell = this.changeColorCell(oldSelectedCell);
};

BattleField.prototype.changeColorCell = function (oldSelectedCell) {
    let canvas = document.getElementById(this.idBattleField);

    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");

        if (oldSelectedCell) {
            ctx.clearRect(oldSelectedCell.column * this.battleField.columnWidth,
                oldSelectedCell.row * this.battleField.rowHeight,
                this.battleField.rowHeight, this.battleField.columnWidth);

            ctx.fillStyle = simpleCompare(this.selectedCell, oldSelectedCell)
                ? this.unSelectedColorCell40 : this.unSelectedColorCell;
            ctx.fillRect (oldSelectedCell.column * this.battleField.columnWidth,
                oldSelectedCell.row * this.battleField.rowHeight,
                this.battleField.rowHeight, this.battleField.columnWidth);

            ctx.strokeStyle = this.borderColorCell;
            ctx.strokeRect (oldSelectedCell.column * this.battleField.columnWidth,
                oldSelectedCell.row * this.battleField.rowHeight,
                this.battleField.rowHeight, this.battleField.columnWidth);
        }

        if (oldSelectedCell && simpleCompare(this.selectedCell, oldSelectedCell)) {
            return null;
        }

        ctx.clearRect(this.selectedCell.column * this.battleField.columnWidth,
            this.selectedCell.row * this.battleField.rowHeight,
            this.battleField.rowHeight, this.battleField.columnWidth);

        ctx.fillStyle = this.selectedColorCell40;
        ctx.fillRect (this.selectedCell.column * this.battleField.columnWidth,
            this.selectedCell.row * this.battleField.rowHeight,
            this.battleField.rowHeight, this.battleField.columnWidth);

        ctx.strokeStyle = this.borderColorCell;
        ctx.strokeRect (this.selectedCell.column * this.battleField.columnWidth,
            this.selectedCell.row * this.battleField.rowHeight,
            this.battleField.rowHeight, this.battleField.columnWidth);
    }

    return this.selectedCell;
};