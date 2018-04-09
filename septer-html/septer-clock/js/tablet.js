/**
 * Created by 良 on 2015/2/15.
 */
//var SHOW_WIDTH=document.body.clientWidth;
//var SHOW_HEIGHT=document.body.clientHeight;
var WIDTH=400;
var HEIGHT=400;
var CIRCLE_X=WIDTH/2;
var CIRCLE_Y=HEIGHT/2;
var RADIUS_SECOND=WIDTH*45/100;
var RADIUS_MINUTE=WIDTH*33/100;
var RADIUS_HOUR=WIDTH/4;


var SECOND_WIDTH=WIDTH/100;
var MINUTE_WIDTH=WIDTH*14/1000;
var HOUR_WIDTH=WIDTH*26/1000;

var BIG_TIME_WIDTH=WIDTH*6/1000;
var SMALL_TIME_WIDTH=WIDTH*2/1000;

var START_DEG_SECOND=Math.PI/2;
var START_DEG_MINUTE=Math.PI/2;
var START_DEG_HOUR=Math.PI/2;
var SECOND_SPEED_DEG=(6/360)*Math.PI*2;
var MINUTE_SPEED_DEG=(6/(360*60))*Math.PI*2;
var HOUR_SPEED_DEG=(6/(360*60*12))*Math.PI*2;
var BIG_CIRCLE=WIDTH*7/15;
var LITTLE_CIRCLE=WIDTH*13/30;
var BIG_DEG=Math.PI/3;
var BIG_DEG_SPEED=(30/360)*Math.PI*2;
var LITTLE_DEG=Math.PI/2;
var LITTLE_DEG_SPEED=(6/360)*Math.PI*2;

window.onload=function(){
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");
    canvas.width=WIDTH ;
    canvas.height=HEIGHT;
    showCurrentTime();
    //alert(START_DEG_SECOND+" "+START_DEG_MINUTE+" "+START_DEG_HOUR );
    setInterval(function () {
        showSecondTime(context);
        drawWatchTable(context);
        drawPoint(context);



    },1000);

}
//秒针转动
function showSecondTime(ctx){

    ctx.clearRect(0,0,600,600);
    showMinuteTime(ctx);
    //showHourTime(ctx);
    ctx.strokeStyle="rgb(0,109,200)";
    ctx.beginPath();
    ctx.moveTo(RADIUS_SECOND*Math.cos(START_DEG_SECOND)+CIRCLE_X,-RADIUS_SECOND*Math.sin(START_DEG_SECOND)+CIRCLE_Y);
    ctx.lineTo(CIRCLE_X,CIRCLE_Y);
    //ctx.closePath();
    ctx.lineWidth=SECOND_WIDTH;
    ctx.lineCap="round";
    ctx.stroke();
    START_DEG_SECOND-=SECOND_SPEED_DEG;

}
//分针转动
function showMinuteTime(ctx){
    ctx.clearRect(0,0,600,600)
    showHourTime(ctx);
    ctx.strokeStyle="pink";
    ctx.beginPath();
    ctx.moveTo(RADIUS_MINUTE*Math.cos(START_DEG_MINUTE)+CIRCLE_X,-RADIUS_MINUTE*Math.sin(START_DEG_MINUTE)+CIRCLE_Y);
    ctx.lineTo(CIRCLE_X,CIRCLE_Y);
    //ctx.closePath();
    ctx.lineWidth=MINUTE_WIDTH;
    ctx.lineCap="round";
    ctx.stroke();
    START_DEG_MINUTE-=MINUTE_SPEED_DEG;


}
//时针转动
function showHourTime(ctx){

    ctx.clearRect(0,0,600,600)
    ctx.strokeStyle="gray";
    ctx.beginPath();
    ctx.moveTo(RADIUS_HOUR*Math.cos(START_DEG_HOUR)+CIRCLE_X,-RADIUS_HOUR*Math.sin(START_DEG_HOUR)+CIRCLE_Y);
    ctx.lineTo(CIRCLE_X,CIRCLE_Y);
    //ctx.closePath();
    ctx.lineCap="round";
    ctx.lineWidth=HOUR_WIDTH;
    ctx.stroke();
    START_DEG_HOUR-=HOUR_SPEED_DEG;

}
//获取当前时间
function showCurrentTime(){
    var date=new Date();
    var hour=date.getHours();
    var minute=date.getMinutes();
    var second=date.getSeconds();
    //alert(hour+" "+minute+" "+second)
    START_DEG_SECOND-=second*SECOND_SPEED_DEG;
    START_DEG_MINUTE-=(minute*60+second)*MINUTE_SPEED_DEG;
    START_DEG_HOUR-=(hour*60*60+minute*60+second)*HOUR_SPEED_DEG;
    //alert(hour*60*60+minute*60+second);
}

//绘制表盘
function drawWatchTable(ctx){
    ctx.strokeStyle="rgb(0,0,0)";
    ctx.beginPath();
    ctx.arc(CIRCLE_X,CIRCLE_Y,BIG_CIRCLE,0,Math.PI*2);
    ctx.closePath();
    ctx.stroke();

    //ctx.strokeStyle="rgb(0,0,0)";
    //ctx.beginPath();
    //ctx.arc(300,300,260,0,Math.PI*2);
    //ctx.closePath();
    //ctx.stroke();
//绘制大表针
    for(var i =1 ; i< 13;i++){
        ctx.strokeStyle="rgb(0,0,0)";
        ctx.beginPath();
        ctx.moveTo(BIG_CIRCLE*Math.cos(BIG_DEG)+CIRCLE_X,-BIG_CIRCLE*Math.sin(BIG_DEG)+CIRCLE_Y);
        ctx.lineTo(LITTLE_CIRCLE*Math.cos(BIG_DEG)+CIRCLE_X,-LITTLE_CIRCLE*Math.sin(BIG_DEG)+CIRCLE_Y);
        ctx.closePath();
        ctx.lineWidth=BIG_TIME_WIDTH;
        ctx.stroke();
        ctx.fillText(i.toString(),(LITTLE_CIRCLE-10)*Math.cos(BIG_DEG)+CIRCLE_X,-(LITTLE_CIRCLE-10)*Math.sin(BIG_DEG)+CIRCLE_Y,10);
        BIG_DEG-=BIG_DEG_SPEED;
    }
//绘制小表针
    for(var i= 0;i<60;i++){
        ctx.strokeStyle="rgb(0,0,0)";
        ctx.beginPath();
        ctx.moveTo(BIG_CIRCLE*Math.cos(LITTLE_DEG)+CIRCLE_X,-BIG_CIRCLE*Math.sin(LITTLE_DEG)+CIRCLE_Y);
        ctx.lineTo((LITTLE_CIRCLE+4)*Math.cos(LITTLE_DEG)+CIRCLE_X,-(LITTLE_CIRCLE+4)*Math.sin(LITTLE_DEG)+CIRCLE_Y);
        ctx.closePath();
        ctx.lineWidth=SMALL_TIME_WIDTH;
        ctx.stroke();
        LITTLE_DEG-=LITTLE_DEG_SPEED;
    }

}

function drawPoint(ctx){
    ctx.fillStyle="black";
    ctx.beginPath();
    ctx.arc(CIRCLE_X,CIRCLE_Y,10,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
}