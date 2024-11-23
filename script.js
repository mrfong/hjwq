// script.js
document.addEventListener('DOMContentLoaded', () => {
    const pieces = document.querySelectorAll('.piece');
    const board = document.getElementById('puzzle-board');
    const colorCells = document.querySelectorAll('.color-cell');
    const submitButton = document.getElementById('submit-color');
    const piecesContainer = document.getElementById('pieces');

    const colors = ['rgb(204, 204, 204)', 'rgb(244, 67, 54)', 'rgb(76, 175, 80)', 'rgb(33, 150, 243)'];

    colorCells.forEach(cell => {
        cell.style.backgroundColor = colors[0];
        cell.addEventListener('click', () => {
            let currentColor = getComputedStyle(cell).backgroundColor;
            let nextColorIndex = (colors.indexOf(currentColor) + 1) % colors.length;
            cell.style.backgroundColor = colors[nextColorIndex];
        });
    });

    submitButton.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = 150;
        canvas.height = 150;
        const ctx = canvas.getContext('2d');

        colorCells.forEach((cell, index) => {
            const x = (index % 3) * 50;
            const y = Math.floor(index / 3) * 50;
            ctx.fillStyle = cell.style.backgroundColor === colors[0] ? 'rgba(0, 0, 0, 0)' : cell.style.backgroundColor;
            ctx.fillRect(x, y, 50, 50);
        });

        const newPiece = document.createElement('div');
        newPiece.className = 'piece';
        newPiece.draggable = true;
        newPiece.addEventListener('dragstart', dragStart);
        newPiece.style.width = '150px';
        newPiece.style.height = '150px';
        newPiece.style.backgroundImage = `url(${canvas.toDataURL()})`;
        newPiece.style.backgroundSize = 'cover';

        piecesContainer.appendChild(newPiece);

        colorCells.forEach(cell => {
            cell.style.backgroundColor = colors[0];
        });
    });

    pieces.forEach(piece => {
        piece.addEventListener('dragstart', dragStart);
    });

    board.addEventListener('dragover', dragOver);
    board.addEventListener('drop', drop);

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const piece = document.getElementById(id);
        if (e.target.className === '') {
            e.target.appendChild(piece);
            piece.style.width = '50px';
            piece.style.height = '50px';
            piece.style.backgroundSize = '50px 50px';
        }
    }
});