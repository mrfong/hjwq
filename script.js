// script.js
document.addEventListener('DOMContentLoaded', () => {
    const pieces = document.querySelectorAll('.piece');
    const puzzleBoard = document.getElementById('puzzle-Board');
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

    // 清空pieces区域
    piecesContainer.innerHTML = '';

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

        // 创建piece并添加到pieces区域
        const piece = document.createElement('div');
        piece.className = 'piece';
        piece.draggable = true;
        piece.style.width = '150px';
        piece.style.height = '150px';
        piece.style.backgroundImage = `url(${canvas.toDataURL()})`;
        piece.style.backgroundSize = 'cover';
        // 添加拖放事件
        piece.addEventListener('dragstart', dragStart);
        //piece.addEventListener('dragstart', handleDragStart);

        piecesContainer.appendChild(piece);

        colorCells.forEach(cell => {
            cell.style.backgroundColor = colors[0];
        });


    });

    //*
    pieces.forEach(piece => {
        piece.addEventListener('dragstart', dragStart);
    });

    puzzleBoard.addEventListener('dragover', dragOver);
    puzzleBoard.addEventListener('drop', drop);

    // 处理拖动开始事件
    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    // 处理拖动覆盖事件
    function dragOver(e) {
        e.preventDefault();
    }

    // 处理放置事件
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
    //*/

});