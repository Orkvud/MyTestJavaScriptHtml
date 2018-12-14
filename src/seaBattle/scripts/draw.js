"use strict";

function drawBattleFieldBackground(src, idBackground, battleFieldBackground, cellData, columns, rows, seaColor, borderColorCell, determiningColorObject) {
    let canvas = document.getElementById(idBackground);

    if (canvas.getContext) {
        let columnWidth = cellData.cellWidth;
        let rowHeight = cellData.cellHeight;

        canvas.width = columns * columnWidth;
        canvas.height = rows * rowHeight;
        let ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (src) {
            let img = new Image;
            img.onload = function () {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };

            img.src = src;

            // img.src = "https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg";
            // img.src = "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
            // img.src = "http://hd.wallpaperswide.com/thumbs/beautiful_autumn_landscape_6-t2.jpg"
        } else {
            ctx.fillStyle = seaColor;
            ctx.fillRect (0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = borderColorCell;
            ctx.strokeRect (0, 0, canvas.width, canvas.height);
        }

        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                if (battleFieldBackground[row][column] !== stateBG.EMPTY) {
                    ctx.fillStyle = determiningColorObject(battleFieldBackground[row][column]);
                    ctx.beginPath();
                    ctx.arc ((column * columnWidth + (columnWidth/2)), (row * rowHeight + (rowHeight/2)),
                        columnWidth/4, 0, 360);
                    ctx.fill();
                }
            }
        }
    }
}