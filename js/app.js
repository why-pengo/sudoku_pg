"use strict";

function GameState() {
    this.wasNumberClicked = false;
    this.numberClicked = 0;
}
const gameState = new GameState();

let puzzle = sudoku.generate('medium');
let puzzle_answer = sudoku.solve(puzzle);

if (puzzle_answer) {
    console.log(`The puzzle good.`);
} else {
    console.log(`The puzzle is not good.`);
}

const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
const grid1 = ['a1', 'b1', 'c1', 'a2', 'b2', 'c2', 'a3', 'b3', 'c3'];
const grid2 = ['a4', 'b4', 'c4', 'a5', 'b5', 'c5', 'a6', 'b6', 'c6'];
const grid3 = ['a7', 'b7', 'c7', 'a8', 'b8', 'c8', 'a9', 'b9', 'c9'];
const grid4 = ['d1', 'e1', 'f1', 'd2', 'e2', 'f2', 'd3', 'e3', 'f3'];
const grid5 = ['d4', 'e4', 'f4', 'd5', 'e5', 'f5', 'd6', 'e6', 'f6'];
const grid6 = ['d7', 'e7', 'f7', 'd8', 'e8', 'f8', 'd9', 'e9', 'f9'];
const grid7 = ['g1', 'h1', 'i1', 'g2', 'h2', 'i2', 'g3', 'h3', 'i3'];
const grid8 = ['g4', 'h4', 'i4', 'g5', 'h5', 'i5', 'g6', 'h6', 'i6'];
const grid9 = ['g7', 'h7', 'i7', 'g8', 'h8', 'i8', 'g9', 'h9', 'i9'];
const board = document.getElementById('board');

drawBoard();

// Selected
// const col3 = document.getElementsByClassName('c3')
// for ( let i = 0; i < col3.length; i++) {
//     col3[i].classList.remove('grid-dark');  // if it's there
//     col3[i].classList.add('selected');
// }
// const rowE = document.getElementsByClassName('re')
// for ( let i = 0; i < rowE.length; i++) {
//     rowE[i].classList.remove('grid-dark');  // if it's there
//     rowE[i].classList.add('selected');
// }

function drawBoard() {
    for (let i in rows) {
        // console.log(`i = ${i}, rows[i] = ${rows[i]}`);
        const div = document.createElement('div');
        div.className = 'row';
        div.innerHTML = `
            <div class="square r${rows[i]} c1" id="${rows[i]}1"><p class="sq_title">${rows[i]}1</p></div>
            <div class="square r${rows[i]} c2" id="${rows[i]}2"><p class="sq_title">${rows[i]}2</p></div>
            <div class="square r${rows[i]} c3" id="${rows[i]}3"><p class="sq_title">${rows[i]}3</p></div>
            <div class="square r${rows[i]} c4" id="${rows[i]}4"><p class="sq_title">${rows[i]}4</p></div>
            <div class="square r${rows[i]} c5" id="${rows[i]}5"><p class="sq_title">${rows[i]}5</p></div>
            <div class="square r${rows[i]} c6" id="${rows[i]}6"><p class="sq_title">${rows[i]}6</p></div>
            <div class="square r${rows[i]} c7" id="${rows[i]}7"><p class="sq_title">${rows[i]}7</p></div>
            <div class="square r${rows[i]} c8" id="${rows[i]}8"><p class="sq_title">${rows[i]}8</p></div>
            <div class="square r${rows[i]} c9" id="${rows[i]}9"><p class="sq_title">${rows[i]}9</p></div>
        `;
        board.appendChild(div);
    }
    gridDarkBg(grid1);
    gridDarkBg(grid3);
    gridDarkBg(grid5);
    gridDarkBg(grid7);
    gridDarkBg(grid9);
}

function gridDarkBg(gridList) {
    for (let i in gridList) {
        let grid = document.getElementById(gridList[i]);
        grid.classList.add('grid-dark');
    }
}

const numbersRow = document.getElementById('numbers');
numbersRow.addEventListener("click", numberClicked);

function numberClicked(e) {
    let n = parseInt(e.target.id.replace('n', ''));
    console.log(`n = ${n}`);
    if (gameState.wasNumberClicked === true) {
        gameState.wasNumberClicked = false;
        gameState.numberClicked = 0;
        board.classList.remove('crosshair');
    } else {
        gameState.wasNumberClicked = true;
        gameState.numberClicked = n;
        board.classList.add('crosshair');
    }
}

board.addEventListener('click', boardClicked);

function boardClicked(e) {
    let tile = e.target.id;
    console.log(`tile clicked = ${tile}`);
}

for (let k in puzzle) {
    if (puzzle.hasOwnProperty(k)){
        // console.log(`checking ${k}:${puzzle[k]}`);
        if (puzzle[k] !== '.') {
            let curr_sq = document.getElementById(k.toLowerCase());
            curr_sq.innerHTML += `<div class="sq_value">${puzzle[k]}</div>`;
        }
    }
}

const show_sq_id_cb = document.getElementById('show_sq_id');
show_sq_id_cb.addEventListener("change", showSqIdClicked);

function showSqIdClicked() {
    console.log(`show_sq_id_cb.checked = ${show_sq_id_cb.checked}`);
    if (show_sq_id_cb.checked) {
        for (let el of document.querySelectorAll('.sq_title')) el.style.visibility = 'visible';
    } else {
        for (let el of document.querySelectorAll('.sq_title')) el.style.visibility = 'hidden';
    }
}

showSqIdClicked();


