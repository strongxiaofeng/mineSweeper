module game {
	export class MainScene extends eui.Component{
		private totalTxt:eui.Label;
		private signedMineTxt:eui.Label;
		private timeTxt:eui.Label;
		private lv1:eui.Button;
		private lv2:eui.Button;
		private lv3:eui.Button;
		private icon:eui.Image;
		private startGroup:eui.Group;
		private topGroup:eui.Group;
		private winGroup:eui.Group;
		private gridGroup:eui.Group;

		private gridsArea:GridsArea;
		private startTime:number;
		private time:number;
		private timeInv:any;

		public constructor() {
			super();
			this.skinName = "resource/mySkins/mainSceneSkin.exml";

			this.topGroup.visible = false;
			this.initListener();
		}

		private initListener(){
			this.icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickIcon,this);
			this.lv1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.chooseLv1,this);
			this.lv2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.chooseLv2,this);
			this.lv3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.chooseLv3,this);
			this.winGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.renewGame,this);
		}
		
		private initGame(w,h,num) {
			console.log("initgame");
			this.topGroup.visible = true;
			this.startGroup.visible = false;

			var a : GridsArea = new GridsArea(w,h,num,this);
			a.x = (1920 - a.width)/2;
			a.y = 100;
			this.gridGroup.addChild(a);
			this.gridsArea = a;

			this.setTotal(num);
			this.setLeftNum(w*h);
			this.setTime(0);
		}

		private onClickIcon(){
			if(this.gridsArea.isGameOver){
				this.gridsArea.initGridsStatus();
			}
		}
		private chooseLv1(){
			this.initGame(20,20,40);
		}
		private chooseLv2(){
			this.initGame(40,30,150);
		}
		private chooseLv3(){
			this.initGame(60,40,400);
		}

		public setTotal(n:number){
			this.totalTxt.text = "总雷数:"+n;
		}
		public setLeftNum(n:number){
			this.signedMineTxt.text = "剩余格子:"+n;
		}
		public setTime(n:any){
			this.timeTxt.text = "用时:"+n;
		}

		/**开始计时 */
		public startTimeCount(){
			this.startTime = new Date().getTime();
			this.time = 0;

			var self = this;
			this.timeInv = setInterval(function(){
				self.time = new Date().getTime() - self.startTime;
				self.setTime( (self.time / 1000).toFixed(1));
			},100);
		}

		public stopTimeCount(){
			if(this.timeInv) clearInterval(this.timeInv);
		}
		/**设置图标的状态 */
		public setIconStatus(b:boolean){
			if(b){
				this.icon.source = "smile_png";
			}
			else{
				this.icon.source = "cry_png";
			}
		}

		public showWin(){
			this.winGroup.visible = true;
		}

		private renewGame(){
			this.winGroup.visible = false;
			this.topGroup.visible = false;
			this.startGroup.visible = true;
			this.gridGroup.removeChildren();
		}

	}
}