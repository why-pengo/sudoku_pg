"use strict";


function GameState() {
    this.wasNumberClicked = false;
    this.numberClicked = '0';
    this.hlRow = '0';
    this.hlColumn = '0';
    // TODO: implement modes
    this.commandMode = true;   // command mode: highlighting, etc
    this.writeMode = false;    // filling squares in pencil or pen mode
    this.pencilMode = true;
    this.penMode = true;
}

const gameState = new GameState();

// initialize our game
let puzzle = sudoku.generate('medium');
console.log(`puzzle = ${JSON.stringify(puzzle)}`);
let puzzle_answer = sudoku.solve(puzzle);
console.log(`puzzle_answer = ${JSON.stringify(puzzle_answer)}`);
let user_puzzle = {};
console.log(`typeof puzzle_answer = ${typeof puzzle_answer}`);
for (let square in puzzle) {
    user_puzzle[square] = puzzle[square];
}

if (puzzle_answer) {
    console.log(`The puzzle good.`);
} else {
    console.log(`The puzzle is not good.`);
}

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const grid1 = ['A1', 'B1', 'C1', 'A2', 'B2', 'C2', 'A3', 'B3', 'C3'];
const grid2 = ['A4', 'B4', 'C4', 'A5', 'B5', 'C5', 'A6', 'B6', 'C6'];
const grid3 = ['A7', 'B7', 'C7', 'A8', 'B8', 'C8', 'A9', 'B9', 'C9'];
const grid4 = ['D1', 'E1', 'F1', 'D2', 'E2', 'F2', 'D3', 'E3', 'F3'];
const grid5 = ['D4', 'E4', 'F4', 'D5', 'E5', 'F5', 'D6', 'E6', 'F6'];
const grid6 = ['D7', 'E7', 'F7', 'D8', 'E8', 'F8', 'D9', 'E9', 'F9'];
const grid7 = ['G1', 'H1', 'I1', 'G2', 'H2', 'I2', 'G3', 'H3', 'I3'];
const grid8 = ['G4', 'H4', 'I4', 'G5', 'H5', 'I5', 'G6', 'H6', 'I6'];
const grid9 = ['G7', 'H7', 'I7', 'G8', 'H8', 'I8', 'G9', 'H9', 'I9'];
const squares = grid1.concat(grid2, grid3, grid4, grid5, grid6, grid7, grid8, grid9);
const board = document.getElementById('board');

drawBoard();

function highlightRowAndColumn(row, column) {
    console.log(`highlighting row = ${row}, column = ${column}`);
    gameState.hlRow = row;
    gameState.hlColumn = column;
    const col = document.getElementsByClassName(column)
    for (let i = 0; i < col.length; i++) {
        col[i].classList.remove('grid-dark');  // if it's there
        col[i].classList.add('selected');
    }
    const rw = document.getElementsByClassName(row)
    for (let i = 0; i < rw.length; i++) {
        rw[i].classList.remove('grid-dark');  // if it's there
        rw[i].classList.add('selected');
    }
}

function unHighlightRowAndColumn(row, column) {
    console.log(`unhighlighting row = ${row}, column = ${column}`);
    const col = document.getElementsByClassName(column)
    for (let i = 0; i < col.length; i++) {
        col[i].classList.remove('selected');
        // col[i].classList.add('selected');
    }
    const r = document.getElementsByClassName(row)
    for (let i = 0; i < r.length; i++) {
        r[i].classList.remove('selected');
        // r[i].classList.add('selected');
    }
}

function highlightSquareByValue(value) {
    for (let k in squares) {
        let sq_id = squares[k];
        // console.log(`sq_id = ${sq_id}`);
        // console.log(`user_puzzle.value = ${user_puzzle[sq_id]}`);
        // console.log(`value = ${value}`);
        if (value === user_puzzle[sq_id]) {
            let sqById = document.getElementById(sq_id);
            sqById.classList.remove('grid-dark');  // if it's there
            sqById.classList.add('selected-red');
        }
    }
}

function unHighlightSquareByValue(value) {
    for (let k in squares) {
        let sq_id = squares[k];
        // console.log(`sq_id = ${sq_id}`);
        // console.log(`user_puzzle.value = ${user_puzzle[sq_id]}`);
        // console.log(`value = ${value}`);
        let sqById = document.getElementById(sq_id);
        sqById.classList.remove('grid-dark');  // if it's there
        sqById.classList.remove('selected-red');
    }
}

