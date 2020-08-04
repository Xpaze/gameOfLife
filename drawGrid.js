var grid = document.getElementById("grid");
var startButton = document.getElementById("startButton");
var stopButton = document.getElementById("stopButton");
var ctx = grid.getContext("2d");

const draw = function () {

    ctx.strokeStyle = "grey";

    for (let i = 0; i < 1800; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 900);
        ctx.stroke();
    }
    for (let i = 0; i < 900; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(1800, i);
        ctx.stroke();
    }
}
const drawRect = function (x, y) {
    ctx.fillRect(x * 20, y * 20, 20, 20);
}


//let gridState = [[false, true, false],
//                [true, true, true],
//                [false, true, true]];



let gridState = [];
for (let i = 0; i < 45; i++) {
    gridState[i] = [];
}

let gsCopy = [];
for (let i = 0; i < 45; i++) {
    gsCopy[i] = [];
}


const allFalse = function () {
    for (let y = 0; y < 45; y++) {
        for (let x = 0; x < 90; x++) {
            gridState[y][x] = false;
        }
    }
}
allFalse();

gridState[1][1] = true;

const resetGrid = function () {
    ctx.clearRect(0, 0, grid.width, grid.height);
}

const drawTrue = function () {
    for (let y = 0; y < gridState.length; y++) {
        for (let x = 0; x < gridState[1].length; x++) {
            if (gridState[y][x] == true) {
                drawRect(x, y);
            }
        }
    }
}

const scan = function (x, y) {
    let trueCount = 0;
    if (x - 1 >= 0 && gridState[x - 1][y] === true) {
        trueCount++;
    }
    if (x + 1 <= 90 && gridState[x + 1][y] === true) {
        trueCount++;
    }
    if (x - 1 >= 0 && y + 1 <= 45 && gridState[x - 1][y + 1] === true) {
        trueCount++;
    }
    if (y + 1 <= 45 && gridState[x][y + 1] === true) {
        trueCount++;
    }
    if (x + 1 <= 90 && y + 1 <= 45 && gridState[x + 1][y + 1] === true) {
        trueCount++;
    }
    if (x - 1 >= 0 && y - 1 >= 0 && gridState[x - 1][y - 1] === true) {
        trueCount++;
    }
    if (y - 1 >= 0 && gridState[x][y - 1] === true) {
        trueCount++;
    }
    if (x + 1 <= 90 && y - 1 >= 0 && gridState[x + 1][y - 1] === true) {
        trueCount++;
    }
    return trueCount;
}



drawTrue();
draw();

const aTurn = function () {
    // Update the gridState for the new turn
    resetGrid();
    drawTrue();
    draw();
}

let intervalRef;
startButton.onclick = function () {

    intervalRef = setInterval(aTurn, 300);
}

stopButton.onclick = function () {
    if (intervalRef) {
        clearInterval(intervalRef);
    }
}