var momObject=function(){
    this.x;
    this.y;
    this.angle;
    this.bigEye=new Image();
    this.bigBody=new Image();
    this.bigTail=new Image();
}

momObject.prototype.init=function(){
    this.x=canWidth*0.5;
    this.y=canHeight*0.5;
    this.angle=0;
    this.bigEye.src="./src/bigEye0.png";
    this.bigBody.src="./src/bigSwim0.png";
    this.bigTail.src="./src/bigTail0.png";
}

momObject.prototype.draw=function(){

    this.x=lerpDistance(mx,this.x,0.98);
    this.y=lerpDistance(my,this.y,0.98);

    var deltaX=mx-this.x;
    var deltaY=my-this.y;
    var beta=Math.atan2(deltaY,deltaX) + Math.PI;
    this.angle=lerpAngle(beta,this.angle,0.6);
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(this.bigEye,-this.bigEye.width*0.5,-this.bigEye.height*0.5);
    ctx1.drawImage(this.bigBody,-this.bigBody.width*0.5,-this.bigBody.height*0.5);
    ctx1.drawImage(this.bigTail,-this.bigTail.width*0.5+30,-this.bigTail.height*0.5);
    ctx1.restore();

}


var babyObject=function(){
    this.x;
    this.y;
    this.angle;
    this.babyEye=new Image();
    this.babyBody=new Image();
    this.babyTail=new Image();
}

babyObject.prototype.init=function(){
    this.x=canWidth*0.5+50;
    this.y=canHeight*0.5;
    this.angle=0;
    this.babyEye.src="./src/babyEye0.png";
    this.babyBody.src="./src/babyFade0.png";
    this.babyTail.src="./src/babyTail0.png";
}

babyObject.prototype.draw=function(){

    this.x=lerpDistance(mom.x,this.x,0.98);
    this.y=lerpDistance(mom.y,this.y,0.98);

    var deltaX=mom.x-this.x;
    var deltaY=mom.y-this.y;
    var beta=Math.atan2(deltaY,deltaX) + Math.PI;
    this.angle=lerpAngle(beta,this.angle,0.6);
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(this.babyBody,-this.babyBody.width*0.5,-this.babyBody.height*0.5);
    ctx1.drawImage(this.babyTail,-this.babyTail.width*0.5+25,-this.babyTail.height*0.5);
    ctx1.drawImage(this.babyEye,-this.babyEye.width*0.5,-this.babyEye.height*0.5);
    ctx1.restore();

}