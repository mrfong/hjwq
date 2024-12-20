# 俄羅斯方塊遊戲

這是一個使用HTML、CSS和JavaScript開發的簡單俄羅斯方塊遊戲。

## 功能

- 支持多種方塊類型（I, L, J, O, T, S, Z）
- 方塊可以旋轉和移動
- 方塊自動下降
- 清除已填滿的行
- 設計區允許玩家設計自己的方塊，並選擇紅、綠、藍三種顏色
- 選擇區允許玩家選擇設計好的方塊放置到遊戲區
- 遊戲區顯示格線，方便玩家填滿格子

## 使用說明

1. 打開`index.html`文件以啟動遊戲。
2. 使用以下鍵盤按鍵控制遊戲：
   - 左箭頭：向左移動方塊
   - 右箭頭：向右移動方塊
   - 下箭頭：加速方塊下降
   - Q：逆時針旋轉方塊
   - W：順時針旋轉方塊
   - 空格鍵：放置方塊
3. 點擊“開始遊戲”按鈕以開始新遊戲。
4. 在設計區設計方塊，選擇顏色後點擊格子設計，點擊“提交設計”按鈕將設計的方塊放入選擇區。
5. 點擊選擇區的方塊將其放置到遊戲區的中間。

## 開發記錄

- 使用`<canvas>`元素繪製遊戲畫面。
- 使用JavaScript實現遊戲邏輯，包括方塊生成、移動、旋轉和碰撞檢測。
- 使用CSS設置基本樣式，確保遊戲畫面居中顯示。
- 添加設計區和選擇區，允許玩家設計和選擇方塊。
- 添加顏色選擇功能，允許玩家設計不同顏色的方塊。
- 在遊戲區域繪製格線，增加可視性。

## 未來改進

- 添加計分系統。
- 增加遊戲難度隨時間增長。
- 優化方塊顏色和樣式。

## 參考資料

- [MDN Web Docs](https://developer.mozilla.org/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) 