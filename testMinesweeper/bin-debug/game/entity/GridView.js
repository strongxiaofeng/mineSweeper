var game;
(function (game) {
    var GridView = (function (_super) {
        __extends(GridView, _super);
        function GridView(xx, yy) {
            _super.call(this);
            this.skinName = "resource/mySkins/gridSkin.exml";
            this.xx = xx;
            this.yy = yy;
            this.touchEnabled = true;
            this.touchChildren = false;
            this.initStatus();
        }
        var d = __define,c=GridView,p=c.prototype;
        p.initStatus = function () {
            this.bg.visible = true;
            this.bgOpen.visible = false;
            this.flagImg.visible = false;
            this.undefineImg.visible = false;
            this.mineImg.visible = false;
            this.numTxt.visible = false;
            this.status = 0;
            this.haveMine = false;
        };
        /**显示旗子 */
        p.showFlag = function () {
            this.status = 1;
            this.bg.visible = true;
            this.bgOpen.visible = false;
            this.flagImg.visible = true;
            this.undefineImg.visible = false;
            this.mineImg.visible = false;
            this.numTxt.visible = false;
        };
        /**显示问号 */
        p.showUndefine = function () {
            this.status = 2;
            this.bg.visible = true;
            this.bgOpen.visible = false;
            this.flagImg.visible = false;
            this.undefineImg.visible = true;
            this.mineImg.visible = false;
            this.numTxt.visible = false;
        };
        /**显示雷 */
        p.showMine = function () {
            this.status = 3;
            this.bg.visible = false;
            this.bgOpen.visible = true;
            this.flagImg.visible = false;
            this.undefineImg.visible = false;
            this.mineImg.visible = true;
            this.numTxt.visible = false;
        };
        /**显示周围的雷数 */
        p.showNum = function (n) {
            this.status = 4;
            this.bg.visible = false;
            this.bgOpen.visible = true;
            this.flagImg.visible = false;
            this.undefineImg.visible = false;
            this.mineImg.visible = false;
            this.numTxt.visible = true;
            this.numTxt.text = n > 0 ? n + "" : "";
        };
        GridView.gridSize = 20;
        return GridView;
    }(eui.Component));
    game.GridView = GridView;
    egret.registerClass(GridView,'game.GridView');
})(game || (game = {}));
//# sourceMappingURL=GridView.js.map