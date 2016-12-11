var can1;
var can2;

var ctx1;
var ctx2;

var lastTime;
var deltaTime;    //两帧间的时间间隔

var bgpic=new Image();

var canWidth;
var canHeight;

var ane;
var fruit;

var mom;

var mx;
var my;

var baby;

window.onload=game;

function game(){
    init();
    lastTime=Date.now();
    deltaTime=0;
    gameLoop();
}

function init(){
    can1=document.getElementById("canvas1");     //      前面一层
    can2=document.getElementById("canvas2");    //后面一层
    if(can1.getContext){
        ctx1=can1.getContext("2d");
        ctx2=can2.getContext("2d");
    }

    can1.addEventListener("mousemove",onMouseMove,false);
    bgpic.src="./src/background.jpg";
    canWidth=can1.width;
    canHeight=can1.height;

    ane=new aneObject();
    ane.init();

    fruit=new fruitObject();
    fruit.init();

    mom=new momObject();
    mom.init();

    mx=canWidth*0.5;
    my=canHeight*0.5;

    baby=new babyObject();
    baby.init();

}

function gameLoop(){
    requestAnimationFrame(gameLoop);    //代替settimeout等的不足
    now=Date.now();
    deltaTime=now-lastTime;
    lastTime=now;
    if(deltaTime>50){
        deltaTime=50;
    }
    drawBackground();

    ane.draw();
    fruit.draw();
    fruitMonitor();

    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    momFruitCollision();

    baby.draw();
}

function drawBackground(){
    
    ctx2.drawImage(bgpic,0,0,canWidth,canHeight);
}


//海葵的定义
var aneObject=function(){
    this.x=[];
    this.len=[];
}

aneObject.prototype.num=50;
aneObject.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.x[i]=i*16 + Math.random()*10;
        this.len[i]=200+Math.random()*50;
    }

}


aneObject.prototype.draw=function(){

    ctx2.save();
    ctx2.globalAlpha=0.6;
    ctx2.lineWidth=20;
    ctx2.lineCap="round";
    ctx2.strokeStyle="#3b154e";
    for(var i=0;i<this.num;i++){
        ctx2.beginPath();
        ctx2.moveTo(this.x[i],canHeight);
        ctx2.lineTo(this.x[i],canHeight-this.len[i]);
        
        ctx2.stroke();
    }
    ctx2.restore();

}

//果实的定义
var fruitObject = function(){
    this.alive=[];       //boolean
    this.x=[];
    this.y=[];
    this.l=[];
    this.spd=[];
    this.fruitType=[];
    this.orange=new Image();
    this.blue=new Image();
}
fruitObject.prototype.num=30;

fruitObject.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.alive[i]=false;
        this.x[i]=0;
        this.y[i]=0;
        
      // this.born(i);
        this.fruitType[i]="";
    }
    this.orange.src="./src/fruit.png";
    this.blue.src="./src/blue.png";
}

fruitObject.prototype.draw=function(){
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            if(this.fruitType[i]=="blue"){
                var pic=this.blue;
            }else{
                var pic=this.orange;
            }
            if(this.l[i]<=14){
              this.l[i] += deltaTime*this.spd[i];
            }else{
              this.y[i] -= deltaTime*this.spd[i]*5;
            }
        
            ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
            if(this.y[i]<10){
            this.alive[i]=false;
            }
        }
       
    }

}

fruitObject.prototype.updata=function(){
    var num=0;
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            num++;
        }
    }
}

fruitObject.prototype.born=function(i){
    var aneID=Math.floor(Math.random()*ane.num);
    this.x[i]=ane.x[aneID];
    this.y[i]=canHeight-ane.len[aneID];
    this.l[i]=0;
    this.spd[i]=Math.random()*0.015+0.005;
    this.alive[i]=true;
    var ran=Math.random();
    if(ran<0.2){
        this.fruitType[i]="blue";
    }else{
        this.fruitType[i]="orange";
    }
}

fruitObject.prototype.dead=function(i){
    this.alive[i]=false;
}

function fruitMonitor(){
    var num=0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i])num++;

    }
    if(num<15){
        sendFruit();
        return;
    }
}

function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;

        }
    }
}

function onMouseMove(e){
    if(e.offSetX || e.layerX){
        mx=e.offSetX == undefined ? e.layerX :e.offSetX;
        my=e.offSetY == undefined ? e.layerY :e.offSetY;
    }
    
}