var game;
(function (game) {
    var GridsArea = (function (_super) {
        __extends(GridsArea, _super);
        /**初始化一个横竖格子数w*h，拥有mineNum颗雷的游戏区域 */
        function GridsArea(w, h, mineNum, scene) {
            _super.call(this);
            this.w = w;
            this.h = h;
            this.width = w * game.GridView.gridSize;
            this.height = h * game.GridView.gridSize;
            this.mineNum = mineNum;
            this.scene = scene;
            this.createGrids();
        }
        var d = __define,c=GridsArea,p=c.prototype;
        /**生成所有格子 */
        p.createGrids = function () {
            this.grids = [];
            for (var i = 0; i < this.w; i++) {
                this.grids[i] = [];
                for (var j = 0; j < this.h; j++) {
                    var grid = new game.GridView(i, j);
                    grid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                    grid.x = i * game.GridView.gridSize;
                    grid.y = j * game.GridView.gridSize;
                    this.grids[i][j] = grid;
                    this.addChild(grid);
                }
            }
        };
        /**初始所有格子的状态 */
        p.initGridsStatus = function () {
            for (var i = 0; i < this.w; i++) {
                for (var j = 0; j < this.h; j++) {
                    var grid = this.grids[i][j];
                    grid.initStatus();
                }
            }
            this.isGameOver = false;
            this.scene.setIconStatus(true);
            this.scene.setLeftNum(this.w * this.h);
        };
        /**点击了格子 */
        p.onTap = function (e) {
            this.clickGrid(e.currentTarget);
        };
        p.clickGrid = function (grid) {
            if (this.isGameOver)
                return;
            //点击第一个格子时，才开始布雷，避免第一次就点到雷，影响体验.布完雷之后要在这个格子上显示周围的雷数
            if (this.getClickedNum() == 0) {
                this.initMine(grid.xx, grid.yy);
                this.showGrid(grid.xx, grid.yy);
                var leftNum = this.getUnOpenedNum();
                this.scene.setLeftNum(leftNum);
            }
            else {
                //有雷 游戏结束
                if (grid.haveMine) {
                    this.gameOver();
                }
                else {
                    this.showGrid(grid.xx, grid.yy);
                    var leftNum = this.getUnOpenedNum();
                    this.scene.setLeftNum(leftNum);
                    if (leftNum == this.mineNum) {
                        this.win();
                    }
                }
            }
        };
        /**打开这一个格子 */
        p.showGrid = function (xx, yy) {
            if (xx < 0 || xx > this.w - 1 || yy < 0 || yy > this.h - 1)
                return;
            var grid = this.grids[xx][yy];
            if (grid.status == 4)
                return;
            var num = this.getMineNum(grid.xx, grid.yy);
            grid.showNum(num);
            if (num == 0) {
                this.showGrid(xx - 1, yy - 1);
                this.showGrid(xx - 1, yy);
                this.showGrid(xx - 1, yy + 1);
                this.showGrid(xx, yy - 1);
                this.showGrid(xx, yy + 1);
                this.showGrid(xx + 1, yy - 1);
                this.showGrid(xx + 1, yy);
                this.showGrid(xx + 1, yy + 1);
            }
        };
        p.gameOver = function () {
            this.isGameOver = true;
            this.showAllMines();
            this.scene.stopTimeCount();
            this.scene.setIconStatus(false);
        };
        p.win = function () {
            this.scene.stopTimeCount();
            this.scene.showWin();
        };
        /**当前打开了多少格子了 */
        p.getClickedNum = function () {
            var count = 0;
            for (var i = 0; i < this.w; i++) {
                for (var j = 0; j < this.h; j++) {
                    var grid = this.grids[i][j];
                    if (grid.status == 4) {
                        count++;
                    }
                }
            }
            return count;
        };
        /**当前还剩下多少没开的格子 */
        p.getUnOpenedNum = function () {
            var count = 0;
            for (var i = 0; i < this.w; i++) {
                for (var j = 0; j < this.h; j++) {
                    var grid = this.grids[i][j];
                    if (grid.status != 4) {
                        count++;
                    }
                }
            }
            console.log("还剩下" + count + "个格子没开");
            return count;
        };
        /**布雷 在xx，yy的位置不布雷 因为这是首次点击的位置*/
        p.initMine = function (xx, yy) {
            var leftMineNum = this.mineNum;
            var leftGridNum = this.w * this.h - 1;
            for (var i = 0; i < this.w; i++) {
                for (var j = 0; j < this.h; j++) {
                    var grid = this.grids[i][j];
                    //这个格子初始为雷的几率
                    var rate = leftMineNum / leftGridNum;
                    if (i == xx && j == yy) {
                        rate = 0;
                    }
                    if (Math.random() < rate) {
                        grid.haveMine = true;
                        // grid.showMine();
                        leftMineNum--;
                    }
                    leftGridNum--;
                }
            }
            this.scene.startTimeCount();
        };
        /**返回某个格子周围的雷数 */
        p.getMineNum = function (xx, yy) {
            var count = 0;
            if (xx > 0 && yy > 0 && this.grids[xx - 1][yy - 1].haveMine)
                count++;
            if (xx > 0 && this.grids[xx - 1][yy].haveMine)
                count++;
            if (xx > 0 && yy < this.h - 1 && this.grids[xx - 1][yy + 1].haveMine)
                count++;
            if (yy > 0 && this.grids[xx][yy - 1].haveMine)
                count++;
            if (yy < this.h - 1 && this.grids[xx][yy + 1].haveMine)
                count++;
            if (xx < this.w - 1 && yy > 0 && this.grids[xx + 1][yy - 1].haveMine)
                count++;
            if (xx < this.w - 1 && this.grids[xx + 1][yy].haveMine)
                count++;
            if (xx < this.w - 1 && yy < this.h - 1 && this.grids[xx + 1][yy + 1].haveMine)
                count++;
            return count;
        };
        /**显示所有雷 */
        p.showAllMines = function () {
            for (var i = 0; i < this.w; i++) {
                for (var j = 0; j < this.h; j++) {
                    var grid = this.grids[i][j];
                    if (grid.haveMine) {
                        grid.showMine();
                    }
                }
            }
        };
        return GridsArea;
    }(eui.Group));
    game.GridsArea = GridsArea;
    egret.registerClass(GridsArea,'game.GridsArea');
})(game || (game = {}));
//# sourceMappingURL=GridsArea.js.map