function drawBoard() {
    for (let i in rows) {
        // console.log(`i = ${i}, rows[i] = ${rows[i]}`);
        const div = document.createElement('div');
        div.className = 'row justify-content-end';
        div.innerHTML = `
            <div class="square R${rows[i]} C1" id="${rows[i]}1"><p class="sq_title">${rows[i]}1</p></div>
            <div class="square R${rows[i]} C2" id="${rows[i]}2"><p class="sq_title">${rows[i]}2</p></div>
            <div class="square R${rows[i]} C3" id="${rows[i]}3"><p class="sq_title">${rows[i]}3</p></div>
            <div class="square R${rows[i]} C4" id="${rows[i]}4"><p class="sq_title">${rows[i]}4</p></div>
            <div class="square R${rows[i]} C5" id="${rows[i]}5"><p class="sq_title">${rows[i]}5</p></div>
            <div class="square R${rows[i]} C6" id="${rows[i]}6"><p class="sq_title">${rows[i]}6</p></div>
            <div class="square R${rows[i]} C7" id="${rows[i]}7"><p class="sq_title">${rows[i]}7</p></div>
            <div class="square R${rows[i]} C8" id="${rows[i]}8"><p class="sq_title">${rows[i]}8</p></div>
            <div class="square R${rows[i]} C9" id="${rows[i]}9"><p class="sq_title">${rows[i]}9</p></div>
        `;
        board.appendChild(div);
    }
    setGridDarkBg();
}

function setGridDarkBg() {
    gridDarkBg(grid1);
    gridDarkBg(grid3);
    gridDarkBg(grid5);
    gridDarkBg(grid7);
    gridDarkBg(grid9);
}

function gridDarkBg(gridList) {
    for (let i in gridList) {
        // console.log(`gridList[i] = ${gridList[i]}`);
        let grid = document.getElementById(gridList[i]);
        grid.classList.add('grid-dark');
    }
}

const numbersRow = document.getElementById('numbers');
numbersRow.addEventListener("click", numberClicked);

function numberClicked(e) {
    let n = e.target.id.replace('N', '');
    // console.log(`n = ${n}`);
    if (gameState.wasNumberClicked === true) {
        gameState.wasNumberClicked = false;
        gameState.numberClicked = '0';
        board.classList.remove('crosshair');
    } else {
        gameState.wasNumberClicked = true;
        gameState.numberClicked = n;
        board.classList.add('crosshair');
    }
}

board.addEventListener('click', boardClicked);

function boardClicked(e) {
    const target_id = e.target.id;
    let sq;
    console.log(`target_id clicked = ${target_id}`);
    if (target_id.startsWith('sq_value_')) {
        sq = target_id.replace('sq_value_', '');
    } else {
        sq = target_id;
    }
    console.log(`sq clicked = ${sq}`);
    if (gameState.wasNumberClicked) {
        update_puzzle(sq);
    } else {
        if (sqHasValue(sq)) {
            const classes = String(document.getElementById(sq).classList);
            const buf = classes.split(' ');
            const r = buf[1];
            const c = buf[2];
            console.log(`classes = ${classes}, buf = ${buf}, r = ${r}, c = ${c}`);
            if (gameState.hlRow !== '0') {
                unHighlightRowAndColumn(gameState.hlRow, gameState.hlColumn);
                unHighlightSquareByValue(user_puzzle[sq]);
                setGridDarkBg();
            }
            highlightRowAndColumn(r, c);
            highlightSquareByValue(user_puzzle[sq]);
        }
    }
}

function sqHasValue(sq) {
    let fn = sqHasValue.name;
    console.log(`${fn}: user_puzzle[${sq}] = ${user_puzzle[sq]}`)
    return user_puzzle[sq];
}

function update_puzzle(sq) {
    console.log(`sq = ${sq}, numberClicked = ${gameState.numberClicked}`);
    console.log(`user_puzzle[sq] = ${user_puzzle[sq]}`);
    console.log(`puzzle_answer[sq] = ${puzzle_answer[sq]}`);
    if (user_puzzle[sq] !== puzzle_answer[sq]) {
        alert(`Error: incorrect.`);
    } else {
        user_puzzle[sq] = gameState.numberClicked;
        let selected_sq = document.getElementById(sq);
        selected_sq.innerHTML += `<div class="sq_value" id="sq_value_${sq}">${user_puzzle[sq]}</div>`;
    }
}

for (let k in squares) {
    let sq_id = squares[k];
    if (puzzle.hasOwnProperty(sq_id)) {
        let curr_sq = document.getElementById(sq_id);
        curr_sq.innerHTML += `<div class="sq_value" id="sq_value_${sq_id}">${puzzle[sq_id]}</div>`;
    }
}

const show_sq_id_cb = document.getElementById('show_sq_id');
show_sq_id_cb.addEventListener("change", showSqIdClicked);

function showSqIdClicked() {
    if (show_sq_id_cb.checked) {
        for (let el of document.querySelectorAll('.sq_title')) el.style.visibility = 'visible';
    } else {
        for (let el of document.querySelectorAll('.sq_title')) el.style.visibility = 'hidden';
    }
}

// Hide them on start
showSqIdClicked();

