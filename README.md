# 揮劍問情 - 歸墟盤

## 项目概述

本项目是一个基于HTML、CSS和JavaScript的拼图游戏。用户可以通过选择颜色来创建拼图方块，并将其拖动到拼盘中进行拼图。项目使用了Bootstrap进行样式优化。

## 功能描述

### 1. 拼图板 (`puzzle-board`)

- **用途**: 显示4x5的拼图区域，用户可以将方块拖动到此区域。
- **使用方法**: 用户可以将生成的方块拖动到拼图板上。
- **参数说明**: 无需参数。
- **返回值说明**: 无返回值。

### 2. 九宫格色盘 (`color-grid`)

- **用途**: 提供颜色选择功能，用户可以点击色盘中的小方块来选择颜色。
- **使用方法**: 点击色盘中的小方块以循环选择不同的颜色。
- **参数说明**: 无需参数。
- **返回值说明**: 无返回值。

### 3. 提交按钮 (`submit-color`)

- **用途**: 将九宫格色盘中的颜色应用到一个新的拼图方块中。
- **使用方法**: 点击提交按钮后，会生成一个新的拼图方块，方块的颜色由九宫格色盘中的颜色决定。
- **参数说明**: 无需参数。
- **返回值说明**: 无返回值。

### 4. 拼图方块 (`pieces`)

- **用途**: 显示用户生成的拼图方块，用户可以将其拖动到拼图板中。
- **使用方法**: 生成的方块可以拖动到拼图板中进行拼图。
- **参数说明**: 无需参数。
- **返回值说明**: 无返回值。

## 使用说明

1. 打开 `index.html` 文件。
2. 使用九宫格色盘选择颜色。
3. 点击“提交”按钮生成拼图方块。
4. 将生成的方块拖动到拼图板中进行拼图。

## 外部文件

- **Bootstrap CSS**: 用于样式优化。
  - 引入方式: `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">`
- **Bootstrap JavaScript**: 用于支持动态组件。
  - 引入方式: `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>`
- **styles.css**: 自定义样式文件。
- **script.js**: 实现游戏逻辑的JavaScript文件。

## 代码结构

- `index.html`: 主页面文件，包含HTML结构。
- `styles.css`: 样式文件，定义了页面的布局和样式。
- `script.js`: JavaScript文件，包含游戏的交互逻辑。

## 未来改进

- 增加更多颜色选择。
- 提供不同难度的拼图板。
- 增加计时功能，记录用户完成拼图的时间。

如果有任何问题或需要进一步的帮助，请随时联系开发团队。