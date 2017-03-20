var game;
(function (game) {
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
            _super.call(this);
            this.skinName = "resource/mySkins/mainSceneSkin.exml";
            this.topGroup.visible = false;
            this.initListener();
        }
        var d = __define,c=MainScene,p=c.prototype;
        p.initListener = function () {
            this.icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this);
            this.lv1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseLv1, this);
            this.lv2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseLv2, this);
            this.lv3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseLv3, this);
            this.winGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.renewGame, this);
        };
        p.initGame = function (w, h, num) {
            console.log("initgame");
            this.topGroup.visible = true;
            this.startGroup.visible = false;
            var a = new game.GridsArea(w, h, num, this);
            a.x = (1920 - a.width) / 2;
            a.y = 100;
            this.gridGroup.addChild(a);
            this.gridsArea = a;
            this.setTotal(num);
            this.setLeftNum(w * h);
            this.setTime(0);
        };
        p.onClickIcon = function () {
            if (this.gridsArea.isGameOver) {
                this.gridsArea.initGridsStatus();
            }
        };
        p.chooseLv1 = function () {
            this.initGame(20, 20, 40);
        };
        p.chooseLv2 = function () {
            this.initGame(40, 30, 150);
        };
        p.chooseLv3 = function () {
            this.initGame(60, 40, 400);
        };
        p.setTotal = function (n) {
            this.totalTxt.text = "总雷数:" + n;
        };
        p.setLeftNum = function (n) {
            this.signedMineTxt.text = "剩余格子:" + n;
        };
        p.setTime = function (n) {
            this.timeTxt.text = "用时:" + n;
        };
        /**开始计时 */
        p.startTimeCount = function () {
            this.startTime = new Date().getTime();
            this.time = 0;
            var self = this;
            this.timeInv = setInterval(function () {
                self.time = new Date().getTime() - self.startTime;
                self.setTime((self.time / 1000).toFixed(1));
            }, 100);
        };
        p.stopTimeCount = function () {
            if (this.timeInv)
                clearInterval(this.timeInv);
        };
        /**设置图标的状态 */
        p.setIconStatus = function (b) {
            if (b) {
                this.icon.source = "smile_png";
            }
            else {
                this.icon.source = "cry_png";
            }
        };
        p.showWin = function () {
            this.winGroup.visible = true;
        };
        p.renewGame = function () {
            this.winGroup.visible = false;
            this.topGroup.visible = false;
            this.startGroup.visible = true;
            this.gridGroup.removeChildren();
        };
        return MainScene;
    }(eui.Component));
    game.MainScene = MainScene;
    egret.registerClass(MainScene,'game.MainScene');
})(game || (game = {}));
//# sourceMappingURL=MainScene.js.map