// script.js
document.addEventListener('DOMContentLoaded', () => {
    const puzzleBoard = document.getElementById('puzzle-board');
    const colorCells = document.querySelectorAll('.color-cell');
    const submitButton = document.getElementById('submit-color');
    const piecesContainer = document.getElementById('pieces');

    if (!puzzleBoard || !submitButton || !piecesContainer) {
        console.error('必須的 DOM 元素未找到');
        return;
    }

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

        const piece = document.createElement('div');
        piece.className = 'piece';
        piece.draggable = true;
        piece.id = `piece-${Date.now()}`;
        piece.addEventListener('dragstart', dragStart);
        piece.style.width = '150px';
        piece.style.height = '150px';
        piece.style.backgroundImage = `url(${canvas.toDataURL()})`;
        piece.style.backgroundSize = 'cover';

        piecesContainer.appendChild(piece);

        colorCells.forEach(cell => {
            cell.style.backgroundColor = colors[0];
        });
    });

    // 处理拖动覆盖事件
    puzzleBoard.addEventListener('dragover', dragOver);
    // 处理放置事件
    puzzleBoard.addEventListener('drop', drop);

    // 处理拖动开始事件功能
    function dragStart(e) {
        const id = e.target.id;
        if (id) {
            e.dataTransfer.setData('text/plain', id);
        } else {
            console.error('Element does not have an ID');
        }
    }

    // 处理拖动覆盖事件功能
    function dragOver(e) {
        e.preventDefault();
    }

    // 处理放置事件功能
    function drop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        if (!id) {
            console.error('No ID found in dataTransfer');
            return;
        }

        const draggableElement = document.getElementById(id);

        if (draggableElement) {
            // 计算放置位置
            const boardRect = puzzleBoard.getBoundingClientRect();
            const pieceSize = 150; // 方块的尺寸
            const offsetX = e.clientX - boardRect.left;
            const offsetY = e.clientY - boardRect.top;

            // 检查放置位置是否在拼盘的4x5范围内
            if (offsetX >= 0 && offsetX <= boardRect.width - pieceSize && offsetY >= 0 && offsetY <= boardRect.height - pieceSize) {
                draggableElement.style.position = 'absolute';
                draggableElement.style.left = `${offsetX}px`;
                draggableElement.style.top = `${offsetY}px`;
                draggableElement.draggable = false; // 禁止再次拖动
                puzzleBoard.appendChild(draggableElement);
            } else {
                console.error('放置位置超出拼盘范围');
            }
        } else {
            console.error(`Element with ID ${id} not found.`);
        }
    }
});