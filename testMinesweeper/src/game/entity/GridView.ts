module game {
	export class GridView extends eui.Component{
		public static gridSize:number = 20;
		private bg:eui.Image;
		private bgOpen:eui.Image;
		private flagImg:eui.Image;
		private undefineImg:eui.Image;
		private mineImg:eui.Image;
		private numTxt:eui.Label;
		/** 0:初始 1：旗子 2：问号 3：雷 4:打开格子 周围有雷就显示数字*/
		public status:number;
		/**是否是雷 */
		public haveMine:boolean;
		/**这个格子的位置 */
		public xx:number;
		public yy:number;

		public constructor(xx,yy) {
			super();
			this.skinName = "resource/mySkins/gridSkin.exml";

			this.xx = xx;
			this.yy = yy;
			this.touchEnabled = true;
			this.touchChildren = false;
			this.initStatus();
		}

		public initStatus(){
			this.bg.visible = true;
			this.bgOpen.visible = false;
			this.flagImg.visible = false;
			this.undefineImg.visible = false;
			this.mineImg.visible = false;
			this.numTxt.visible = false;
			this.status = 0;
			this.haveMine = false;
		}

		/**显示旗子 */
		public showFlag(){
			this.status = 1;
			this.bg.visible = true;
			this.bgOpen.visible = false;
			this.flagImg.visible = true;
			this.undefineImg.visible = false;
			this.mineImg.visible = false;
			this.numTxt.visible = false;
		}
		/**显示问号 */
		public showUndefine(){
			this.status = 2;
			this.bg.visible = true;
			this.bgOpen.visible = false;
			this.flagImg.visible = false;
			this.undefineImg.visible = true;
			this.mineImg.visible = false;
			this.numTxt.visible = false;
		}
		/**显示雷 */
		public showMine(){
			this.status = 3;
			this.bg.visible = false;
			this.bgOpen.visible = true;
			this.flagImg.visible = false;
			this.undefineImg.visible = false;
			this.mineImg.visible = true;
			this.numTxt.visible = false;
		}
		/**显示周围的雷数 */
		public showNum(n:number){
			this.status = 4;
			this.bg.visible = false;
			this.bgOpen.visible = true;
			this.flagImg.visible = false;
			this.undefineImg.visible = false;
			this.mineImg.visible = false;
			this.numTxt.visible = true;
			this.numTxt.text = n>0 ? n+"" : "";
		}
	}
}