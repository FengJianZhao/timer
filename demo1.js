/*绘制时间*/

var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 668;
var RADIUS = 8;
var MAGIN_TOP = 100;
var MAGIN_LEFT = 30;

const endTime = new Date();
      endTime.setTime(endTime.getTime()+3600*1000);

var curShowTimeSeconds = 0;

var balls = [];

const colors = ["#33B3E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];


window.onload=function(){

	//设置自适应
	WINDOW_WIDTH = document.body.clientWidth;
	WINDOW_HEIGHT = document.documentElement.clientHeight-40;
	

	MAGIN_LEFT = Math.round(WINDOW_WIDTH/10);
	RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;
	MAGIN_TOP = Math.round(WINDOW_HEIGHT/4);


	var canvas = document.getElementById('canvas');
	/*设置画布大小*/
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;

	var context = canvas.getContext('2d');

	curShowTimeSeconds = getCurrentShowTimeSeconds();

	setInterval(function(){
		render(context);
		update();
	},50);
}

function update(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();

	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt(nextShowTimeSeconds/60);
	var nextSeconds = nextShowTimeSeconds % 60;

	var curHours = parseInt(curShowTimeSeconds/3600);
	var curMinutes = parseInt(curShowTimeSeconds/60);
	var curSeconds = curShowTimeSeconds % 60;
	if(nextSeconds!=curSeconds){

		if(parseInt(curHours/10)!=parseInt(nextHours/10)){
			addBalls(MAGIN_LEFT+0,MAGIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(curHours%10)!=parseInt(nextHours%10)){
			
			addBalls(MAGIN_LEFT+15*(RADIUS+1),MAGIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
			
			addBalls(MAGIN_LEFT+39*(RADIUS+1),MAGIN_TOP,parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){

			addBalls(MAGIN_LEFT+54*(RADIUS+1),MAGIN_TOP,parseInt(curMinutes%10));
		}
		if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){

			addBalls(MAGIN_LEFT+78*(RADIUS+1),MAGIN_TOP,parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){

			addBalls(MAGIN_LEFT+93*(RADIUS+1),MAGIN_TOP,parseInt(curSeconds%10));
		}


		curShowTimeSeconds=nextShowTimeSeconds;
	}

	updateBalls();
}

	
function updateBalls(){

	var count = 0;

	for(var i = 0;i<balls.length;i++){
		balls[i].x  += balls[i].vx;
		balls[i].y  += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT-RADIUS;
			balls[i].vy = -balls[i].vy*0.75;
		}
	}

	for(var i = 0;i<balls.length;i++){
		if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH){
			balls[count++] = balls[i];
		}
	}

			while(balls.length>Math.min(300,count)){
				balls.pop();
			}

			// console.log(balls.length);
	
}


function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){

				var oneball = {
					x: x+2*j*(RADIUS+1)+(RADIUS+1),
					y: y+2*i*(RADIUS+1)+(RADIUS+1),
					g: 1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy: -5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}

				balls.push(oneball);

			}
		}
	}
}

function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime()-curTime.getTime();
	ret = Math.round(ret/1000);
	return ret>=0?ret:0;

}

function render(ext){

	ext.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);	//对矩形画布进行一次刷新操作

	 var hours = parseInt(curShowTimeSeconds/3600);
	 var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
	 var seconds = curShowTimeSeconds % 60;

	 // console.log(hours+"--"+minutes+"--"+seconds);

	 renderDigit(MAGIN_LEFT,MAGIN_TOP,parseInt(hours/10),ext);
	 renderDigit(MAGIN_LEFT+15*(RADIUS+1),MAGIN_TOP,parseInt(hours%10),ext);
	 renderDigit(MAGIN_LEFT+30*(RADIUS+1),MAGIN_TOP,10,ext);
	 renderDigit(MAGIN_LEFT+39*(RADIUS+1),MAGIN_TOP,parseInt(minutes/10),ext);
	 renderDigit(MAGIN_LEFT+54*(RADIUS+1),MAGIN_TOP,parseInt(minutes%10),ext);
	 renderDigit(MAGIN_LEFT+69*(RADIUS+1),MAGIN_TOP,10,ext);
	 renderDigit(MAGIN_LEFT+78*(RADIUS+1),MAGIN_TOP,parseInt(seconds/10),ext);
	 renderDigit(MAGIN_LEFT+93*(RADIUS+1),MAGIN_TOP,parseInt(seconds%10),ext);

	 for(var i = 0;i<balls.length;i++){
	 	ext.fillStyle = balls[i].color;

	 	ext.beginPath();
	 	ext.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
	 	ext.closePath();

	 	ext.fill();

	 }

}

function renderDigit(x,y,num,ext){
	ext.fillStyle='rgb(0,102,153)';

	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				ext.beginPath();
				ext.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				ext.closePath();

				ext.fill();
			}
		}
	}
}