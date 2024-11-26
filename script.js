const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20, 20); // 將畫布縮放以適應遊戲區域

const selectionCanvas = document.getElementById('selection');
const selectionContext = selectionCanvas.getContext('2d');
selectionContext.scale(20, 20); // 將選擇區畫布縮放

const designCanvas = document.getElementById('design');
const designContext = designCanvas.getContext('2d');
designContext.scale(20, 20); // 將設計區畫布縮放

let arena = createMatrix(12, 20); // 創建遊戲場地矩陣
let players = []; // 存儲多個玩家方塊
let currentPlayer = null; // 當前被選中的方塊

let selectionPiece = createPiece('T'); // 初始選擇的方塊
let designPiece = createMatrix(4, 4); // 設計區的方塊
let currentColor = 1; // 默認顏色為紅色

// 創建一個指定寬高的矩陣，並用0填充
function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

// 根據類型創建不同形狀的方塊
function createPiece(type) {
    switch (type) {
        case 'T':
            return [
                [0, 0, 0],
                [5, 5, 5],
                [0, 5, 0],
            ];
        case 'O':
            return [
                [7, 7],
                [7, 7],
            ];
        case 'L':
            return [
                [0, 6, 0],
                [0, 6, 0],
                [0, 6, 6],
            ];
        case 'J':
            return [
                [0, 3, 0],
                [0, 3, 0],
                [3, 3, 0],
            ];
        case 'I':
            return [
                [0, 4, 0, 0],
                [0, 4, 0, 0],
                [0, 4, 0, 0],
                [0, 4, 0, 0],
            ];
        case 'S':
            return [
                [0, 2, 2],
                [2, 2, 0],
                [0, 0, 0],
            ];
        case 'Z':
            return [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ];
    }
}

// 繪製矩陣到畫布上
function drawMatrix(matrix, offset, ctx) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = getColor(value); // 設置方塊顏色
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1); // 繪製方塊
            }
        });
    });
}

// 根據值返回對應的顏色
function getColor(value) {
    switch (value) {
        case 1: return 'red';
        case 2: return 'green';
        case 3: return 'blue';
        default: return 'black';
    }
}

// 繪製遊戲畫面
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(context, arena[0].length, arena.length); // 繪製格線
    drawMatrix(arena, {x: 0, y: 0}, context);
    players.forEach(player => {
        drawMatrix(player.matrix, player.pos, context);
    });
    selectionContext.clearRect(0, 0, selectionCanvas.width, selectionCanvas.height);
    drawMatrix(selectionPiece, {x: 0, y: 0}, selectionContext);
    designContext.clearRect(0, 0, designCanvas.width, designCanvas.height);
    drawMatrix(designPiece, {x: 0, y: 0}, designContext);
}

// 繪製遊戲區域的格線
function drawGrid(ctx, width, height) {
    ctx.strokeStyle = 'lightgray';
    for (let x = 0; x < width; ++x) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = 0; y < height; ++y) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

// 合併玩家方塊到遊戲場地
function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

// 檢查方塊是否碰撞
function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

let lastTime = 0;
// 更新遊戲狀態
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    draw();
    requestAnimationFrame(update);
}


// 提交設計按鈕事件
document.getElementById('submit-design').addEventListener('click', () => {
    selectionPiece = designPiece.map(row => row.slice());
    designPiece = createMatrix(4, 4); // 重置設計區
});

// 選擇區點擊事件
selectionCanvas.addEventListener('click', () => {
    const newPlayer = {
        pos: {
            y: (arena.length / 2 | 0) - (selectionPiece.length / 2 | 0),
            x: (arena[0].length / 2 | 0) - (selectionPiece[0].length / 2 | 0)
        },
        matrix: selectionPiece.map(row => row.slice())
    };
    players.push(newPlayer);
});

// 設計區點擊事件
designCanvas.addEventListener('click', event => {
    const x = Math.floor(event.offsetX / 20);
    const y = Math.floor(event.offsetY / 20);
    designPiece[y][x] = designPiece[y][x] ? 0 : currentColor; // 切換方塊狀態
    draw();
});

// 顏色按鈕點擊事件
document.querySelectorAll('.color-button').forEach(button => {
    button.addEventListener('click', () => {
        currentColor = parseInt(button.getAttribute('data-color'));
    });
});

// 滑鼠事件監聽
canvas.addEventListener('mousedown', event => {
    const x = Math.floor(event.offsetX / 20);
    const y = Math.floor(event.offsetY / 20);
    currentPlayer = players.find(player => {
        return player.matrix.some((row, dy) => {
            return row.some((value, dx) => {
                return value !== 0 && player.pos.x + dx === x && player.pos.y + dy === y;
            });
        });
    });
});

canvas.addEventListener('mousemove', event => {
    if (currentPlayer) {
        const x = Math.floor(event.offsetX / 20);
        const y = Math.floor(event.offsetY / 20);
        currentPlayer.pos.x = x - Math.floor(currentPlayer.matrix[0].length / 2);
        currentPlayer.pos.y = y - Math.floor(currentPlayer.matrix.length / 2);
        draw();
    }
});

canvas.addEventListener('mouseup', () => {
    currentPlayer = null;
});

update(); 